
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DeepseekService } from '@/services/DeepseekService';

export default function AIConceptExplainer() {
  const [concept, setConcept] = useState('');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  const { toast } = useToast();

  const handleExplainConcept = async () => {
    if (!concept.trim()) {
      toast({
        title: "Concept required",
        description: "Please enter a concept to explain",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setExplanation('');
    
    try {
      const result = await DeepseekService.explainConcept(concept);
      setExplanation(result);
    } catch (error) {
      console.error('Error explaining concept:', error);
      toast({
        title: "Error explaining concept",
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
        <CardTitle>AI Concept Explainer</CardTitle>
        <CardDescription>
          Get explanations for any Computer Applications Technology concept
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Enter a concept (e.g., 'CPU', 'Database', 'Network topology')" 
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button 
            onClick={handleExplainConcept} 
            disabled={loading || !concept.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Explaining
              </>
            ) : 'Explain'}
          </Button>
        </div>

        {explanation && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="font-semibold mb-2">Explanation of "{concept}"</h3>
            <div className="prose dark:prose-invert max-w-none">
              {explanation.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
