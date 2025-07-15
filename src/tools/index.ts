import { FastMCP } from "fastmcp";
import { registerOrganizationTools } from "./aptos_build/organization.js";

export function registerTools(server: FastMCP): void {
  registerOrganizationTools(server);
}
