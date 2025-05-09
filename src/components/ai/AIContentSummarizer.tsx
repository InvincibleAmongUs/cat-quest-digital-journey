
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DeepseekService } from '@/services/DeepseekService';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function AIContentSummarizer() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [bulletPoints, setBulletPoints] = useState(true);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!content.trim() || content.length < 100) {
      toast({
        title: "More content needed",
        description: "Please enter at least 100 characters to summarize",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setSummary('');
    
    try {
      const result = await DeepseekService.summarizeContent(content, bulletPoints);
      setSummary(result);
    } catch (error) {
      console.error('Error summarizing content:', error);
      toast({
        title: "Error summarizing content",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Content Summarizer</CardTitle>
        <CardDescription>
          Generate concise summaries of any lecture or chapter content
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea 
          placeholder="Paste the content you want to summarize (at least 100 characters)..." 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          className="h-40"
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch 
              id="bullet-points" 
              checked={bulletPoints}
              onCheckedChange={setBulletPoints}
              disabled={loading}
            />
            <Label htmlFor="bullet-points">Format as bullet points</Label>
          </div>
          
          <Button 
            onClick={handleSummarize} 
            disabled={loading || content.length < 100}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summarizing
              </>
            ) : 'Summarize'}
          </Button>
        </div>

        {summary && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="font-semibold mb-2">Summary</h3>
            <div className="prose dark:prose-invert max-w-none">
              {summary.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
