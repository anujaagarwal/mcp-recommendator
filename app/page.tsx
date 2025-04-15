'use client';
import { useState, ChangeEvent } from 'react';
import { useChat } from 'ai/react';
import { ChatSection } from '@llamaindex/chat-ui';


// Define the MCP server type for TypeScript

interface Tool {
  name: string;
  description: string;
}

export interface MCPServer {
  name: string;
  url: string;
  description: string;
  author: string;
  license: string;
  tags: string[];
  requirements: {
    node_version: string;
    api_key: string;
  };
  env: Record<string, string>;
  tools: Tool[];  // Array of tools with name and description
}


export default function Home() {
  const [activeMcpServers, setActiveMcpServers] = useState<MCPServer[]>([]);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/llm',
    body: {
      activeMcpServers: activeMcpServers.map(server => ({
        name: server.name,
        url: server.url,
        description: server.description,
        author: server.author,
        license: server.license,
        tags: server.tags,
        requirements: {
          node_version: server.requirements.node_version,
          api_key: server.requirements.api_key
        },
        tools: server.tools.map(tool => ({
          name: tool.name,  // Tool name
          description: tool.description,  // Tool description
      }))})),
    },
  
    onResponse: (response: any) => { 
      if (response.mcpRecommendations) {
        // Update UI with recommendations
        console.log(response.mcpRecommendations);
      }
    }
  });
  
  
  const handleInputChangeWrapper = (value: string) => {
   
    const syntheticEvent = {
      target: { value },
      preventDefault: () => {},
    } as ChangeEvent<HTMLInputElement>;
    
    handleInputChange(syntheticEvent);
  };

  
  const addMcpServerToSession = (server: MCPServer) => {
    setActiveMcpServers((prevServers) => [...prevServers, server]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MCP Server Recommender</h1>
      
      {/* Display active MCP servers */}
      {activeMcpServers.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Active MCP Servers</h2>
          <div className="flex flex-wrap gap-2">
            {activeMcpServers.map((server) => (
              <div key={server.name} className="bg-blue-100 p-2 rounded">
                {server.name}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Chat interface */}
      <ChatSection 
        handler={{
          input,
          setInput: handleInputChangeWrapper, // Use the wrapper function instead
          isLoading,
          messages: messages.map((msg: { content: string; role: string }) => ({
            content: msg.content,
            role: msg.role
          })),
          append: async (message: { content: string; role: string }) => {
            // Convert MCPServer objects to plain JSON objects
            const serializedServers = activeMcpServers.map(server => ({
              name: server.name,
              url: server.url,
              description: server.description,
              author: server.author,
              license: server.license,
              tags: server.tags,
              requirements: {
                node_version: server.requirements.node_version,
                api_key: server.requirements.api_key
              }
            }));
            
            handleSubmit(new Event('submit'), {
              data: {
                activeMcpServers: serializedServers
              },
              body: {
                message: message.content
              }
            });
            return message.content;
          }
        }} 
      />
    </div>
  );
}
