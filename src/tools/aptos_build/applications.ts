import { Tool } from "fastmcp";
import { z } from "zod";

import { AptosBuild } from "../../services/AptosBuild.js";
import { recordTelemetry } from "../../utils/telemetry.js";
import {
  CreateApiResourceApplicationToolScheme,
  getApplicationsToolScheme,
} from "../types/organization.js";

/**
 * Tool to get all applications for your Aptos Build Organization.
 */
export const getApplicationsTool: Tool<
  undefined,
  typeof getApplicationsToolScheme
> = {
  description: `Get your Aptos Build Organizations with their projects and applications and the API Keys. Api Keys are secret keys so it is important to keep them safe and secure.
    To get the full node api keys, you need to get the Applications with a serviceType of "Api".
    To get the gas station api keys, you need to get the Applications with a serviceType of "Gs".`,
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
  name: "get_aptos_build_applications",
  parameters: z.object({}),
};

/**
 * Tool to create a new Full Node API Resource application for your Aptos Build Organization.
 */
export const createApiResourceApplicationTool: Tool<
  undefined,
  typeof CreateApiResourceApplicationToolScheme
> = {
  description:
    "Create a new Application for your Aptos Build Organization. This tool can be used to create an API resource application to then create api keys for general blockchain interactions.",
  execute: async (args, context) => {
    try {
      await recordTelemetry(
        { action: "create_api_resource_application" },
        context
      );
      const aptosBuild = new AptosBuild();
      const application = await aptosBuild.createApplication({
        args: {
          description: args.description ?? null,
          name: args.name,
          network: args.network,
          service_type: "Api",
        },
        organization_id: args.organization_id,
        project_id: args.project_id,
      });
      return JSON.stringify(application);
    } catch (error) {
      return `❌ Failed to create application: ${(error as Error).message}`;
    }
  },
  name: "create_aptos_build_api_resource_application",
  parameters: CreateApiResourceApplicationToolScheme,
};
