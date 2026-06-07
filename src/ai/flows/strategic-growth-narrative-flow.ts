'use server';
/**
 * @fileOverview This file implements a Genkit flow to generate a concise narrative explaining the significance
 * of a calculated profit in real-world terms or relative to common benchmarks.
 *
 * - generateStrategicGrowthNarrative - A function that handles the generation of the strategic growth narrative.
 * - StrategicGrowthNarrativeInput - The input type for the generateStrategicGrowthNarrative function.
 * - StrategicGrowthNarrativeOutput - The return type for the generateStrategicGrowthNarrative function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const StrategicGrowthNarrativeInputSchema = z.object({
  amount: z.number().nonnegative().describe('The initial investment amount in Indian Rupees (₹).'),
  multiplier: z.number().nonnegative().describe('The multiplier applied to the amount (e.g., 1.75 for 1.75x).'),
  finalAmount: z.number().nonnegative().describe('The final calculated amount after applying the multiplier.'),
  profit: z.number().describe('The total profit generated (can be negative in case of loss).'),
});
export type StrategicGrowthNarrativeInput = z.infer<typeof StrategicGrowthNarrativeInputSchema>;

const StrategicGrowthNarrativeOutputSchema = z.object({
  narrative: z.string().describe('A concise narrative explaining the significance of the profit.'),
});
export type StrategicGrowthNarrativeOutput = z.infer<typeof StrategicGrowthNarrativeOutputSchema>;

export async function generateStrategicGrowthNarrative(
  input: StrategicGrowthNarrativeInput
): Promise<StrategicGrowthNarrativeOutput> {
  return strategicGrowthNarrativeFlow(input);
}

const strategicGrowthNarrativePrompt = ai.definePrompt({
  name: 'strategicGrowthNarrativePrompt',
  input: { schema: StrategicGrowthNarrativeInputSchema },
  output: { schema: StrategicGrowthNarrativeOutputSchema },
  prompt: `You are an insightful financial advisor specializing in growth analysis. Your task is to provide a concise narrative (2-3 sentences) that explains the significance of a calculated profit, relating it to real-world impact or common financial benchmarks.

Consider the following financial details:
Initial Investment: ₹{{{amount}}}
Multiplier Applied: {{{multiplier}}}x
Final Amount: ₹{{{finalAmount}}}
Total Profit: ₹{{{profit}}}

Based on these figures, provide a meaningful interpretation of the profit's scale and its potential impact. The narrative should be encouraging and focus on the growth achieved. If there is a loss (negative profit), provide a constructive insight on resilience or strategic adjustment.`,
});

const strategicGrowthNarrativeFlow = ai.defineFlow(
  {
    name: 'strategicGrowthNarrativeFlow',
    inputSchema: StrategicGrowthNarrativeInputSchema,
    outputSchema: StrategicGrowthNarrativeOutputSchema,
  },
  async (input) => {
    const { output } = await strategicGrowthNarrativePrompt(input);
    return output!;
  }
);
