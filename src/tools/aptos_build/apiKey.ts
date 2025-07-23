import { Tool } from "fastmcp";

import { AptosBuild } from "../../services/AptosBuild.js";
import { recordTelemetry } from "../../utils/telemetry.js";
import {
  CreateApiKeyToolScheme,
  UpdateApiKeyToolScheme,
} from "../types/organization.js";

/**
 * Tool to create an API Key for your Aptos Build Organization.
 */
export const createApiKeyTool: Tool<undefined, typeof CreateApiKeyToolScheme> =
  {
    description: `Create a new API Key for your Aptos Build Organization. Api Keys are secret keys so it is important to keep them safe and secure. 
      This tool can be used to create an Api Key (aka full node api key) for an Api resource application.`,
    execute: async (args, context) => {
      try {
        await recordTelemetry({ action: "create_api_key" }, context);
        const aptosBuild = new AptosBuild();
        const apiKey = await aptosBuild.createApiKey({
          application_id: args.application_id,
          frontend_args: args.frontend_args ?? null,
          name: args.name,
          organization_id: args.organization_id,
          project_id: args.project_id,
        });
        return JSON.stringify(apiKey);
      } catch (error) {
        return `❌ Failed to create api key: ${(error as Error).message}`;
      }
    },
    name: "create_aptos_build_api_key",
    parameters: CreateApiKeyToolScheme,
  };

/**
 * Tool to update an API Key for your Aptos Build Organization.
 */
export const updateApiKeyTool: Tool<undefined, typeof UpdateApiKeyToolScheme> =
  {
    description: "Update an API Key for your Aptos Build Organization.",
    execute: async (args, context) => {
      try {
        await recordTelemetry({ action: "update_api_key" }, context);
        const aptosBuild = new AptosBuild();
        context.log.info(
          `Updating api key: ${JSON.stringify(args.frontend_args)}`
        );
        const apiKey = await aptosBuild.updateApiKey({
          application_id: args.application_id,
          current_api_key_name: args.current_api_key_name,
          frontend_args: args.frontend_args ?? null,
          new_api_key_name: args.new_api_key_name ?? args.current_api_key_name,
          organization_id: args.organization_id,
          project_id: args.project_id,
        });
        return JSON.stringify(apiKey);
      } catch (error) {
        return `❌ Failed to update api key: ${(error as Error).message}`;
      }
    },
    name: "update_aptos_build_api_key",
    parameters: UpdateApiKeyToolScheme,
  };
