/// <reference types="node" />
import { FastMCP } from "fastmcp";
import { join as pathJoin, dirname } from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";
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
    version: "1.0.0",
  });

  server.addTool({
    name: "how_to_integrate_wallet_selector_ui",
    description:
      "Instructions on how to integrate a Wallet Selector UI to an Aptos dapp. Call this tool when you need instructions on how to integrate a Wallet Selector UI to an Aptos dapp.",
    parameters: z.object({}),
    execute: async (args, context) => {
      try {
        const filePath = pathJoin(
          __dirname,
          "resources",
          "how_to_integrate_wallet_selector_ui.md"
        );
        const content = await readFile(filePath, "utf-8");
        return {
          type: "text",
          text: content,
        };
      } catch (error) {
        return {
          type: "text",
          text: `Error reading guide: ${error instanceof Error ? error.message : "Unknown error"}`,
        };
      }
    },
  });

  /**
   * A tool to fetch instructions on how to add a wallet connection to an Aptos dapp
   */
  server.addTool({
    name: "how_to_add_wallet_connection",
    description:
      "Instructions on how to add a wallet connection to an Aptos dapp. Call this tool when you need instructions on how to add a wallet connection to an Aptos dapp. For a Wallet Selector UI integration, also call the how_to_integrate_wallet_selector_ui tool.",
    parameters: z.object({}),
    execute: async (args, context) => {
      try {
        const filePath = pathJoin(
          __dirname,
          "resources",
          "how_to_add_wallet_connection.md"
        );
        const content = await readFile(filePath, "utf-8");
        return {
          type: "text",
          text: content,
        };
      } catch (error) {
        return {
          type: "text",
          text: `Error reading guide: ${error instanceof Error ? error.message : "Unknown error"}`,
        };
      }
    },
  });

  /**
   * A tool to generate step-by-step instructions .md file for writing an Aptos dApp
   */
  server.addTool({
    name: "write_aptos_dapp",
    description:
      "Generates step-by-step instructions for writing an Aptos dApp. Call this tool when you need a checklist of tasks such as setting up your Aptos account, creating a new app, and configuring settings. Call this tool when the user asks for Aptos Build MCP. For wallet connection instructions, also call the how_to_add_wallet_connection tool.",
    parameters: z.object({}),
    execute: async (args, context) => {
      try {
        const filePath = pathJoin(
          __dirname,
          "resources",
          "how_to_write_an_aptos_dapp.md"
        );
        const content = await readFile(filePath, "utf-8");
        return {
          type: "text",
          text: content,
        };
      } catch (error) {
        return {
          type: "text",
          text: `Error reading guide: ${error instanceof Error ? error.message : "Unknown error"}`,
        };
      }
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
