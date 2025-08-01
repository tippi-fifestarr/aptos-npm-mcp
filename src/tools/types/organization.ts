import { z } from "zod";

// Get Organizations Scheme
export const getApplicationsToolScheme = z.object({});

// Get Projects Scheme
export const GetProjectsToolScheme = z.object({
  organization_id: z
    .string()
    .describe(
      "The organization id to get projects for. If not provided, returns available projects overview."
    ),
});

// Create Api Key Scheme
export const CreateApiKeyToolScheme = z.object({
  application_id: z
    .string()
    .describe("The application id to create the api key for."),
  frontend_args: z.object({
    extension_ids: z
      .array(z.string())
      .describe(
        "The extension ids to allow the api key to access. If not provided, all extension ids will be allowed."
      )
      .default([]),
    http_rate_limit_per_ip: z
      .number()
      .describe(
        "The http rate limit per ip. If not provided, the default 2,000,000 Compute Units per 5 minutes rate limit will be used."
      )
      .default(2000000),
    web_app_urls: z
      .array(z.string())
      .describe(
        "The web app urls to allow the api key to access. If not provided, all URLs will be allowed."
      )
      .default([]),
  }),
  name: z
    .string()
    .describe(
      "The name of the api key. Must be between 3 and 32 characters long, with only lowercase letters, numbers, dashes and underscores."
    ),
  organization_id: z
    .string()
    .describe("The organization id to create the api key for."),
  project_id: z.string().describe("The project id to create the api key for."),
});

export const UpdateApiKeyToolScheme = z.object({
  application_id: z
    .string()
    .describe("The application id to update the api key for."),
  current_api_key_name: z.string().describe("The current name of the api key."),
  frontend_args: z
    .object({
      extension_ids: z
        .array(z.string())
        .describe(
          "The extension ids to allow the api key to access. If not provided, all extension ids will be allowed."
        )
        .optional()
        .default([]),
      http_rate_limit_per_ip: z
        .number()
        .describe(
          "The http rate limit per ip. If not provided, the default 2,000,000 Compute Units per 5 minutes rate limit will be used."
        )
        .optional()
        .default(2000000),
      web_app_urls: z
        .array(z.string())
        .describe(
          "The web app urls to allow the api key to access. If not provided, all URLs will be allowed."
        )
        .optional()
        .default([]),
    })
    .optional(),
  new_api_key_name: z
    .string()
    .describe("The new name of the api key.")
    .optional(),
  organization_id: z
    .string()
    .describe("The organization id to update the api key for."),
  project_id: z.string().describe("The project id to update the api key for."),
});

export const DeleteApiKeyToolScheme = z.object({
  application_id: z
    .string()
    .describe("The application id to delete the api key for."),
  api_key_name: z.string().describe("The name of the api key to delete."),
  organization_id: z
    .string()
    .describe("The organization id to delete the api key for."),
  project_id: z.string().describe("The project id to delete the api key for."),
});

export const CreateApiResourceApplicationToolScheme = z.object({
  description: z
    .string()
    .describe("The description of the application.")
    .optional(),
  name: z
    .string()
    .describe(
      "The name of the application. Must be between 3 and 32 characters long, with only lowercase letters, numbers, dashes and underscores."
    ),
  network: z
    .string()
    .describe(
      "The network to create the application for. Can be devnet, testnet or mainnet."
    ),
  organization_id: z
    .string()
    .describe("The organization id to create the application for."),
  project_id: z
    .string()
    .describe("The project id to create the application for."),
});

export const CreateGasStationApplicationToolScheme =
  CreateApiResourceApplicationToolScheme.omit({ network: true })
    .merge(CreateApiKeyToolScheme.omit({ application_id: true, name: true }))
    .extend({
      network: z
        .enum(["testnet", "mainnet"])
        .describe(
          "The network to create the gas station application for. Can only be testnet or mainnet."
        ),
      api_key_name: z
        .string()
        .describe(
          "The name of the api key to create the gas station for. This is the name of the api key that will be created for the gas station. Must be between 3 and 32 characters long, with only lowercase letters, numbers, dashes and underscores."
        ),
      functions: z
        .array(z.string())
        .describe(
          "A list of functions the gas station will sponsor. Each function should be in the format of <module_address>::<module_name>::<function_name>."
        ),
    });

export const CreateProjectToolScheme = z.object({
  description: z.string().describe("The description of the project."),
  organization_id: z
    .string()
    .describe("The organization id to create the project for."),
  project_name: z
    .string()
    .describe(
      "The name of the project. Must be between 3 and 32 characters long, with only lowercase letters, numbers, dashes and underscores."
    ),
});

export const CreateOrganizationToolScheme = z.object({
  name: z
    .string()
    .describe(
      "The name of the organization. Must be between 3 and 32 characters long, with only lowercase letters, numbers, dashes and underscores."
    ),
});

export const DeleteApplicationToolScheme = z.object({
  application_id: z.string().describe("The application id to delete."),
  organization_id: z
    .string()
    .describe("The organization id to delete the application for."),
  project_id: z
    .string()
    .describe("The project id to delete the application for."),
});

export const UpdateProjectToolScheme = z.object({
  organization_id: z
    .string()
    .describe("The organization id to update the project for."),
  project_id: z.string().describe("The project id to update the project for."),
  project_name: z
    .string()
    .describe("The name of the project to update.")
    .optional(),
  description: z
    .string()
    .describe("The description of the project.")
    .optional(),
});

export const UpdateOrganizationToolScheme = z.object({
  name: z.string().describe("The name of the organization to update."),
  organization_id: z
    .string()
    .describe("The organization id to update the organization for."),
});

export const DeleteProjectToolScheme = z.object({
  organization_id: z
    .string()
    .describe("The organization id to delete the project for."),
  project_id: z.string().describe("The project id to delete the project for."),
});

export const UpdateApplicationNameToolScheme = z.object({
  organization_id: z
    .string()
    .describe("The organization id to update the application name for."),
  project_id: z
    .string()
    .describe("The project id to update the application name for."),
  application_id: z
    .string()
    .describe("The application id to update the name for."),
  new_name: z.string().describe("The new name of the application."),
});

// Query params types
export type CreateApiKeyParams = z.infer<typeof CreateApiKeyToolScheme>;
