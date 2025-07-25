import { Tool } from "fastmcp";
import { z } from "zod";

import { AptosBuild } from "../../services/AptosBuild.js";
import { recordTelemetry } from "../../utils/telemetry.js";
import {
  CreateApiResourceApplicationToolScheme,
  DeleteApplicationToolScheme,
  getApplicationsToolScheme,
  UpdateApplicationNameToolScheme,
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
      const aptosBuild = new AptosBuild(context);
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
      const aptosBuild = new AptosBuild(context);
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

/**
 * Tool to delete an Application for your Aptos Build Organization.
 */
export const deleteApplicationTool: Tool<
  undefined,
  typeof DeleteApplicationToolScheme
> = {
  description: "Delete an Application for your Aptos Build Organization.",
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "delete_application" }, context);
      const aptosBuild = new AptosBuild(context);
      const application = await aptosBuild.deleteApplication({
        application_id: args.application_id,
        organization_id: args.organization_id,
        project_id: args.project_id,
      });
      return JSON.stringify(application);
    } catch (error) {
      return `❌ Failed to delete application: ${(error as Error).message}`;
    }
  },
  name: "delete_aptos_application",
  parameters: DeleteApplicationToolScheme,
};

/**
 * Tool to update an Application name for your Aptos Build Organization.
 */
export const updateApplicationNameTool: Tool<
  undefined,
  typeof UpdateApplicationNameToolScheme
> = {
  description: "Update an Application name for your Aptos Build Organization.",
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "update_application_name" }, context);
      const aptosBuild = new AptosBuild(context);
      const application = await aptosBuild.updateApplicationName({
        application_id: args.application_id,
        organization_id: args.organization_id,
        project_id: args.project_id,
        new_application_name: args.new_name,
      });
      return JSON.stringify(application);
    } catch (error) {
      return `❌ Failed to update application name: ${error}`;
    }
  },
  name: "update_aptos_build_application_name",
  parameters: UpdateApplicationNameToolScheme,
};
