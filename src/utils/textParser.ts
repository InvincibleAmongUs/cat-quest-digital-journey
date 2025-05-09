
/**
 * Utility functions for parsing and extracting structured content from text files
 */

// Function to extract the chapter title from text content
export function extractChapterTitle(content: string): string {
  const firstLine = content.split('\n')[0].trim();
  return firstLine;
}

// Function to extract section titles from content
export function extractSections(content: string): { title: string; content: string }[] {
  const lines = content.split('\n');
  const sections: { title: string; content: string }[] = [];
  let currentSection: { title: string; content: string } | null = null;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for capitalized headings that might be section titles
    if (line.toUpperCase() === line && line.length > 0 && !line.startsWith('FIGURE') && !line.startsWith('TABLE')) {
      // Save the previous section if it exists
      if (currentSection) {
        sections.push({
          title: currentSection.title,
          content: currentSection.content.trim()
        });
      }
      
      // Start a new section
      currentSection = {
        title: line,
        content: ''
      };
    } else if (currentSection) {
      // Append to the content of the current section
      currentSection.content += line + '\n';
    }
  }
  
  // Add the last section if it exists
  if (currentSection) {
    sections.push({
      title: currentSection.title,
      content: currentSection.content.trim()
    });
  }
  
  return sections;
}

// Function to extract references to figures and tables from text
export function extractReferences(content: string): { type: 'figure' | 'table'; id: string }[] {
  const references: { type: 'figure' | 'table'; id: string }[] = [];
  
  // Look for figure references like "Figure 1.2"
  const figureRegex = /Figure\s+(\d+\.\d+)/gi;
  let figureMatch;
  
  while ((figureMatch = figureRegex.exec(content)) !== null) {
    references.push({
      type: 'figure',
      id: figureMatch[1]
    });
  }
  
  // Look for table references like "Table 1.2"
  const tableRegex = /Table\s+(\d+\.\d+)/gi;
  let tableMatch;
  
  while ((tableMatch = tableRegex.exec(content)) !== null) {
    references.push({
      type: 'table',
      id: tableMatch[1]
    });
  }
  
  return references;
}

// Function to clean and format text content
export function formatText(content: string): string {
  // Replace multiple newlines with a single newline
  let formatted = content.replace(/\n{3,}/g, '\n\n');
  
  // Add proper spacing after periods
  formatted = formatted.replace(/\.(?=[A-Z])/g, '. ');
  
  return formatted.trim();
}

// Function to extract key terms and their definitions
export function extractKeyTerms(content: string): Record<string, string> {
  const keyTerms: Record<string, string> = {};
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for lines that might be key term definitions (term followed by dash or colon)
    const termMatch = line.match(/^([A-Za-z\s]+)[\s]*[-:](.*)/);
    
    if (termMatch) {
      const term = termMatch[1].trim();
      const definition = termMatch[2].trim();
      
      keyTerms[term] = definition;
    }
  }
  
  return keyTerms;
}
