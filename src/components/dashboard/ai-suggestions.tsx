"use client";

import { useState } from 'react';
import { Lightbulb, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { suggestWisdomEntries } from '@/ai/flows/suggest-wisdom-entries';
import { USER_LOGS, GLOBAL_WISDOM_ENTRIES } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const philosophicalKnowledge = `
Stoicism: Focuses on virtue, reason, and living in accordance with nature. Key concepts include Memento Mori (remember death), Amor Fati (love of fate), and the dichotomy of control.
Zen Buddhism: Emphasizes mindfulness, meditation, and direct insight. Concepts like Shoshin (beginner's mind) encourage approaching life with openness and curiosity.
Existentialism: Explores questions of freedom, responsibility, and the meaning of life in a meaningless universe. It encourages creating one's own values.
`;

export function AiSuggestions() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggest = async () => {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const userLogsString = USER_LOGS.slice(0, 20).map(log => {
        const wisdom = GLOBAL_WISDOM_ENTRIES.find(w => w.id === log.wisdomId);
        return `${log.date}: ${wisdom?.title} - ${log.status}`;
      }).join('\n');

      const result = await suggestWisdomEntries({
        userLogs: userLogsString,
        philosophicalKnowledge,
      });
      
      setSuggestions(result.suggestedEntries);
      toast({
          title: "Suggestions Ready",
          description: "We've found some new wisdom for you to consider."
      })
    } catch (error) {
      console.error("Failed to get suggestions:", error);
      toast({
          title: "Error",
          description: "Could not fetch AI suggestions. Please try again later.",
          variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-accent" />
            <CardTitle>AI-Powered Suggestions</CardTitle>
        </div>
        <CardDescription>
          Discover new wisdom based on your recent logs.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[120px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : suggestions.length > 0 ? (
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 mt-1 text-accent shrink-0" />
                <span className="text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-muted-foreground pt-4">Click the button to get new suggestions.</div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSuggest} disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Get New Suggestions
        </Button>
      </CardFooter>
    </Card>
  );
}
