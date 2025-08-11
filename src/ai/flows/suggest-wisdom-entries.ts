'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting wisdom entries to users.
 *
 * - suggestWisdomEntries - A function that suggests wisdom entries based on user logs and philosophical knowledge.
 * - SuggestWisdomEntriesInput - The input type for the suggestWisdomEntries function.
 * - SuggestWisdomEntriesOutput - The return type for the suggestWisdomEntries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestWisdomEntriesInputSchema = z.object({
  userLogs: z
    .string()
    .describe(
      'A string containing the user\u2019s daily logs of applied and missed wisdom entries.'
    ),
  philosophicalKnowledge: z
    .string()
    .describe(
      'General philosophical knowledge to provide context for suggestions.'
    ),
});
export type SuggestWisdomEntriesInput = z.infer<typeof SuggestWisdomEntriesInputSchema>;

const SuggestWisdomEntriesOutputSchema = z.object({
  suggestedEntries: z
    .array(z.string())
    .describe('An array of suggested wisdom entries.'),
});
export type SuggestWisdomEntriesOutput = z.infer<typeof SuggestWisdomEntriesOutputSchema>;

export async function suggestWisdomEntries(
  input: SuggestWisdomEntriesInput
): Promise<SuggestWisdomEntriesOutput> {
  return suggestWisdomEntriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestWisdomEntriesPrompt',
  input: {schema: SuggestWisdomEntriesInputSchema},
  output: {schema: SuggestWisdomEntriesOutputSchema},
  prompt: `You are a wisdom guide, helping users discover new areas for personal growth.

  Based on the user's daily logs and general philosophical knowledge, suggest a few relevant wisdom entries.

  User Logs:
  {{userLogs}}

  Philosophical Knowledge:
  {{philosophicalKnowledge}}

  Suggestions (as an array of strings):
  `,
});

const suggestWisdomEntriesFlow = ai.defineFlow(
  {
    name: 'suggestWisdomEntriesFlow',
    inputSchema: SuggestWisdomEntriesInputSchema,
    outputSchema: SuggestWisdomEntriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
