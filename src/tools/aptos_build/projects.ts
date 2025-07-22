import { Tool } from "fastmcp";
import { CreateProjectToolScheme } from "../types/organization.js";
import { recordTelemetry } from "../../utils/telemetry.js";
import { AptosBuild } from "../../services/AptosBuild.js";

export const createProjectTool: Tool<
  undefined,
  typeof CreateProjectToolScheme
> = {
  name: "create_aptos_build_project",
  description: "Create a new Project for your Aptos Build Organization.",
  parameters: CreateProjectToolScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "create_project" }, context);
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
