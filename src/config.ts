import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Aptos MCP configuration
export const config = {
  aptos_build: {
    botKey: process.env.APTOS_BOT_KEY,
    adminUrl: "https://admin.api.aptoslabs.com/api/rspc",
  },
  server: {
    name: "Aptos MCP Server",
  },
};
