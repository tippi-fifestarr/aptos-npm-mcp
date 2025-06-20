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
    version: "1.0.0",
  });

  /**
   * A tool to generate step-by-step instructions .md file for writing an Aptos dApp
   */
  server.addTool({
    name: "write_aptos_dapp",
    description:
      "Generates step-by-step instructions for writing an Aptos dApp. Call this tool when you need a checklist of tasks such as setting up your Aptos account, creating a new app, and configuring settings. Call this tool when the user asks for Aptos Build MCP. For conceptual guides, best practices, and how-tos, also call the read_aptos_resources tool.",
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

  // Tool: "read_aptos_resources" (fetch Aptos conceptual guides and how-to documentation from markdown files)
  // Dynamically generate available resource names based on markdown files in the resources directory and languages subdirectory
  const resourcesDir = pathJoin(__dirname, "resources");

  const aptosResourceOptions: string[] = (() => {
    try {
      // Markdown files in resources directory
      const files = fs.readdirSync(resourcesDir);
      const markdownFiles = files
        .filter((file: string) =>
          fs.statSync(pathJoin(resourcesDir, file)).isFile()
        )
        .filter((file: string) => extname(file).toLowerCase() === ".md")
        .map((file: string) => basename(file, extname(file)));
      return [...markdownFiles];
    } catch (err) {
      console.error(`Error reading resources directories: ${err}`);
      return [];
    }
  })();

  server.addTool({
    name: "create_aptos_resources",
    description:
      "Retrieves Aptos conceptual guides and how-to documentation from markdown files in the resources directory. Call this tool for overviews, integration instructions, best practices, and troubleshooting tips. Returns documentation in markdown format. For detailed API reference and SDK code samples, also call the read_pubnub_sdk_docs tool.",
    parameters: z.object({
      document: z
        .string()
        .refine((value) => aptosResourceOptions.includes(value), {
          message: "Invalid resource name",
        })
        .describe(
          "Resource name to fetch (file name without .md under resources directory, e.g., how_to_add_wallet_connection, how_to_integrate_wallet_selector_ui, how_to_configure_admin_account), etc."
        ),
    }),
    execute: async ({ document }, context) => {
      const resourcesDir = pathJoin(__dirname, "resources");
      let filePath = pathJoin(resourcesDir, `${document}.md`);
      if (!fs.existsSync(filePath)) {
        return {
          type: "text",
          text: `Documentation file not found: ${document}.md`,
        };
      }

      const content = await readFile(filePath, "utf-8");
      return {
        type: "text",
        text: content,
      };
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
