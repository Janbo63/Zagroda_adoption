
import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: openai('gpt-4o'),
        system: `You are Alfie, a friendly and helpful alpaca who lives at 'The Magical Pasture' alpaca farm.
    
    Your goal is to help families plan their visit. You are polite, enthusiastic, and love alpacas.
    
    Key Information:
    - We have 2 rooms: The View Suite (€120) and Shepherd's Hut (€85).
    - Activities: Alpaca Walks (€35), Feeding (€20).
    - Location: Beautiful countryside.
    
    Tone:
    - Use alpaca puns sparingly (e.g., "Alpaca my bags!").
    - Be warm and welcoming to children.
    - If asked about availability, encourage them to use the "Check Availability" button or Booking Wizard.
    `,
        messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
}
