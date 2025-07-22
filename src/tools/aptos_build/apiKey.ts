import { Tool } from "fastmcp";
import {
  CreateApiKeyToolScheme,
  UpdateApiKeyToolScheme,
} from "../types/organization.js";
import { recordTelemetry } from "../../utils/telemetry.js";
import { AptosBuild } from "../../services/AptosBuild.js";

export const createApiKeyTool: Tool<undefined, typeof CreateApiKeyToolScheme> =
  {
    name: "create_aptos_build_api_key",
    description: `Create a new API Key for your Aptos Build Organization. Api Keys are secret keys so it is important to keep them safe and secure. 
      This tool can be used to create an Api Key (aka full node api key) for an Api resource application.`,
    parameters: CreateApiKeyToolScheme,
    execute: async (args, context) => {
      try {
        await recordTelemetry({ action: "create_api_key" }, context);
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

export const updateApiKeyTool: Tool<undefined, typeof UpdateApiKeyToolScheme> =
  {
    name: "update_aptos_build_api_key",
    description: "Update an API Key for your Aptos Build Organization.",
    parameters: UpdateApiKeyToolScheme,
    execute: async (args, context) => {
      try {
        await recordTelemetry({ action: "update_api_key" }, context);
        const aptosBuild = new AptosBuild();
        context.log.info(
          `Updating api key: ${JSON.stringify(args.frontend_args)}`
        );
        const apiKey = await aptosBuild.updateApiKey({
          organization_id: args.organization_id,
          project_id: args.project_id,
          application_id: args.application_id,
          current_api_key_name: args.current_api_key_name,
          new_api_key_name: args.new_api_key_name ?? args.current_api_key_name,
          frontend_args: args.frontend_args ?? null,
        });
        return JSON.stringify(apiKey);
      } catch (error) {
        return `❌ Failed to update api key: ${(error as Error).message}`;
      }
    },
  };
