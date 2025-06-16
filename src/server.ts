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
    name: "how_to_sign_and_submit_transaction",
    description:
      "Instructions to sign and submit a transaction in an Aptos dApp. Call this tool when you need to sign and submit a transaction to the Aptos network. Use this tool after or along with 'how_to_integrate_wallet_selector_ui' to complete the wallet setup.",
    parameters: z.object({}),
    execute: async (args, context) => {
      try {
        const filePath = pathJoin(
          __dirname,
          "resources",
          "how_to_sign_and_submit_transaction.md"
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

  server.addTool({
    name: "how_to_integrate_wallet_selector_ui",
    description:
      "Instructions to add a Wallet Selector UI in an Aptos dApp. Call this tool when adding wallet support via UI dropdowns, connectors, or modals. Use this tool after or along with 'how_to_add_wallet_connection' to complete the wallet setup.",
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
      "Explains how to implement wallet connection in an Aptos dApp using standard libraries and flows. Call this tool when building or scaffolding a dApp that needs user wallet access. It is a required step for any dApp with account-based interaction.",
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
        const basePath = pathJoin(__dirname, "resources");

        const [dappContent, walletConnect, walletUI, signAndSubmitTransaction] =
          await Promise.all([
            readFile(
              pathJoin(basePath, "how_to_write_an_aptos_dapp.md"),
              "utf-8"
            ),
            readFile(
              pathJoin(basePath, "how_to_add_wallet_connection.md"),
              "utf-8"
            ),
            readFile(
              pathJoin(basePath, "how_to_integrate_wallet_selector_ui.md"),
              "utf-8"
            ),
            readFile(
              pathJoin(basePath, "how_to_sign_and_submit_transaction.md"),
              "utf-8"
            ),
          ]);

        const combined = [
          "# Writing an Aptos dApp\n\n",
          dappContent,
          "\n\n---\n\n",
          "# Adding Wallet Connection\n\n",
          walletConnect,
          "\n\n---\n\n",
          "# Integrating Wallet Selector UI\n\n",
          walletUI,
          "\n\n---\n\n",
          "# Signing and Submitting a Transaction\n\n",
          signAndSubmitTransaction,
        ].join("");

        return {
          type: "text",
          text: combined,
        };
      } catch (error) {
        return {
          type: "text",
          text: `Error reading one of the guides: ${error instanceof Error ? error.message : "Unknown error"}`,
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
