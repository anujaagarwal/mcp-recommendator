
require('dotenv').config();
import { SystemMessage, UserMessage } from "beeai-framework/backend/core";
import { z } from "zod";
import { MCPTool } from "beeai-framework/tools/mcp";
import { AgentWorkflow } from "beeai-framework/workflows/agent";
// Import ChatModel from the main backend module instead of using the adapter directly
import { ChatModel } from "beeai-framework/backend/chat";
// Try importing from the root or different paths within the sdk
import { Client } from "@modelcontextprotocol/sdk/client/index";
import { StdioServerParameters, StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { EventEmitter } from "events";


import { Emitter } from "beeai-framework/emitter/emitter";
import {
  ToolEmitter,
  BaseToolOptions,
  BaseToolRunOptions,
  JSONToolOutput,
  StringToolOutput,
  Tool,
  ToolInput,
  ToolInputValidationError,
} from "beeai-framework/tools/base";
type ToolOptions = BaseToolOptions & { maxResults?: number };
type ToolRunOptions = BaseToolRunOptions;
const workflow = new AgentWorkflow("Smart assistant");
console.log("groq-api", process.env.GROQ_API_KEY)
interface Tool1 {
  name: string;
  description: string;
}

export interface ServerConfig{

  env: Record<string, string>;
  name: string;
  tools: Tool1[];  // Array of tools with name and description
}

export interface MCPServer{
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
  tools: Tool1[]; 
  env: Record<string, string>; // Array of tools with name and description
}
// const workflow = new AgentWorkflow("Smart assistant");

const client = new Client(
  {
    name: "MCPRecommendator",
    version: "1.0.0",
  },
  {
    capabilities: {}, // Our client doesn't expose any capabilities to the server
  },
);


export class McpRecommenderToolOutput extends JSONToolOutput<MCPServer[]> {
  isEmpty(): boolean {
    return !this.result  || this.result.length === 0;
  }

  getTextContent(): string {
    if (this.isEmpty()) {
         return 'No MCP servers found matching your criteria.';
      }
      
    return this.result.map(server => {
        return `- ${server.name}: ${server.description}\n  Tags: ${server.tags.join(', ')}`;
        }).join('\n\n');
     }

}
export class McpRecommenderTool extends Tool<McpRecommenderToolOutput, ToolOptions, ToolRunOptions> {
  name = "McpRecommender";
  description = "Recommends MCP servers based on user requirements and queries";
  
  public readonly emitter: ToolEmitter<ToolInput<this>, McpRecommenderToolOutput> = Emitter.root.child({
    namespace: ["tool", "mcpRecommender"],
    creator: this,
  });

  inputSchema() {
    return z.object({
      query: z
      .string()
      .min(1)
      .describe(
        `Suggest me mcp for handling github issues.`,
      ),
    });
  
  };

  static {
    this.register();
}

  constructor(private mcp_database: MCPServer[]) {
    super();
  }



  async _run(input: { query: string }, options?: any, context?: any): Promise<McpRecommenderToolOutput> {
    const query = input.query || "";
    // Process the query against the MCP database
    const matched_servers = this._search_mcp_servers(query);
    return new McpRecommenderToolOutput(matched_servers);
  }
  
  
  private _search_mcp_servers(query: string): MCPServer[] {
    // Implementation of search logic against MCP database
    // This would include keyword matching, category filtering, etc.
    const matched_servers: Array<{server: MCPServer, score: number}> = [];
    const keywords = query.toLowerCase().split(/\s+/);
    
    for (const server of this.mcp_database) {
      let score = 0;
      // Match against name, description, tags
      if (keywords.some(kw => server.name.toLowerCase().includes(kw))) {
        score += 3;
      }
      if (keywords.some(kw => server.description.toLowerCase().includes(kw))) {
        score += 2;
      }
      if (keywords.some(kw => server.tags.join(" ").toLowerCase().includes(kw))) {
        score += 1;
      }
            
      if (score > 0) {
        matched_servers.push({
          server,
          score
        });
      }
    }
    
    // Sort by relevance score
    matched_servers.sort((a, b) => b.score - a.score);
    return matched_servers.slice(0, 5).map(item => item.server); // Return top 5
  }
}

async function createMcpTool(serverConfig: ServerConfig): Promise<MCPTool[] | null> {
  try {
    // Connect to the MCP server and create MCPTool
    const serverParams : StdioServerParameters = {
      command: "npx",
      args: ["-y", serverConfig.name || ""],
      env: serverConfig.env || {}
    };

    // Create a client instance
    const client = new Client(
      { name: 'MCPRecommendator', version: '1.0.0' },
      { capabilities: { tools: {}, resources: {}, prompts: {} } }
    );

    // Create transport and connect
    const clientTransport = new StdioClientTransport(serverParams);
    
    // Create MCP tool from client

    await client.connect(clientTransport);
    const mcpTool = await MCPTool.fromClient(client);
    return mcpTool;
  } catch (e) {
    console.error(`Error connecting to MCP server ${serverConfig.name}: ${e}`);
    return null;
  }
}

export async function createAgent(mcp_database: MCPServer[], active_servers?: MCPServer[]): Promise<AgentWorkflow> {
  // Use ChatModel.fromName to create the LLM instance
  const llm = await ChatModel.fromName(`groq:${process.env.GROQ_CHAT_MODEL || "llama-4-scout-17b-16e-instruct"}`);
  
  // Create the main recommendation tool
  const recommender_tool = new McpRecommenderTool(mcp_database);
  
  // Create any active MCP server tools
  const mcp_tools: MCPTool[] = [];
  if (active_servers) {
    for (const server of active_servers) {
      // Connect to MCP server and create tool
      const mcp_tool_array = await createMcpTool(server);
      if (mcp_tool_array) {
        mcp_tools.push(...mcp_tool_array);
      }
    }
  }
  


  
  // Add recommender agent

  workflow.addAgent({
    name: "Recommender",
    instructions: "You are an MCP server expert who helps users find and use the right MCP servers. When users describe their needs, recommend appropriate MCP servers. Explain why each recommendation is suitable for their use case If they want to use a server, help them connect it to their session.",
    tools: [recommender_tool],
    llm,
  });
  

  // Add tool agent for using active servers if any
  if (mcp_tools.length > 0) {
    // Another possible syntax
      workflow.addAgent({
        name: "ToolUser",
        instructions: "You use the active MCP tools to fulfill user requests.",
        tools: mcp_tools,
        llm,
      });

  }
  
  // Add coordinator agent
  workflow.addAgent({
      name: "Coordinator",
      instructions: "Your task is to coordinate between recommending servers and using them. \n Provide a final helpful response based on all available information.",
      llm,
    });
  
  return workflow;
}

// Example usage
