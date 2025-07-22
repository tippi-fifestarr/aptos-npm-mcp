import type { Tool } from "fastmcp";
import { CreateOrganizationToolScheme } from "../types/organization.js";
import { AptosBuild } from "../../services/AptosBuild.js";
import { recordTelemetry } from "../../utils/telemetry.js";

export const createOrganizationTool: Tool<
  undefined,
  typeof CreateOrganizationToolScheme
> = {
  name: "create_aptos_build_organization",
  description: "Create a new Organization for your Aptos Build.",
  parameters: CreateOrganizationToolScheme,
  execute: async (args, context) => {
    try {
      await recordTelemetry({ action: "create_organization" }, context);
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
