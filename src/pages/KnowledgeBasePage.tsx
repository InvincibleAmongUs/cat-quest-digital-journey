
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, LayoutDashboard, BookOpen } from 'lucide-react';
import AppHeader from '@/components/layout/AppHeader';
import { useAuth } from '@/contexts/AuthContext';
import ChapterViewer from '@/components/knowledgebase/ChapterViewer';
import { useToast } from '@/hooks/use-toast';

// Define the structure for a chapter
interface Chapter {
  id: string;
  title: string;
  content: string;
}

// Sample chapter content (you can replace this with actual content)
const sampleChapters: Chapter[] = [
  {
    id: 'introduction',
    title: 'Introduction to Cybersecurity',
    content: `
      <h2>Welcome to Cybersecurity Basics</h2>
      <p>This section provides a foundational overview of cybersecurity principles and practices.</p>
      <p>Learn about the importance of protecting digital assets and understanding common threats.</p>
    `,
  },
  {
    id: 'threats',
    title: 'Common Cybersecurity Threats',
    content: `
      <h2>Understanding Cybersecurity Threats</h2>
      <p>Explore various types of cybersecurity threats, including malware, phishing, and ransomware.</p>
      <p>Learn how to identify and mitigate these threats to protect your systems and data.</p>
    `,
  },
  {
    id: 'prevention',
    title: 'Prevention and Best Practices',
    content: `
      <h2>Cybersecurity Prevention Techniques</h2>
      <p>Discover essential prevention techniques and best practices to enhance your cybersecurity posture.</p>
      <p>Implement strong passwords, enable multi-factor authentication, and keep your software up to date.</p>
    `,
  },
];

interface KnowledgeBaseParams {
  [key: string]: string | undefined;
  chapterId?: string;
  termId?: string;
}

export default function KnowledgeBasePage() {
  const { user } = useAuth();
  const { chapterId, termId } = useParams<KnowledgeBaseParams>();
  const [chapters, setChapters] = useState<Chapter[]>(sampleChapters);
  const [activeChapter, setActiveChapter] = useState<string>(chapterId || 'introduction');
  const [currentChapterContent, setCurrentChapterContent] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    // Load chapter content based on the activeChapter
    const chapter = chapters.find(c => c.id === activeChapter);
    if (chapter) {
      setCurrentChapterContent(chapter.content);
    } else {
      setCurrentChapterContent('<h2>Chapter not found</h2><p>Please select a chapter from the sidebar.</p>');
    }
  }, [activeChapter, chapters]);

  // Function to render chapter links
  const renderChapterLinks = () => {
    return chapters.map(chapter => (
      <li key={chapter.id} className="py-1">
        <Link
          to={`/knowledge-base/${termId || '1'}/${chapter.id}`}
          className={`block py-2 px-3 rounded-md ${
            activeChapter === chapter.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
          }`}
          onClick={() => setActiveChapter(chapter.id)}
        >
          {chapter.title}
        </Link>
      </li>
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user?.username || 'Guest'} 
        points={user?.points || 0}
      />
      
      <main className="container py-8">
        <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-card p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Chapters</h2>
              <nav>
                <ul className="space-y-1">
                  {renderChapterLinks()}
                </ul>
              </nav>
            </div>
            
            <div className="bg-card p-4 rounded-lg shadow mt-4">
              <h2 className="text-lg font-semibold mb-2">Navigation</h2>
              <div className="space-y-2">
                <Link
                  to="/"
                  className="text-primary hover:underline flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Home
                </Link>
                
                <Link
                  to="/dashboard"
                  className="text-primary hover:underline flex items-center"
                >
                  <LayoutDashboard className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
                
                <Link
                  to="/modules"
                  className="text-primary hover:underline flex items-center"
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  All Modules
                </Link>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="w-full md:w-3/4">
            <Card className="bg-card shadow">
              <CardContent className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: currentChapterContent }} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
