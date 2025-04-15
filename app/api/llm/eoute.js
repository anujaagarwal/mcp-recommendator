
// import  {createAgent} from '../../lib/agents';
// import { mcpServerDatabase } from '../../../public/data/data.ts';

// export default async function handler(req, res) {
//   const { messages, activeMcpServers } = req.body;
  
//   try {
//     // Create recommendation agent
//     const agent = await createAgent(mcpServerDatabase, activeMcpServers);
    
//     // Get the last user message
//     const userMessage = messages[messages.length - 1].content;
    
//     // Process the message with the agent
//     const response = await agent.processMessage(userMessage);
    
//     // Stream the response
//     res.status(200).json({
//       text: response.text,
//       mcpRecommendations: response.mcpRecommendations || null,
//     });
//   } catch (error) {
//     console.error('Error processing chat:', error);
//     res.status(500).json({ error: 'Failed to process chat message' });
//   }
// }
