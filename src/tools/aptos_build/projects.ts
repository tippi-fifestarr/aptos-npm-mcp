import { Tool } from "fastmcp";

import { AptosBuild } from "../../services/AptosBuild.js";
import { recordTelemetry } from "../../utils/telemetry.js";
import { CreateProjectToolScheme } from "../types/organization.js";

/**
 * Tool to create a new Project for your Aptos Build Organization.
 */
export const createProjectTool: Tool<
  undefined,
  typeof CreateProjectToolScheme
> = {
  description: "Create a new Project for your Aptos Build Organization.",
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "create_project" }, context);
      const aptosBuild = new AptosBuild();
      const project = await aptosBuild.createProject({
        description: args.description,
        organization_id: args.organization_id,
        project_name: args.project_name,
      });
      return JSON.stringify(project);
    } catch (error) {
      return `❌ Failed to create project: ${(error as Error).message}`;
    }
  },
  name: "create_aptos_build_project",
  parameters: CreateProjectToolScheme,
};
