
import React, { useState, useEffect } from 'react';
import { TextBlock as TextBlockType } from '@/components/lessons/ContentBlockRenderer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import InlineQuiz from '@/components/lessons/InlineQuiz';

interface TextBlockProps {
  block: TextBlockType;
}

// Function to detect and extract key terms from text
const extractKeyTerms = (text: string) => {
  // Look for patterns like "Term - definition" or "Term: definition"
  const termMatches = text.match(/\b([A-Z][a-zA-Z\s]+)([\s]*[-:]([\s\S]+?)(?=\n\n|\n[A-Z]|\n$|$))/g);
  
  if (!termMatches) return [];
  
  return termMatches.map(match => {
    const parts = match.split(/[-:]/);
    if (parts.length >= 2) {
      return {
        term: parts[0].trim(),
        definition: parts.slice(1).join(':').trim()
      };
    }
    return null;
  }).filter(Boolean);
};

export default function TextBlock({ block }: TextBlockProps) {
  const [keyTerms, setKeyTerms] = useState<Array<{ term: string; definition: string }>>([]);
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Generate a quiz based on the content of the text block
  const generateQuiz = () => {
    // In a real implementation, this would use NLP or AI to generate relevant questions
    // For now, we'll use a simple example based on key terms
    if (keyTerms.length > 0) {
      const term = keyTerms[0];
      return {
        question: `What is the definition of "${term.term}"?`,
        options: [
          term.definition,
          "This is an incorrect definition",
          "This is another incorrect definition",
          "None of the above",
        ],
        correctAnswer: 0,
        explanation: `"${term.term}" is defined as: ${term.definition}`
      };
    }
    
    return {
      question: "What is the main topic of this paragraph?",
      options: [
        "Information Technology",
        "Computer Science",
        "Data Processing",
        "Digital Literacy",
      ],
      correctAnswer: 2,
      explanation: "The paragraph primarily discusses various aspects of data processing and how it relates to information technology."
    };
  };
  
  // Process the text content to extract key terms
  useEffect(() => {
    if (block.content) {
      const extracted = extractKeyTerms(block.content);
      setKeyTerms(extracted);
    }
  }, [block.content]);
  
  // For paragraphs that are likely to be significant (longer text), offer a quiz opportunity
  const shouldOfferQuiz = block.content.length > 200 && !showQuiz;
  
  return (
    <div className="my-4">
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
        >
          {block.content}
        </ReactMarkdown>
        
        {/* Display any identified key terms */}
        {keyTerms.length > 0 && (
          <div className="mt-2">
            {keyTerms.map((item, index) => (
              <span key={index} className="inline-block mr-2 mb-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-blue-600 font-medium hover:bg-blue-50 border border-blue-200"
                  onClick={() => setActiveTerm(activeTerm === item.term ? null : item.term)}
                >
                  {item.term}
                </Button>
                {activeTerm === item.term && (
                  <div className="mt-1 p-3 bg-blue-50 text-sm rounded-md border border-blue-200">
                    <strong>{item.term}</strong>: {item.definition}
                  </div>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Offer a quiz for longer content blocks */}
      {shouldOfferQuiz && (
        <div className="mt-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 hover:text-blue-800 flex items-center" 
            onClick={() => setShowQuiz(true)}
          >
            Test your knowledge about this content
          </Button>
        </div>
      )}
      
      {/* Show the quiz if requested */}
      {showQuiz && <InlineQuiz {...generateQuiz()} />}
    </div>
  );
}
