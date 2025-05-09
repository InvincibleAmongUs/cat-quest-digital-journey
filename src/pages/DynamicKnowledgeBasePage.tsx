
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Book, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AppHeader from '@/components/layout/AppHeader';
import DynamicChapterViewer from '@/components/knowledgebase/DynamicChapterViewer';
import { useAuth } from '@/contexts/AuthContext';
import { ContentService } from '@/services/ContentService';

interface KnowledgeBaseProps {
  termId?: string;
}

export default function DynamicKnowledgeBasePage({ termId: propTermId }: KnowledgeBaseProps) {
  const { termId: paramTermId, chapterId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const activeTermId = propTermId || paramTermId || "1";
  const [selectedTab, setSelectedTab] = useState(activeTermId);
  const [searchQuery, setSearchQuery] = useState('');
  const [chapters, setChapters] = useState<Array<{ id: number, title: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load chapters for all terms
  useEffect(() => {
    const loadChapters = async () => {
      setIsLoading(true);
      try {
        const allChapters = [];
        // Load chapters 1 through 7 (or however many we have)
        for (let i = 1; i <= 7; i++) {
          try {
            const chapter = await ContentService.getChapterFromStorage(i);
            if (chapter) {
              allChapters.push({
                id: chapter.id,
                title: chapter.title,
                term: chapter.term
              });
            }
          } catch (error) {
            console.warn(`Could not load chapter ${i}:`, error);
          }
        }
        setChapters(allChapters);
      } catch (error) {
        console.error('Error loading chapters:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadChapters();
  }, []);
  
  // Handle search
  const filteredChapters = chapters.filter(chapter => 
    chapter.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group chapters by term
  const chaptersByTerm = filteredChapters.reduce((acc, chapter: any) => {
    const term = chapter.term || 1;
    if (!acc[term]) acc[term] = [];
    acc[term].push(chapter);
    return acc;
  }, {} as Record<number, typeof filteredChapters>);
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    navigate(`/knowledge-base/term/${value}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user?.username || 'Guest'} 
        points={user?.points || 0} 
      />
      
      <main className="container py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* If viewing a specific chapter, render the chapter viewer */}
          {chapterId ? (
            <div className="w-full">
              <Button 
                variant="ghost" 
                className="mb-4"
                onClick={() => navigate('/knowledge-base')}
              >
                &larr; Back to Knowledge Base
              </Button>
              <DynamicChapterViewer />
            </div>
          ) : (
            <>
              {/* Knowledge base browser when not viewing a specific chapter */}
              <div className="w-full md:w-3/4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Book className="mr-2" /> Knowledge Base
                    </CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="Search chapters..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <Tabs defaultValue={selectedTab} onValueChange={handleTabChange}>
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="1">Term 1</TabsTrigger>
                        <TabsTrigger value="2">Term 2</TabsTrigger>
                        <TabsTrigger value="3">Term 3</TabsTrigger>
                        <TabsTrigger value="4">Term 4</TabsTrigger>
                      </TabsList>
                      
                      {/* Map through each term and display its content */}
                      {[1, 2, 3, 4].map(termNum => (
                        <TabsContent key={termNum} value={String(termNum)}>
                          {isLoading ? (
                            <div className="flex justify-center p-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                            </div>
                          ) : chaptersByTerm[termNum]?.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2">
                              {chaptersByTerm[termNum].map(chapter => (
                                <Card key={chapter.id} className="overflow-hidden">
                                  <CardContent className="p-0">
                                    <div className="p-4">
                                      <h3 className="text-lg font-medium">
                                        Chapter {chapter.id}: {chapter.title}
                                      </h3>
                                      <Button 
                                        variant="link" 
                                        className="px-0 py-1"
                                        onClick={() => navigate(`/knowledge-base/${chapter.id}`)}
                                      >
                                        <BookOpen className="mr-2 h-4 w-4" /> 
                                        View Chapter
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          ) : (
                            <p className="text-center text-muted-foreground p-8">
                              {searchQuery ? 
                                "No chapters found matching your search." : 
                                `No chapters available for Term ${termNum}.`}
                            </p>
                          )}
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              {/* Sidebar with term information */}
              <div className="w-full md:w-1/4">
                <Card>
                  <CardHeader>
                    <CardTitle>Term {selectedTab}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-4">
                      <div>
                        <h3 className="font-medium">About this term</h3>
                        <p className="text-muted-foreground mt-1">
                          {selectedTab === "1" && "Introduction to computer systems and concepts."}
                          {selectedTab === "2" && "File management and operating systems."}
                          {selectedTab === "3" && "Word processing and basic applications."}
                          {selectedTab === "4" && "Computer networks and the internet."}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Learning objectives</h3>
                        <ul className="list-disc pl-4 text-muted-foreground mt-1">
                          <li>
                            {selectedTab === "1" && "Understand basic computing concepts"}
                            {selectedTab === "2" && "Master file organization techniques"}
                            {selectedTab === "3" && "Create and edit documents efficiently"}
                            {selectedTab === "4" && "Understand network fundamentals"}
                          </li>
                          <li>
                            {selectedTab === "1" && "Differentiate between data and information"}
                            {selectedTab === "2" && "Navigate file systems confidently"}
                            {selectedTab === "3" && "Apply formatting to enhance documents"}
                            {selectedTab === "4" && "Explain internet technologies"}
                          </li>
                          <li>
                            {selectedTab === "1" && "Identify different types of computing devices"}
                            {selectedTab === "2" && "Manage files and folders effectively"}
                            {selectedTab === "3" && "Create tables and charts in documents"}
                            {selectedTab === "4" && "Practice online safety and security"}
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => navigate(`/modules/${selectedTab}`)}
                        >
                          View Related Modules
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Study Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="link" className="p-0 h-auto text-left w-full justify-start">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Practice Exercises
                      </Button>
                      <Button variant="link" className="p-0 h-auto text-left w-full justify-start">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Flashcards
                      </Button>
                      <Button variant="link" className="p-0 h-auto text-left w-full justify-start">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Summary Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
