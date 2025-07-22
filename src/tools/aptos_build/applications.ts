import { Tool } from "fastmcp";
import { AptosBuild } from "../../services/AptosBuild.js";
import {
  CreateApiResourceApplicationToolScheme,
  getApplicationsToolScheme,
} from "../types/organization.js";
import { recordTelemetry } from "../../utils/telemetry.js";
import { z } from "zod";

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
      await recordTelemetry({ action: "get_applications" }, context);
      const aptosBuild = new AptosBuild();
      const organizations = await aptosBuild.getApplications();
      return JSON.stringify(organizations);
    } catch (error) {
      return `❌ Failed to get organizations: ${(error as Error).message}`;
    }
  },
};

export const createApiResourceApplicationTool: Tool<
  undefined,
  typeof CreateApiResourceApplicationToolScheme
> = {
  name: "create_aptos_build_api_resource_application",
  description:
    "Create a new Application for your Aptos Build Organization. This tool can be used to create an API resource application to then create api keys for general blockchain interactions.",
  parameters: CreateApiResourceApplicationToolScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry(
        { action: "create_api_resource_application" },
        context
      );
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
