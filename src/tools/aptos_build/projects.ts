import { Tool } from "fastmcp";

import { AptosBuild } from "../../services/AptosBuild.js";
import { recordTelemetry } from "../../utils/telemetry.js";
import {
  CreateProjectToolScheme,
  DeleteProjectToolScheme,
  UpdateProjectToolScheme,
} from "../types/organization.js";

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
      const aptosBuild = new AptosBuild(context);
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

/**
 * Tool to update a Project for your Aptos Build Organization.
 */
export const updateProjectTool: Tool<
  undefined,
  typeof UpdateProjectToolScheme
> = {
  description: "Update a Project for your Aptos Build Organization.",
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "update_project" }, context);
      const aptosBuild = new AptosBuild(context);
      const project = await aptosBuild.updateProject({
        description: args.description ?? "",
        organization_id: args.organization_id,
        project_id: args.project_id,
        project_name: args.project_name ?? "",
      });
      return JSON.stringify(project);
    } catch (error) {
      return `❌ Failed to update project: ${(error as Error).message}`;
    }
  },
  name: "update_aptos_build_project",
  parameters: UpdateProjectToolScheme,
};

/**
 * Tool to delete a Project for your Aptos Build Organization.
 */
export const deleteProjectTool: Tool<
  undefined,
  typeof DeleteProjectToolScheme
> = {
  description: "Delete a Project for your Aptos Build Organization.",
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "delete_project" }, context);
      const aptosBuild = new AptosBuild(context);
      const response = await aptosBuild.deleteProject({
        organization_id: args.organization_id,
        project_id: args.project_id,
      });
      return JSON.stringify(response);
    } catch (error) {
      return `❌ Failed to delete project: ${(error as Error).message}`;
    }
  },
  name: "delete_aptos_build_project",
  parameters: DeleteProjectToolScheme,
};
