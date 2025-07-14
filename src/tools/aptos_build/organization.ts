import type { FastMCP, Tool } from "fastmcp";
import { z } from "zod";
import {
  GetOrganizationsToolScheme,
  GetProjectsToolScheme,
  GetApplicationsToolScheme,
  GetApiKeysToolScheme,
} from "../types/organization.js";
import { AptosBuild } from "../../services/AptosBuild.js";

export const getOrganizationsTool: Tool<
  undefined,
  typeof GetOrganizationsToolScheme
> = {
  name: "get_aptos_build_organizations",
  description: "Get your Aptos Build Organizations",
  parameters: z.object({}),
  execute: async (args, context) => {
    try {
      // Create client with specific headers for this call
      const aptosBuild = new AptosBuild();
      const organizations = await aptosBuild.getOrganizations();
      return JSON.stringify(organizations);
    } catch (error) {
      return `❌ Failed to get organizations: ${(error as Error).message}`;
    }
  },
};

export const getProjectsTool: Tool<undefined, typeof GetProjectsToolScheme> = {
  name: "get_aptos_build_projects",
  description: "Get your Aptos Build Organizations Projects",
  parameters: GetProjectsToolScheme,
  execute: async (args, context) => {
    try {
      const aptosBuild = new AptosBuild();
      const projects = await aptosBuild.getProjects(args);
      return JSON.stringify(projects);
    } catch (error) {
      console.error("Get organizations failed:", error);
      return `❌ Failed to get organizations: ${(error as Error).message}`;
    }
  },
};

export const getApplicationsTool: Tool<
  undefined,
  typeof GetApplicationsToolScheme
> = {
  name: "get_aptos_build_applications",
  description: "Get your Aptos Build Organizations Applications",
  parameters: GetApplicationsToolScheme,
  execute: async (args, context) => {
    try {
      const aptosBuild = new AptosBuild();
      const applications = await aptosBuild.getApplications(args);
      return JSON.stringify(applications);
    } catch (error) {
      console.error("Get applications failed:", error);
      return `❌ Failed to get applications: ${(error as Error).message}`;
    }
  },
};

export const getApiKeysTool: Tool<undefined, typeof GetApiKeysToolScheme> = {
  name: "get_aptos_build_api_keys",
  description: "Get your Aptos Build Projects Api Keys",
  parameters: GetApiKeysToolScheme,
  execute: async (args, context) => {
    try {
      const aptosBuild = new AptosBuild();
      const apiKeys = await aptosBuild.getApiKeys(args);
      return JSON.stringify(apiKeys);
    } catch (error) {
      console.error("Get organizations failed:", error);
      return `❌ Failed to get organizations: ${(error as Error).message}`;
    }
  },
};

export function registerOrganizationTools(server: FastMCP): void {
  server.addTool(getOrganizationsTool);
  server.addTool(getProjectsTool);
  server.addTool(getApplicationsTool);
  server.addTool(getApiKeysTool);
}
