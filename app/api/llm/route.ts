import { createAgent } from '../../lib/agents';
import { mcpServerDatabase } from '../../../public/data/data';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, activeMcpServers } = body;
    
    // Create recommendation agent
    const agent = await createAgent(mcpServerDatabase, activeMcpServers || []);
    
    // Get the last user message
    const userMessage = messages[messages.length - 1].content;
    
    // Process the message with the agent
    const response = await agent.run(userMessage);
    
    // Return the response
    return NextResponse.json({
      text: response.result.finalAnswer || '',
      mcpRecommendations: response.result.finalAnswer || null,
    });
  } catch (error) {
    console.error('Error processing chat:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}