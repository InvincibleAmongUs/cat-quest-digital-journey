export interface KnowledgeBaseImage {
  id: number;
  name: string;
  caption?: string;
  path?: string;
  url?: string;
}

export interface KnowledgeBaseChapter {
  id: number;
  title: string;
  content: string;
  images: KnowledgeBaseImage[];
}

export interface KnowledgeBaseTerm {
  id: number;
  title: string;
  description: string;
  chapters: KnowledgeBaseChapter[];
}
