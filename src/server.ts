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

  /**
   * A tool to fetch instructions on how to add a wallet connection to an Aptos dapp
   */
  server.addTool({
    name: "how_to_add_wallet_connection",
    description:
      "Instructions on how to add a wallet connection to an Aptos dapp. Call this tool when you need instructions on how to add a wallet connection to an Aptos dapp.",
    parameters: z.object({}),
    execute: async (args, context) => {
      // For tools that dont support extrnal links, we can use a .md file to get the content
      const walletAdapterURL = `https://aptos.dev/en/build/sdks/wallet-adapter/dapp`;
      const response = await fetch(walletAdapterURL);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} - ${response.statusText}`
        );
      }

      const text = await response.text();
      return {
        type: "text",
        text: text,
      };
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
        console.log("write_aptos_dapp args", args);
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
