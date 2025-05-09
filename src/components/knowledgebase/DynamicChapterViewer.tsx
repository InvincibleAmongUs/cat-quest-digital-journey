
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, ArrowRight, Book } from 'lucide-react';
import { KnowledgeBaseChapter } from '@/utils/knowledgeBase';
import { ContentService } from '@/services/ContentService';
import ContentBlockRenderer, { AnyContentBlock } from '@/components/lessons/ContentBlockRenderer';
import { useToast } from '@/hooks/use-toast';
import TextToSpeech from '@/components/accessibility/TextToSpeech';
import QuizSection from '@/components/quiz/QuizSection';

export default function DynamicChapterViewer() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState<KnowledgeBaseChapter | null>(null);
  const [contentBlocks, setContentBlocks] = useState<AnyContentBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  const [readingProgress, setReadingProgress] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadChapter = async () => {
      if (!chapterId) return;
      
      setIsLoading(true);
      try {
        const chapterNum = parseInt(chapterId, 10);
        const loadedChapter = await ContentService.getChapterFromStorage(chapterNum);
        
        if (loadedChapter) {
          setChapter(loadedChapter);
          
          // Convert chapter content to interactive blocks
          const blocks = ContentService.convertChapterToContentBlocks(loadedChapter);
          setContentBlocks(blocks as AnyContentBlock[]);
        } else {
          toast({
            title: "Error Loading Chapter",
            description: `Chapter ${chapterId} could not be loaded.`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error loading chapter:", error);
        toast({
          title: "Error",
          description: "Failed to load chapter content. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadChapter();
  }, [chapterId, toast]);

  // Track reading progress as user scrolls through the chapter
  useEffect(() => {
    if (!chapter) return;
    
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      
      // Calculate progress percentage
      const progress = Math.min(100, Math.round((scrolled / (fullHeight - windowHeight)) * 100));
      setReadingProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapter]);

  const handleRateContent = (rating: number) => {
    setUserRating(rating);
    toast({
      title: "Thank you for your feedback!",
      description: `You rated this chapter ${rating} stars.`,
    });
    
    // Here we would save the rating to the database in a real implementation
  };

  const navigateToPreviousChapter = () => {
    if (!chapterId) return;
    const prevChapterId = parseInt(chapterId, 10) - 1;
    if (prevChapterId >= 1) {
      window.location.href = `/knowledge-base/${prevChapterId}`;
    }
  };

  const navigateToNextChapter = () => {
    if (!chapterId) return;
    const nextChapterId = parseInt(chapterId, 10) + 1;
    // Assuming we have 7 chapters total
    if (nextChapterId <= 7) {
      window.location.href = `/knowledge-base/${nextChapterId}`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Chapter Not Found</h2>
              <p className="text-muted-foreground mt-2">
                The requested chapter could not be found. Please try another chapter.
              </p>
              <Button className="mt-4" onClick={() => window.location.href = '/knowledge-base'}>
                Return to Knowledge Base
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Chapter {chapter.id}</p>
              <CardTitle className="text-2xl">{chapter.title}</CardTitle>
            </div>
            <TextToSpeech text={chapter.content} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Reading Progress</span>
              <span>{readingProgress}%</span>
            </div>
            <Progress value={readingProgress} className="h-2" />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="pt-4">
              <div className="prose max-w-none dark:prose-invert">
                {contentBlocks.map((block, index) => (
                  <ContentBlockRenderer key={index} block={block} />
                ))}
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Rate This Chapter</h3>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button 
                      key={rating}
                      variant={userRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleRateContent(rating)}
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={navigateToPreviousChapter}
                  disabled={chapter.id <= 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Chapter
                </Button>
                
                <Button onClick={navigateToNextChapter} disabled={chapter.id >= 7}>
                  Next Chapter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="pt-4">
              <h3 className="text-lg font-medium mb-4">Related Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium">Additional Reading</h4>
                    <ul className="ml-4 mt-2 space-y-2">
                      <li className="text-sm text-blue-600 hover:underline cursor-pointer">
                        Supplementary material for {chapter.title}
                      </li>
                      <li className="text-sm text-blue-600 hover:underline cursor-pointer">
                        Practice exercises
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium">Video Explanations</h4>
                    <ul className="ml-4 mt-2 space-y-2">
                      <li className="text-sm text-blue-600 hover:underline cursor-pointer">
                        Video tutorial: Key concepts of Chapter {chapter.id}
                      </li>
                      <li className="text-sm text-blue-600 hover:underline cursor-pointer">
                        Practical demonstration
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="discussion" className="pt-4">
              <h3 className="text-lg font-medium mb-4">Discussion</h3>
              <Card className="mb-4">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm mb-4">
                    Have questions or thoughts about this chapter? Share them here!
                  </p>
                  
                  <textarea 
                    className="w-full border rounded-md p-2 min-h-[100px]"
                    placeholder="Type your comment or question here..."
                  />
                  
                  <Button className="mt-2">Post Comment</Button>
                  
                  <div className="mt-6 space-y-4">
                    <p className="text-sm text-muted-foreground">No comments yet. Be the first to start the discussion!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
