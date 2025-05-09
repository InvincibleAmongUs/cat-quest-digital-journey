import { supabase } from '@/integrations/supabase/client';
import { KnowledgeBaseChapter, KnowledgeBaseImage } from '@/utils/knowledgeBase';
import { extractChapterTitle, extractSections, extractReferences, formatText } from '@/utils/textParser';

// Configuration for storage buckets
const TEXT_BUCKET = 'testtxt';
const IMAGE_BUCKET = 'testimage';

/**
 * Service for fetching and processing educational content
 */
export class ContentService {
  /**
   * Get chapter content from Supabase storage
   * @param chapterNumber The chapter number to load
   */
  static async getChapterFromStorage(chapterNumber: number): Promise<KnowledgeBaseChapter | null> {
    try {
      // Fetch the chapter text file from Supabase
      const { data: fileData, error: fileError } = await supabase.storage
        .from(TEXT_BUCKET)
        .download(`Chapter-${chapterNumber}.txt`);

      if (fileError || !fileData) {
        console.error('Error loading chapter from storage:', fileError);
        // Fall back to local file if available
        return this.getChapterFromFile(chapterNumber);
      }

      // Convert blob to text
      const content = await fileData.text();
      
      // Extract title from first line
      const lines = content.split('\n');
      const title = lines[0].trim();
      
      // Parse the rest of the content
      const chapterContent = lines.slice(1).join('\n');
      
      // Load images for this chapter
      const images = await this.getImagesForChapter(chapterNumber);
      
      // Separate tables from other images
      const tables = images.filter(img => img.type === 'table');
      const figures = images.filter(img => img.type === 'figure');
      
      return {
        id: chapterNumber,
        title,
        content: chapterContent,
        images: figures,
        tables,
        term: Math.ceil(chapterNumber / 2) // Simple mapping: chapters 1-2 = term 1, 3-4 = term 2, etc.
      };
    } catch (error) {
      console.error(`Error loading chapter ${chapterNumber} from storage:`, error);
      // Fall back to local file if available
      return this.getChapterFromFile(chapterNumber);
    }
  }

  /**
   * Fallback method to get chapter from local file if Supabase storage fails
   */
  static async getChapterFromFile(chapterNumber: number): Promise<KnowledgeBaseChapter | null> {
    try {
      // Dynamically import the chapter content from local file
      const chapterModule = await import(`@/knowledgebase/Chapter-${chapterNumber}.txt?raw`);
      const chapterContent = chapterModule.default;
      
      if (!chapterContent) {
        console.error(`Chapter ${chapterNumber} content not found`);
        return null;
      }
      
      // Extract chapter title from the first line
      const lines = chapterContent.split('\n');
      const title = lines[0].trim();
      
      // Parse the rest of the content
      const content = lines.slice(1).join('\n');
      
      // Load images for this chapter
      const images = await this.getImageListForChapter(chapterNumber);
      
      // Separate tables from other images
      const tables = images.filter(img => img.type === 'table');
      const figures = images.filter(img => img.type === 'figure');
      
      return {
        id: chapterNumber,
        title,
        content,
        images: figures,
        tables,
        term: Math.ceil(chapterNumber / 2) // Simple mapping: chapters 1-2 = term 1, 3-4 = term 2, etc.
      };
    } catch (error) {
      console.error(`Error loading chapter ${chapterNumber} from file:`, error);
      return null;
    }
  }

  /**
   * Get images from Supabase storage for a specific chapter
   */
  static async getImagesForChapter(chapterNumber: number): Promise<KnowledgeBaseImage[]> {
    try {
      // First try to get the image list from storage
      const images = await this.getImageListForChapter(chapterNumber);
      
      // For each image, check if it exists in Supabase storage and get URLs
      const imagesWithUrls: KnowledgeBaseImage[] = [];
      
      for (const image of images) {
        // Create the public URL for the image
        const { data: { publicUrl } } = supabase.storage
          .from(IMAGE_BUCKET)
          .getPublicUrl(image.filename);
        
        if (publicUrl) {
          imagesWithUrls.push({
            ...image,
            url: publicUrl
          });
        }
      }
      
      return imagesWithUrls;
    } catch (error) {
      console.error(`Error loading images for chapter ${chapterNumber}:`, error);
      return [];
    }
  }

  /**
   * Get image list for a chapter from the image listing file
   */
  static async getImageListForChapter(chapterNumber: number): Promise<KnowledgeBaseImage[]> {
    try {
      // Try to load the image listing from Supabase storage first
      const { data: fileData, error: fileError } = await supabase.storage
        .from(TEXT_BUCKET)
        .download('Chapter Images and tables List.txt');
      
      let imageListingContent: string;
      
      if (fileError || !fileData) {
        console.warn('Could not load image list from storage, falling back to local file');
        // Fall back to local file
        const imageListingModule = await import('@/knowledgebase/Chapter Images and tables List.txt?raw');
        imageListingContent = imageListingModule.default;
      } else {
        // Use the data from Supabase storage
        imageListingContent = await fileData.text();
      }
      
      if (!imageListingContent) {
        console.error('Image listing file not found');
        return [];
      }
      
      // Parse the image listing to extract images for the specified chapter
      const lines = imageListingContent.split('\n');
      const chapterImages: KnowledgeBaseImage[] = [];
      
      for (const line of lines) {
        // Skip empty lines
        if (!line.trim()) continue;
        
        // Look for the chapter prefix in filenames (e.g., ch1_figure_1_1, ch1_table_1_1)
        if (line.includes(`ch${chapterNumber}_`)) {
          // Determine if it's a figure or a table
          const isTable = line.includes('table');
          const isFigure = line.includes('figure');
          
          if (!isTable && !isFigure) continue;
          
          // Extract the reference number (e.g., 1_1 from ch1_figure_1_1)
          const refMatch = line.match(/(\d+)_(\d+)/);
          const reference = refMatch ? `${refMatch[1]}.${refMatch[2]}` : '';
          
          // Create a default alt text based on the filename
          const filenameWithoutExtension = line.split('.')[0];
          const alt = filenameWithoutExtension
            .replace(/_/g, ' ')
            .replace(`ch${chapterNumber} `, '')
            .trim();
          
          chapterImages.push({
            id: filenameWithoutExtension,
            name: filenameWithoutExtension,  // Adding name property to match interface
            filename: line.trim(),
            alt,
            type: isTable ? 'table' : 'figure',
            chapter: chapterNumber,
            reference
          });
        }
      }
      
      return chapterImages;
    } catch (error) {
      console.error(`Error loading images for chapter ${chapterNumber}:`, error);
      return [];
    }
  }

  /**
   * Convert chapter content to interactive content blocks
   */
  static convertChapterToContentBlocks(chapter: KnowledgeBaseChapter) {
    const blocks: any[] = [];
    
    // Add heading block for chapter title
    blocks.push({
      type: 'heading',
      content: {
        text: chapter.title,
        level: 1
      }
    });
    
    // Parse content into sections
    const sections = extractSections(chapter.content);
    
    // Process each section
    sections.forEach((section, sectionIndex) => {
      // Add section heading
      blocks.push({
        type: 'heading',
        content: {
          text: section.title,
          level: 2
        }
      });
      
      // Split section content into paragraphs
      const paragraphs = section.content.split('\n\n');
      
      // Process each paragraph
      paragraphs.forEach((paragraph, paragraphIndex) => {
        if (!paragraph.trim()) return;
        
        // Check if paragraph contains reference to figure or table
        const figureMatches = paragraph.match(/Figure\s+(\d+\.\d+)/gi);
        const tableMatches = paragraph.match(/Table\s+(\d+\.\d+)/gi);
        
        // Add text block for paragraph
        blocks.push({
          type: 'text',
          content: paragraph.trim()
        });
        
        // If paragraph mentions figures, add them after the paragraph
        if (figureMatches) {
          figureMatches.forEach(match => {
            const refNumber = match.replace(/Figure\s+/i, '').trim();
            const figure = chapter.images.find(img => img.reference === refNumber);
            
            if (figure) {
              blocks.push({
                type: 'figure',
                content: {
                  chapterId: chapter.id,
                  reference: refNumber,
                  caption: figure.alt
                }
              });
            }
          });
        }
        
        // If paragraph mentions tables, add them after the paragraph
        if (tableMatches && chapter.tables) {
          tableMatches.forEach(match => {
            const refNumber = match.replace(/Table\s+/i, '').trim();
            const table = chapter.tables?.find(img => img.reference === refNumber);
            
            if (table) {
              blocks.push({
                type: 'table',
                content: {
                  chapterId: chapter.id,
                  reference: refNumber,
                  caption: table.alt
                }
              });
            }
          });
        }
      });
      
      // Add interactive quiz element at the end of important sections
      if (sectionIndex > 0 && sectionIndex % 2 === 0) {
        blocks.push({
          type: 'quiz',
          content: {
            questions: [
              {
                question: `What are the key points from the ${section.title} section?`,
                options: [
                  "This is a placeholder option that would be generated based on section content",
                  "This is another placeholder option",
                  "This is the correct answer that would highlight key concepts",
                  "This is a distractor option"
                ],
                correctAnswer: 2
              }
            ]
          }
        });
      }
    });
    
    return blocks;
  }
}
