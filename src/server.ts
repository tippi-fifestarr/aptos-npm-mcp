/// <reference types="node" />
import { FastMCP } from "fastmcp";
import { join as pathJoin, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";
import * as fs from "fs";
import { z } from "zod";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  /**
   * Create a new FastMCP server
   */
  const server = new FastMCP({
    name: "Aptos Build MCP",
    version: "0.0.7",
  });

  const resourcesDir = pathJoin(__dirname, "resources");

  /**
   * Helper function to read all markdown files from a directory
   */
  async function readAllMarkdownFromDirectory(
    dirPath: string
  ): Promise<string> {
    let content = "";

    try {
      if (!fs.existsSync(dirPath)) {
        return `Directory not found: ${dirPath}`;
      }

      const files = fs.readdirSync(dirPath);
      const markdownFiles = files.filter(
        (file: string) => extname(file).toLowerCase() === ".md"
      );

      for (const file of markdownFiles) {
        const filePath = pathJoin(dirPath, file);
        try {
          const fileContent = await readFile(filePath, "utf-8");
          content += fileContent + "\n\n---\n\n";
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error);
          content += `Error reading file: ${file}\n\n---\n\n`;
        }
      }

      return content;
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error);
      return `Error reading directory: ${dirPath}`;
    }
  }

  /**
   * Helper function to read all markdown files from multiple directories
   */
  async function readAllMarkdownFromDirectories(
    dirNames: string[]
  ): Promise<string> {
    let combinedContent = "";

    for (const dirName of dirNames) {
      const dirPath = pathJoin(resourcesDir, dirName);
      const dirContent = await readAllMarkdownFromDirectory(dirPath);
      if (dirContent.trim()) {
        combinedContent += `# ${dirName.toUpperCase()} RESOURCES\n\n`;
        combinedContent += dirContent;
      }
    }

    return combinedContent;
  }

  server.addTool({
    name: "get_mcp_version",
    description: "Returns the version of the MCP server",
    parameters: z.object({}),
    execute: async (args, context) => {
      return {
        type: "text",
        text: server.options.version,
      };
    },
  });

  server.addTool({
    name: "build_smart_contract_on_aptos",
    description:
      "Build an Aptos smart contract - returns all resources from move and management directories",
    parameters: z.object({}),
    execute: async (args, context) => {
      const content = await readAllMarkdownFromDirectories([
        "management",
        "move",
      ]);

      return {
        type: "text",
        text: content || "No content found in management and move directories.",
      };
    },
  });

  server.addTool({
    name: "build_ui_frontend_on_aptos",
    description:
      "Build a UI frontend for Aptos dApp - returns all resources from frontend directory",
    parameters: z.object({}),
    execute: async (args, context) => {
      const content = await readAllMarkdownFromDirectories(["frontend"]);

      return {
        type: "text",
        text: content || "No content found in frontend directory.",
      };
    },
  });

  server.addTool({
    name: "build_dapp_on_aptos",
    description:
      "Build a complete full-stack Aptos dApp - returns all resources from move, management, and frontend directories",
    parameters: z.object({}),
    execute: async (args, context) => {
      const content = await readAllMarkdownFromDirectories([
        "management",
        "move",
        "frontend",
      ]);

      return {
        type: "text",
        text:
          content ||
          "No content found in management, move, and frontend directories.",
      };
    },
  });

  server.addPrompt({
    name: "build_dapp_on_aptos",
    description: "Build a complete full-stack Aptos dApp",
    load: async (args) => {
      return `You are a helpful assistant that can help with building a full-stack Aptos dApp.
      Before starting the build process, please ask the user to provide the following information:

    1. What network would you like to use? Options are:
      - devnet
      - testnet
      - mainnet`;
    },
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
