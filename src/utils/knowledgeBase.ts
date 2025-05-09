import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Define types for our knowledge base content
export interface KnowledgeBaseImage {
  id: string;
  filename: string;
  alt: string;
  caption?: string;
  type: 'figure' | 'table';
  chapter: number;
  reference: string; // e.g., "1.2" for Figure 1.2 or Table 1.2
  url?: string; // Add the url property as optional
}

// Function to load chapter content from local files
export async function loadChapterFromFile(chapterNumber: number): Promise<KnowledgeBaseChapter | null> {
  try {
    // First, try to dynamically import the chapter content
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
    const images = await loadImagesForChapter(chapterNumber);
    
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
    console.error(`Error loading chapter ${chapterNumber}:`, error);
    toast({
      title: "Error Loading Chapter",
      description: `Failed to load Chapter ${chapterNumber}. Please try again later.`,
      variant: "destructive",
    });
    return null;
  }
}

// Function to load images for a specific chapter from the image listing file
export async function loadImagesForChapter(chapterNumber: number): Promise<KnowledgeBaseImage[]> {
  try {
    // Load the image listing file
    const imageListingModule = await import('@/knowledgebase/Chapter Images and tables List.txt?raw');
    const imageListingContent = imageListingModule.default;
    
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

// Function to save knowledge base content to Supabase
export async function saveChapterToSupabase(chapter: KnowledgeBaseChapter): Promise<boolean> {
  try {
    // Create content blocks for the chapter
    const contentBlocks = [
      // Heading block for the chapter title
      {
        type: 'heading',
        content: {
          text: chapter.title,
          level: 1
        },
        order_index: 0
      },
      // Text blocks for the chapter content (split into paragraphs)
      ...chapter.content.split('\n\n').map((paragraph, index) => ({
        type: 'text',
        content: paragraph.trim(),
        order_index: index + 1
      })),
      // Image blocks for figures
      ...chapter.images.map((image, index) => ({
        type: 'image',
        content: {
          src: image.filename,
          alt: image.alt,
          caption: `Figure ${image.reference}: ${image.alt}`
        },
        order_index: chapter.content.split('\n\n').length + index + 1
      })),
      // Image blocks for tables (but marked as tables)
      ...chapter.tables.map((table, index) => ({
        type: 'image',
        content: {
          src: table.filename,
          alt: table.alt,
          caption: `Table ${table.reference}: ${table.alt}`,
          isTable: true
        },
        order_index: chapter.content.split('\n\n').length + chapter.images.length + index + 1
      }))
    ];
    
    // Save to Supabase (would need to create a lesson first, then associate content blocks with it)
    // This would be implemented when we have the actual Supabase structure for lessons
    
    return true;
  } catch (error) {
    console.error(`Error saving chapter ${chapter.id} to Supabase:`, error);
    return false;
  }
}

// Function to load lesson content blocks from Supabase
export async function loadLessonContentFromSupabase(lessonId: number): Promise<any[] | null> {
  try {
    const { data, error } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('lesson_id', lessonId)
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Error loading lesson content:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error(`Error loading lesson content for lesson ${lessonId}:`, error);
    return null;
  }
}

// Function to get all chapters for a term
export async function getChaptersForTerm(termId: number): Promise<KnowledgeBaseChapter[]> {
  // Map term ID to corresponding chapters
  const chaptersForTerm: Record<number, number[]> = {
    1: [1, 2, 3], // Term 1: Chapters 1, 2, and 3
    2: [4, 5, 6], // Term 2: Chapters 4, 5, and 6
    3: [7, 8],    // Term 3: Chapters 7 and 8
    4: [9, 10]    // Term 4: Chapters 9 and 10
  };
  
  const chapterIds = chaptersForTerm[termId] || [];
  const chapters: KnowledgeBaseChapter[] = [];
  
  for (const chapterId of chapterIds) {
    const chapter = await loadChapterFromFile(chapterId);
    if (chapter) {
      chapters.push(chapter);
    }
  }
  
  return chapters;
}

export interface KnowledgeBaseChapter {
  id: number;
  title: string;
  content: string;
  images: KnowledgeBaseImage[];
  tables: KnowledgeBaseImage[];
  term: number;
}
