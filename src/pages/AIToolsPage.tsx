
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppHeader from '@/components/layout/AppHeader';
import { useAuth } from '@/contexts/AuthContext';
import AIQuizGenerator from '@/components/ai/AIQuizGenerator';
import AIConceptExplainer from '@/components/ai/AIConceptExplainer';
import AIContentSummarizer from '@/components/ai/AIContentSummarizer';

export default function AIToolsPage() {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        username={user?.username || 'Guest'} 
        points={user?.points || 0} 
      />
      
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-2">AI Learning Tools</h1>
        <p className="text-muted-foreground mb-6">
          Use these AI-powered tools to enhance your learning experience
        </p>
        
        <Tabs defaultValue="quiz" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="quiz">Quiz Generator</TabsTrigger>
            <TabsTrigger value="explain">Concept Explainer</TabsTrigger>
            <TabsTrigger value="summarize">Content Summarizer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quiz" className="mt-0">
            <AIQuizGenerator />
          </TabsContent>
          
          <TabsContent value="explain" className="mt-0">
            <AIConceptExplainer />
          </TabsContent>
          
          <TabsContent value="summarize" className="mt-0">
            <AIContentSummarizer />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
