import { FastMCP } from "fastmcp";
import { createApiKeyTool, updateApiKeyTool } from "./apiKey.js";
import { createApiResourceApplicationTool } from "./applications.js";
import { createProjectTool } from "./projects.js";
import { createOrganizationTool } from "./organization.js";
import { getApplicationsTool } from "./applications.js";

export function registerAptosBuildTools(server: FastMCP): void {
  server.addTool(getApplicationsTool);
  server.addTool(createOrganizationTool);
  server.addTool(createApiResourceApplicationTool);
  server.addTool(createProjectTool);
  server.addTool(createApiKeyTool);
  server.addTool(updateApiKeyTool);
}
