import type { FastMCP, Tool } from "fastmcp";
import { z } from "zod";
import {
  CreateApiKeyToolScheme,
  CreateApplicationToolScheme,
  GetOrganizationsToolScheme,
} from "../types/organization.js";
import { AptosBuild } from "../../services/AptosBuild.js";

export const getOrganizationsTool: Tool<
  undefined,
  typeof GetOrganizationsToolScheme
> = {
  name: "get_aptos_build_organizations",
  description:
    "Get your Aptos Build Organizations with their projects and applications and the API Keys. Api Keys are secret keys so it is important to keep them safe and secure.",
  parameters: z.object({}),
  execute: async (args, context) => {
    try {
      const aptosBuild = new AptosBuild();
      const organizations = await aptosBuild.getOrganizations();
      return JSON.stringify(organizations);
    } catch (error) {
      return `❌ Failed to get organizations: ${(error as Error).message}`;
    }
  },
};

export const createApiKeyTool: Tool<undefined, typeof CreateApiKeyToolScheme> =
  {
    name: "create_aptos_build_api_key",
    description:
      "Create a new API Key for your Aptos Build Organization. Api Keys are secret keys so it is important to keep them safe and secure.",
    parameters: CreateApiKeyToolScheme,
    execute: async (args, context) => {
      try {
        const aptosBuild = new AptosBuild();
        const apiKey = await aptosBuild.createApiKey({
          organization_id: args.organization_id,
          project_id: args.project_id,
          application_id: args.application_id,
          name: args.name,
          frontend_args: args.frontend_args ?? null,
        });
        return JSON.stringify(apiKey);
      } catch (error) {
        return `❌ Failed to create api key: ${(error as Error).message}`;
      }
    },
  };

export const createApplicationTool: Tool<
  undefined,
  typeof CreateApplicationToolScheme
> = {
  name: "create_aptos_build_application",
  description: "Create a new Application for your Aptos Build Organization.",
  parameters: CreateApplicationToolScheme,
  execute: async (args, context) => {
    try {
      const aptosBuild = new AptosBuild();
      const application = await aptosBuild.createApplication({
        organization_id: args.organization_id,
        project_id: args.project_id,
        args: {
          name: args.name,
          network: args.network,
          description: args.description ?? null,
          service_type: "Api",
        },
      });
      return JSON.stringify(application);
    } catch (error) {
      return `❌ Failed to create application: ${(error as Error).message}`;
    }
  },
};

export function registerOrganizationTools(server: FastMCP): void {
  server.addTool(getOrganizationsTool);
  server.addTool(createApplicationTool);
  server.addTool(createApiKeyTool);
}
