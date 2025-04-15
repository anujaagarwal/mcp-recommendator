import React from 'react';

// Define the MCP server data type for TypeScript
interface MCPServer {
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
}

interface MCPCardProps {
  server: MCPServer;
}

const MCPCard: React.FC<MCPCardProps> = ({ server }) => {
  return (
    <div className="max-w-xs w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-6 p-4">
      {/* Card Content */}
      <div className="flex flex-col items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{server.name}</h2>
        <p className="text-sm text-gray-500">{server.author}</p>
        <p className="text-sm text-gray-500">{server.license} License</p>
        <p className="mt-2 text-gray-700">{server.description}</p>
        <div className="flex space-x-2 mt-4">
          {server.tags.map((tag) => (
            <span key={tag} className="text-xs text-white bg-blue-500 rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Requirements Section */}
      <div className="border-t pt-4">
        <h3 className="font-semibold text-lg text-gray-800">Requirements</h3>
        <p className="text-sm text-gray-600">Node Version: {server.requirements.node_version}</p>
        <p className="text-sm text-gray-600">API Key: {server.requirements.api_key}</p>
      </div>

      {/* GitHub Link */}
      <div className="flex justify-between items-center mt-4 border-t pt-4">
        <a
          href={server.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default MCPCard;
