// This file provides direct imports for model adapters
// instead of using dynamic imports that Turbopack doesn't support

// Import the specific model we need
import { GroqChatModel } from "beeai-framework/adapters/groq/backend/chat";

// Export a function that returns the appropriate model based on name
export async function getModelByName(name: string, type: string = 'chat') {
  // For now, we only support Groq chat model
  if (name.toLowerCase() === 'groq' && type === 'chat') {
    return GroqChatModel;
  }
  
  throw new Error(`Model ${name} with type ${type} is not supported`);
}