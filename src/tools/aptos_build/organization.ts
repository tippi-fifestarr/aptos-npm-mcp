import type { Tool } from "fastmcp";

import { AptosBuild } from "../../services/AptosBuild.js";
import { recordTelemetry } from "../../utils/telemetry.js";
import {
  CreateOrganizationToolScheme,
  UpdateOrganizationToolScheme,
} from "../types/organization.js";

/**
 * Tool to create a new Organization for your Aptos Build.
 */
export const createOrganizationTool: Tool<
  undefined,
  typeof CreateOrganizationToolScheme
> = {
  description: "Create a new Organization for your Aptos Build.",
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "create_organization" }, context);
      const aptosBuild = new AptosBuild(context);
      const organization = await aptosBuild.createOrganization({
        name: args.name,
      });
      return JSON.stringify(organization);
    } catch (error) {
      return `❌ Failed to create organization: ${error}`;
    }
  },
  name: "create_aptos_build_organization",
  parameters: CreateOrganizationToolScheme,
};

/**
 * Tool to update an Organization for your Aptos Build.
 */
export const updateOrganizationTool: Tool<
  undefined,
  typeof UpdateOrganizationToolScheme
> = {
  description: "Update an Organization for your Aptos Build.",
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "update_organization" }, context);
      const aptosBuild = new AptosBuild(context);
      const organization = await aptosBuild.updateOrganization({
        name: args.name,
        organization_id: args.organization_id,
      });
      return JSON.stringify(organization);
    } catch (error) {
      return `❌ Failed to update organization: ${error}`;
    }
  },
  name: "update_aptos_build_organization",
  parameters: UpdateOrganizationToolScheme,
};
