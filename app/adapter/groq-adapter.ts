// import { EventEmitter } from 'events';
// import { ChatModel, Message, Emitter, ChatModelEvents } from 'beeai-framework/backend/core'; // Import necessary classes
// import Groq from 'groq-sdk'; // Importing Groq SDK

// // Extend the EventEmitter to fulfill the ChatModel's expected event structure
// class CustomEmitter extends EventEmitter implements Emitter<ChatModelEvents> {
//   namespace: string = '';
//   context: Record<string, any> = {};
//   cleanups: any[] = [];
//   child: any = null;

//   // Add other necessary properties here as required by the ChatModel
// }

// export class GroqChatModelAdapter extends ChatModel {
//   private groq: Groq; // Instance of Groq SDK
//   public providerId = 'groq'; // Identifying provider as 'groq'
//   public modelId: string; // Model identifier
//   public emitter: CustomEmitter; // Use our custom emitter to ensure type compatibility
//   public cache: Record<string, any> = {}; // To store temporary cached responses if needed

//   constructor(modelId: string = 'llama-4-scout-17b-16e-instruct', apiKey?: string) {
//     super();
//     this.modelId = modelId; // Set the model ID (default to 'llama-4-scout-17b-16e-instruct' if not provided)
//     this.groq = new Groq({ 
//       apiKey: apiKey || process.env.GROQ_API_KEY, // Use the provided API key or fetch from environment variable
//     });
//     this.emitter = new CustomEmitter(); // Initialize our custom emitter
//   }

//   /**
//    * The `_create` method handles the core logic for sending messages
//    * to Groq and receiving the response.
//    */
//   async _create(messages: Message[], options: any = {}) {
//     try {
//       // Convert BeeAI messages to the format expected by Groq
//       const groqMessages = messages.map((msg: Message) => ({
//         text: msg.text,
//         role: msg.role,
//         timestamp: msg.timestamp,
//       }));

//       // Sending messages to Groq API for processing
//       const groqResponse = await this.groq.chat({
//         model: this.modelId, // The model to use (set via constructor)
//         messages: groqMessages, // The messages to send
//         ...options, // Additional options passed to the API (e.g., temperature, max tokens, etc.)
//       });

//       // Return the response to the caller
//       return groqResponse.data.choices.map((choice: any) => ({
//         text: choice.message.content,
//         role: choice.message.role,
//         timestamp: Date.now(),
//       }));
//     } catch (error) {
//       console.error('Error while communicating with Groq:', error);
//       throw new Error('Failed to create message response from Groq');
//     }
//   }

//   /**
//    * _createStream is used to handle streaming responses (if applicable).
//    * Since Groq API may not natively support streaming, we'll implement a basic stream response here.
//    */
//   async _createStream(messages: Message[], options: any = {}) {
//     try {
//       // Placeholder for handling streaming functionality
//       const groqMessages = messages.map((msg: Message) => ({
//         text: msg.text,
//         role: msg.role,
//         timestamp: msg.timestamp,
//       }));

//       // Example for handling stream (replace with Groq streaming handling if available)
//       const groqStream = await this.groq.chat({
//         model: this.modelId,
//         messages: groqMessages,
//         ...options,
//       });

//       // Here, return a stream-like behavior by resolving after receiving the full response
//       return groqStream.data.choices.map((choice: any) => ({
//         text: choice.message.content,
//         role: choice.message.role,
//         timestamp: Date.now(),
//       }));
//     } catch (error) {
//       console.error('Error while streaming with Groq:', error);
//       throw new Error('Failed to stream response from Groq');
//     }
//   }

//   /**
//    * loadSnapshot is used for loading a snapshot (e.g., to restore state from a previous interaction).
//    * This function may not be directly applicable to Groq, so we implement a placeholder.
//    */
//   async loadSnapshot(snapshotId: string) {
//     try {
//       // Placeholder logic to simulate snapshot loading
//       console.log('Loading snapshot with ID:', snapshotId);

//       // Simulate retrieving data from Groq (replace with actual snapshot retrieval logic)
//       return {
//         snapshotId,
//         messages: [],
//         state: {},
//       };
//     } catch (error) {
//       console.error('Error while loading snapshot:', error);
//       throw new Error('Failed to load snapshot');
//     }
//   }

//   /**
//    * The `emit` method triggers the event emitter to notify listeners of certain events.
//    */
//   emit(event: string, ...args: any[]) {
//     this.emitter.emit(event, ...args);
//   }

//   /**
//    * The `on` method allows subscribing to events from the `GroqChatModelAdapter`.
//    */
//   on(event: string, listener: (...args: any[]) => void) {
//     this.emitter.on(event, listener);
//   }
// }
