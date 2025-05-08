
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Book, ClipboardCheck } from 'lucide-react';
import { moduleOneLessons } from '@/data/moduleOneData';
import ContentBlockRenderer from './ContentBlockRenderer';

interface LessonContentDisplayProps {
  lessonId: string;
  moduleId: string;
  onStartQuiz: () => void;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  markdownContent?: string;
}

export default function LessonContentDisplay({
  lessonId,
  moduleId,
  onStartQuiz,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  markdownContent
}: LessonContentDisplayProps) {
  
  // Try to find structured content for this lesson
  const structuredContent = moduleId === "1" ? moduleOneLessons[lessonId] : null;
  
  return (
    <div className="space-y-6">
      {structuredContent ? (
        // Render structured content using ContentBlockRenderer
        <div>
          <h1 className="text-3xl font-bold mb-6">{structuredContent.title}</h1>
          
          <div className="prose max-w-none dark:prose-invert">
            {structuredContent.blocks.map((block, index) => (
              <ContentBlockRenderer key={index} block={block} />
            ))}
          </div>
        </div>
      ) : (
        // Fallback to markdown content
        <div className="prose max-w-none dark:prose-invert">
          <ReactMarkdown 
            rehypePlugins={[rehypeRaw]} 
            remarkPlugins={[remarkGfm]} 
            children={markdownContent || '# Content not found'} 
          />
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {hasPrevious ? (
          <Button 
            variant="outline"
            onClick={onPrevious}
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous Lesson
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Module
          </Button>
        )}

        <div className="space-x-2">
          <Button 
            variant="outline" 
            onClick={() => window.open('/knowledge-base/1', '_blank')}
            className="flex items-center"
          >
            <Book className="mr-1 h-4 w-4" />
            Knowledge Base
          </Button>

          {structuredContent && structuredContent.quizQuestions.length > 0 && (
            <Button onClick={onStartQuiz}>
              <ClipboardCheck className="mr-1 h-4 w-4" />
              Take Quiz
            </Button>
          )}

          {hasNext && (
            <Button onClick={onNext}>
              Next Lesson
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
