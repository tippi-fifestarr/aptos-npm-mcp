import { FastMCP } from "fastmcp";

import { registerAptosBuildTools } from "./aptos_build/index.js";

export function registerTools(server: FastMCP): void {
  registerAptosBuildTools(server);
}
