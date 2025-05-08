
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Home, Book, ChevronRight, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ChapterViewer from '@/components/knowledgebase/ChapterViewer';
import { getChaptersForTerm, KnowledgeBaseChapter } from '@/utils/knowledgeBase';
import { Link } from 'react-router-dom';

export default function KnowledgeBasePage() {
  const { termId = '1', chapterId } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState(termId);
  const [chapters, setChapters] = useState<Record<string, KnowledgeBaseChapter[]>>({});
  const [loadingChapters, setLoadingChapters] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(
    chapterId ? parseInt(chapterId) : null
  );

  useEffect(() => {
    const fetchChapters = async () => {
      setLoadingChapters(true);
      
      // Load chapters for all terms
      const terms = [1, 2, 3, 4];
      const chaptersMap: Record<string, KnowledgeBaseChapter[]> = {};
      
      for (const term of terms) {
        const termChapters = await getChaptersForTerm(term);
        chaptersMap[term.toString()] = termChapters;
      }
      
      setChapters(chaptersMap);
      setLoadingChapters(false);
    };
    
    fetchChapters();
  }, []);

  // Effect to update URL when changing chapter
  useEffect(() => {
    if (selectedChapter) {
      navigate(`/knowledge-base/${activeTab}/${selectedChapter}`);
    } else {
      navigate(`/knowledge-base/${activeTab}`);
    }
  }, [selectedChapter, activeTab, navigate]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-primary mx-auto"></div>
          <p className="mt-4 text-tech-primary font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const handleChapterSelect = (chapterId: number) => {
    setSelectedChapter(chapterId);
  };

  const handleChapterNavigate = (chapterId: number) => {
    setSelectedChapter(chapterId);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedChapter(null); // Clear selected chapter when changing terms
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user.username}
        points={user.points}
      />
      
      <div className="bg-muted py-4 border-b">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">
                  <Home className="h-3.5 w-3.5 mr-1 inline" />
                  <span>Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/knowledge-base">
                  <Book className="h-3.5 w-3.5 mr-1 inline" />
                  <span>Knowledge Base</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {selectedChapter && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <span>Chapter {selectedChapter}</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </Breadcrumb>
        </div>
      </div>
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Access the full Computer Applications Technology curriculum and reference materials.
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList>
            <TabsTrigger value="1">Term 1</TabsTrigger>
            <TabsTrigger value="2">Term 2</TabsTrigger>
            <TabsTrigger value="3">Term 3</TabsTrigger>
            <TabsTrigger value="4">Term 4</TabsTrigger>
          </TabsList>
          
          {[1, 2, 3, 4].map(term => (
            <TabsContent key={term} value={term.toString()}>
              <div className="grid md:grid-cols-12 gap-6">
                {/* Sidebar with chapter listing */}
                <div className="md:col-span-3 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Term {term} Chapters</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {loadingChapters ? (
                          Array(3).fill(0).map((_, idx) => (
                            <div key={idx} className="p-4">
                              <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                          ))
                        ) : chapters[term.toString()]?.length > 0 ? (
                          chapters[term.toString()].map(chapter => (
                            <Button
                              key={chapter.id}
                              variant="ghost"
                              className={`w-full justify-start p-4 rounded-none ${
                                selectedChapter === chapter.id ? 'bg-secondary' : ''
                              }`}
                              onClick={() => handleChapterSelect(chapter.id)}
                            >
                              <FileText className="h-4 w-4 mr-2" />
                              <span className="text-left">
                                Chapter {chapter.id}: {chapter.title.split(':')[0]}
                              </span>
                              {selectedChapter === chapter.id && (
                                <ChevronRight className="h-4 w-4 ml-auto" />
                              )}
                            </Button>
                          ))
                        ) : (
                          <p className="p-4 text-muted-foreground text-center">
                            No chapters available for Term {term}.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Main content area */}
                <div className="md:col-span-9">
                  {selectedChapter ? (
                    <ChapterViewer 
                      chapterId={selectedChapter} 
                      onNavigate={handleChapterNavigate}
                    />
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle>Term {term} Reference Material</CardTitle>
                        <CardDescription>
                          Select a chapter from the sidebar to view its content.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center py-12">
                        <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                        <h3 className="mt-4 text-xl font-medium">
                          Choose a Chapter
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          Select a chapter from the sidebar to start reading.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
