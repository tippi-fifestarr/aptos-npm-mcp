#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import fs from "node:fs";
import { basename, extname, join as pathJoin } from "node:path";
import { z } from "zod";

import { config } from "./config.js";
import { registerTools } from "./tools/index.js";
import {
  readAllMarkdownFromDirectories,
  readMarkdownFromDirectory,
} from "./utils/index.js";

async function main() {
  /**
   * Create a new FastMCP server
   */

  const server = new FastMCP({
    name: config.server.name,
    version: "0.0.13",
  });

  registerTools(server);

  server.addTool({
    description: "Returns the version of the MCP server",
    execute: async () => {
      return {
        text: server.options.version,
        type: "text",
      };
    },
    name: "get_mcp_version",
    parameters: z.object({}),
  });

  server.addTool({
    description:
      "Build an Aptos smart contract - returns all resources from move and management directories. Use this tool when you need guidance on how to build a smart contract for a dapp on Aptos.",
    execute: async () => {
      const content = await readAllMarkdownFromDirectories([
        "management",
        "move",
      ]);

      return {
        text: content || "No content found in management and move directories.",
        type: "text",
      };
    },
    name: "build_smart_contract_on_aptos",
    parameters: z.object({}),
  });

  server.addTool({
    description:
      "Build a UI frontend for Aptos dApp - returns all resources from frontend directory. Use this tool when you need guidance on how to build a frontend for a dapp on Aptos.",
    execute: async () => {
      const content = await readAllMarkdownFromDirectories(["frontend"]);

      return {
        text: content || "No content found in frontend directory.",
        type: "text",
      };
    },
    name: "build_ui_frontend_on_aptos",
    parameters: z.object({}),
  });

  server.addTool({
    description:
      "Build a complete full-stack Aptos dApp - returns all resources from move, management, and frontend directories. Use this tool when you need guidance on how to build a full-stack dapp on Aptos.",
    execute: async () => {
      const content = await readAllMarkdownFromDirectories([
        "frontend",
        "move",
        "management",
      ]);

      return {
        text:
          content ||
          "No content found in management, move, and frontend directories.",
        type: "text",
      };
    },
    name: "build_dapp_on_aptos",
    parameters: z.object({}),
  });

  // Dynamic discovery
  const getAvailableHowToResources = () => {
    try {
      const howToDir = pathJoin(process.cwd(), "src/resources/how_to");
      const files = fs.readdirSync(howToDir);
      return files
        .filter((file) => extname(file).toLowerCase() === ".md")
        .map((file) => basename(file, extname(file)));
    } catch (err) {
      console.error(`Error reading how_to directory: ${err}`);
      return [];
    }
  };

  // Step 1: Discovery tool - returns list of available resources
  server.addTool({
    description:
      "Get a list of all available Aptos development resources. Use this first to see what guidance is available, then use get_specific_aptos_resource to fetch the relevant one.",
    execute: async () => {
      const availableFiles = getAvailableHowToResources();

      return {
        text: `Available Aptos development resources:\n${availableFiles.map((f) => `- ${f}`).join("\n")}\n\nUse get_specific_aptos_resource with the exact filename to retrieve content.`,
        type: "text",
      };
    },
    name: "list_aptos_resources",
    parameters: z.object({}),
  });

  // Step 2: Retrieval tool - gets specific resource by exact name
  server.addTool({
    description:
      "Retrieve a specific Aptos development resource by its exact filename (without .md extension).",
    execute: async (args) => {
      const { filename } = args;
      const availableFiles = getAvailableHowToResources();

      if (!availableFiles.includes(filename)) {
        return {
          text: `Resource '${filename}' not found. Available resources:\n${availableFiles.join("\n")}`,
          type: "text",
        };
      }

      const content = await readMarkdownFromDirectory("how_to", filename);
      return {
        text: content,
        type: "text",
      };
    },
    name: "get_specific_aptos_resource",
    parameters: z.object({
      filename: z
        .string()
        .describe(
          "Exact filename of the resource (e.g., 'how_to_add_wallet_connection', 'how_to_config_a_full_node_api_key_in_a_dapp', 'how_to_integrate_fungible_asset')"
        ),
    }),
  });

  server.addPrompt({
    description: "Build a complete full-stack Aptos dApp",
    load: async () => {
      return `You are a helpful assistant that can help with building a full-stack end-to-end dapp on Aptos.
      For anything related to Aptos, you should always default to search for resources and tools in the MCP. Only if you have not found what you need, then you can search the web or use your own knowledge.
      `;
    },
    name: "build_dapp_on_aptos",
  });

  /**
   * Start the server
   */
  try {
    await server.start({
      transportType: "stdio",
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

main();
