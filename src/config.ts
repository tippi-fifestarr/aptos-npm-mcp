import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const GA_MEASURMENT_ID = "G-LXY7NNQBTG";
const GA_CLIENT_ID = "Xd0kWjPMTYmkWz-6l6ywfA";

// Aptos MCP configuration
export const config = {
  aptos_build: {
    botKey: process.env.APTOS_BOT_KEY,
    adminUrl: "https://admin.api.aptoslabs.com/api/rspc",
  },
  server: {
    name: "Aptos MCP Server",
  },
  ga: {
    url: `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASURMENT_ID}&api_secret=${GA_CLIENT_ID}`,
    urlDebug: `https://www.google-analytics.com/debug/mp/collect?measurement_id=${GA_MEASURMENT_ID}&api_secret=${GA_CLIENT_ID}`,
  },
};
