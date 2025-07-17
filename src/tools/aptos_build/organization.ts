import type { FastMCP, Tool } from "fastmcp";
import { z } from "zod";
import {
  CreateApiKeyToolScheme,
  CreateApplicationToolScheme,
  CreateOrganizationToolScheme,
  CreateProjectToolScheme,
  getApplicationsToolScheme,
} from "../types/organization.js";
import { AptosBuild } from "../../services/AptosBuild.js";

export const getApplicationsTool: Tool<
  undefined,
  typeof getApplicationsToolScheme
> = {
  name: "get_aptos_build_applications",
  description: `Get your Aptos Build Organizations with their projects and applications and the API Keys. Api Keys are secret keys so it is important to keep them safe and secure.
    To get the full node api keys, you need to get the Applications with a serviceType of "Api".
    To get the gas station api keys, you need to get the Applications with a serviceType of "Gs".`,
  parameters: z.object({}),
  execute: async (args, context) => {
    try {
      const aptosBuild = new AptosBuild();
      const organizations = await aptosBuild.getApplications();
      return JSON.stringify(organizations);
    } catch (error) {
      return `❌ Failed to get organizations: ${(error as Error).message}`;
    }
  },
};

export const createOrganizationTool: Tool<
  undefined,
  typeof CreateOrganizationToolScheme
> = {
  name: "create_aptos_build_organization",
  description: "Create a new Organization for your Aptos Build.",
  parameters: CreateOrganizationToolScheme,
  execute: async (args, context) => {
    try {
      const aptosBuild = new AptosBuild();
      const organization = await aptosBuild.createOrganization({
        name: args.name,
      });
      return JSON.stringify(organization);
    } catch (error) {
      return `❌ Failed to create organization: ${(error as Error).message}`;
    }
  },
};

export const createProjectTool: Tool<
  undefined,
  typeof CreateProjectToolScheme
> = {
  name: "create_aptos_build_project",
  description: "Create a new Project for your Aptos Build Organization.",
  parameters: CreateProjectToolScheme,
  execute: async (args, context) => {
    try {
      const aptosBuild = new AptosBuild();
      const project = await aptosBuild.createProject({
        organization_id: args.organization_id,
        project_name: args.project_name,
        description: args.description,
      });
      return JSON.stringify(project);
    } catch (error) {
      return `❌ Failed to create project: ${(error as Error).message}`;
    }
  },
};

export const createApplicationTool: Tool<
  undefined,
  typeof CreateApplicationToolScheme
> = {
  name: "create_aptos_build_application",
  description:
    "Create a new Application for your Aptos Build Organization. This tool can be used to create an API resource application or a gas station application",
  parameters: CreateApplicationToolScheme,
  execute: async (args, context) => {
    try {
      const { service_type } = args;
      switch (service_type) {
        case "Api":
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
        case "Gs":
          throw new Error("Gas Station resource is not supported yet.");
        default:
          throw new Error(`Invalid service type: ${service_type}`);
      }
    } catch (error) {
      return `❌ Failed to create application: ${(error as Error).message}`;
    }
  },
};

export const createApiKeyTool: Tool<undefined, typeof CreateApiKeyToolScheme> =
  {
    name: "create_aptos_build_api_key",
    description: `Create a new API Key for your Aptos Build Organization. Api Keys are secret keys so it is important to keep them safe and secure. 
      This tool can be used to create an Api Key (aka full node api key) for an Api resource application.`,
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

export function registerOrganizationTools(server: FastMCP): void {
  server.addTool(getApplicationsTool);
  server.addTool(createOrganizationTool);
  server.addTool(createApplicationTool);
  server.addTool(createProjectTool);
  server.addTool(createApiKeyTool);
}
