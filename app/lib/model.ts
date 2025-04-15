// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { streamText } from 'ai';
require("dotenv").config();
// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// Initialize the Google Generative AI provider with the API key
import Groq from "groq-sdk";

export const llm = new Groq({ apiKey: process.env.GROQ_API_KEY });
// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     const { messages } = req.body;

//     // Call the streamText function to get the result from the model
//     const result = await streamText({
//       model: google('gemini-2.0-flash-exp', { useSearchGrounding: true }),
//       system: 'You are a helpful assistant.',
//       messages,
//     });

//     // Await the textPromise to get the actual text response
//     const aiResponse = await result.textPromise;  // Resolve the promise to get the final text

//     if (!aiResponse) {
//       return res.status(500).json({ error: 'No response generated from AI' });
//     }

//     // Return the AI response as JSON
//     return res.status(200).json({ response: aiResponse });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     return res.status(500).json({ error: 'Error processing the request' });
//   }
// }
