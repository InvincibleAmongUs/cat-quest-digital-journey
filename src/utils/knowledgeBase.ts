
export interface KnowledgeBaseImage {
  id: number | string;
  name: string;
  caption?: string;
  path?: string;
  url?: string;
  // Add the missing properties
  filename?: string;
  alt?: string;
  reference?: string;
  type?: 'figure' | 'table';
  chapter?: number;
}

export interface KnowledgeBaseChapter {
  id: number;
  title: string;
  content: string;
  images: KnowledgeBaseImage[];
  // Add the missing property
  tables?: KnowledgeBaseImage[];
  term?: number;
}

export interface KnowledgeBaseTerm {
  id: number;
  title: string;
  description: string;
  chapters: KnowledgeBaseChapter[];
}

// Add the missing function
export async function loadChapterFromFile(chapterId: number): Promise<KnowledgeBaseChapter | null> {
  try {
    // Dynamically import the chapter content from local file
    const chapterModule = await import(`@/knowledgebase/Chapter-${chapterId}.txt?raw`);
    const chapterContent = chapterModule.default;
    
    if (!chapterContent) {
      console.error(`Chapter ${chapterId} content not found`);
      return null;
    }
    
    // Extract chapter title from the first line
    const lines = chapterContent.split('\n');
    const title = lines[0].trim();
    
    // Parse the rest of the content
    const content = lines.slice(1).join('\n');
    
    // For now, return a basic chapter structure
    // The images and tables would normally be loaded separately
    return {
      id: chapterId,
      title,
      content,
      images: [],
      tables: [],
      term: Math.ceil(chapterId / 2) // Simple mapping: chapters 1-2 = term 1, 3-4 = term 2, etc.
    };
  } catch (error) {
    console.error(`Error loading chapter ${chapterId} from file:`, error);
    return null;
  }
}
