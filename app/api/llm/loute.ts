// import { createGoogleGenerativeAI } from '@ai-sdk/google';;
// import { streamText } from 'ai';
// require('dotenv').config();

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// // Initialize the Google Generative AI provider with the API key
// const google = createGoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,  // API key is passed here
//     baseURL: 'https://generativelanguage.googleapis.com/v1beta', // Default URL; can be customized
//   });

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const  result = streamText({
//     model: google('gemini-2.0-flash', { useSearchGrounding: true }),
//     system: 'You are a helpful assistant.',
//     messages,
//   });

//   for await (const text of result.textStream) {
//     process.stdout.write(text);
//     console.log(text);
//   }

//   // return new Response(JSON.stringify({ result: fullText }), { status: 200 });


 
// }

// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { streamText } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// // Initialize the Google Generative AI provider with the API key
// const google = createGoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,  // API key is passed here
//     baseURL: 'https://generativelanguage.googleapis.com/v1beta', // Default URL; can be customized
// });

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     const result = streamText({
//       model: google('gemini-2.0-flash-exp'), // Simplified model call
//       system: 'You are a helpful assistant.',
//       messages,
//     });

//     // Stream the response
//     for await (const text of result.textStream) {
//       console.log(text);  // Log the output
//     }

//     return new Response(JSON.stringify({ result }), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
//   }
// }





// import { createGoogleGenerativeAI } from '@ai-sdk/google';

// // Initialize the Google Generative AI provider with the API key
// const google = createGoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
//     baseURL: 'https://generativelanguage.googleapis.com/v1beta',
// });

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     // Test non-streaming generation
//     const result = generateText({
//       model: 'gemini-2.0-flash',
//       messages: messages,
//     });

//     console.log('Non-streaming result:', result);
//     return new Response(JSON.stringify({ result }), { status: 200 });
//   } catch (error) {
//     console.error('Error:', error);
//     return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
//   }
// }


// require('dotenv').config();
// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { streamText } from 'ai';
//   // This loads the variables from .env into process.env

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;


// console.log("Api_key", process.env.GOOGLE_GENERATIVE_AI_API_KEY);

// // Initialize the Google Generative AI provider with the API key
// const google = createGoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,  // API key is passed here
//     baseURL: 'https://generativelanguage.googleapis.com/v1beta', // Default URL; can be customized
// });

// export async function POST(req: Request) {
//   try {
    
//     const { messages } = await req.json();

//     // Call the streamText function
//     const result = streamText({
//       model: google('gemini-2.0-flash-exp'),  // Simplified model call
//       system: 'You are a helpful assistant.',
//       messages,
//     });

//     // Check the result structure first
//     console.log('Result:', result);

//     // Ensure that the result.textStream is an iterable
//     if (result && result.textStream) {
//       const texts = [];
//       for await (const text of result.textStream) {
//         texts.push(text); // Collect all stream pieces
//         console.log(text);  // Log the text
//       }

//       // Return the collected texts in the response
//       return new Response(JSON.stringify({ result: texts }), { status: 200 });
//     } else {
//       // If there's no textStream, return a message indicating this
//       return new Response(JSON.stringify({ error: 'No text stream received' }), { status: 400 });
//     }

//   } catch (error) {
//     console.error(error);  // Log the error for debugging purposes
//     return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
//   }
// }


// require('dotenv').config();
// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { streamText } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// console.log("Api_key", process.env.GOOGLE_GENERATIVE_AI_API_KEY);

// // Initialize the Google Generative AI provider with the API key
// const google = createGoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,  // API key is passed here
//     baseURL: 'https://generativelanguage.googleapis.com/v1beta', // Default URL; can be customized
// });

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     // Call the streamText function
//     const result = streamText({
//       model: google('gemini-2.0-flash-exp'),  // Simplified model call
//       system: 'You are a helpful assistant.',
//       messages,
//     });

//     // Check the result structure first
//     console.log('Result:', result);

//     // Ensure that the result.textStream is an iterable
//     if (result && result.textStream) {
//       const texts = [];
//       for await (const text of result.textStream) {
//         texts.push(text);  // Collect all stream pieces
//         console.log(text);  // Log the text
//       }

//       // Concatenate all the text chunks into a single string
//       const fullText = texts.join('');  // Join the text chunks without any separator

//       // Return the concatenated text in the response
//       return new Response(JSON.stringify({ result: fullText }), { status: 200 });
//     } else {
//       // If there's no textStream, return a message indicating this
//       return new Response(JSON.stringify({ error: 'No text stream received' }), { status: 400 });
//     }

//   } catch (error) {
//     console.error(error);  // Log the error for debugging purposes
//     return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
//   }
// }


// require('dotenv').config();
// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { streamText } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// console.log("Api_key", process.env.GOOGLE_GENERATIVE_AI_API_KEY);

// // Initialize the Google Generative AI provider with the API key
// const google = createGoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,  // API key is passed here
//     baseURL: 'https://generativelanguage.googleapis.com/v1beta', // Default URL; can be customized
// });

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();

//     // Call the streamText function
//     const result = streamText({
//       model: google('gemini-2.0-flash-exp'),  // Simplified model call
//       system: 'You are a helpful assistant.',
//       messages,
//     });

//     // Check if the result contains the textStream
//     if (result && result.textStream) {
//       const texts = [];
//       for await (const text of result.textStream) {
//         texts.push(text); // Collect all stream pieces
//       }

//       // Join all chunks into a single string and send it in the response
//       const fullText = texts.join('');

//       // Return the formatted result as a plain text
//       return new Response(JSON.stringify({ result: fullText }), { status: 200 });
//     } else {
//       // If there's no textStream, return a message indicating this
//       return new Response(JSON.stringify({ error: 'No text stream received' }), { status: 400 });
//     }

//   } catch (error) {
//     console.error(error);  // Log the error for debugging purposes
//     return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500 });
//   }
// }

// 

// require('dotenv').config();
// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { streamText } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 60;

// console.log("Api_key", process.env.GOOGLE_GENERATIVE_AI_API_KEY);

// // Initialize the Google Generative AI provider with the API key
// const google = createGoogleGenerativeAI({
//     apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
//     baseURL: 'https://generativelanguage.googleapis.com/v1beta',
// });

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();
    
//     // Since you're using the AI SDK and specifying streamProtocol: 'text',
//     // we need to return the stream directly as expected by this protocol
//     const result = streamText({
//       model: google('gemini-2.0-flash-exp'),
//       system: 'You are a helpful assistant.',
//       messages,
//     });
    
//     // Return the stream directly - the AI SDK expects this format
//     return new Response(result.textStream, {
//       headers: {
//         'Content-Type': 'text/plain; charset=utf-8',
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: 'An error occurred' }), { 
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//   }
// }

// import { createAgent } from '../../lib/agent';
// import { mcpServerDatabase } from '../../../public/data/data.json';

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