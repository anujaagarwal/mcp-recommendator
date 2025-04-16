import { createAgent } from '../../lib/agents';
import { mcpServerDatabase } from '../../../public/data/data';
import { NextRequest, NextResponse } from 'next/server';
import { UserMessage, AssistantMessage } from 'beeai-framework/backend/core';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, activeMcpServers } = body;

    // Create recommendation agent
    const agent = await createAgent(mcpServerDatabase, activeMcpServers || []);

    const userMessage = messages[messages.length - 1].content;

    const inputs = [
      new UserMessage(userMessage)
    ];

   
    const response = await agent.run(inputs); 

    // Return the response
    return NextResponse.json({
      text: response || '',
      mcpRecommendations: response || null,
    });
  } catch (error) {
    console.error('Error processing chat:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
