import { z } from "zod";

// Get Organizations Scheme
export const GetOrganizationsToolScheme = z.object({});

// Get Projects Scheme
export const GetProjectsToolScheme = z.object({
  organization_id: z
    .string()
    .describe(
      "The organization id to get projects for. If not provided, returns available projects overview."
    ),
});

// Get Applications Scheme
export const GetApplicationsToolScheme = z.object({
  organization_id: z
    .string()
    .describe(
      "The organization id to get applications for. If not provided, returns available applications overview."
    ),
  projects_id: z
    .string()
    .describe(
      "The project id to get applications for. If not provided, returns available applications overview."
    ),
});

// Get Api Keys Scheme
export const GetApiKeysToolScheme = z.object({
  application_id: z
    .string()
    .describe(
      "The application id to get api keys for. If not provided, returns available api keys overview."
    ),
  organization_id: z
    .string()
    .describe(
      "The organization id to get api keys for. If not provided, returns available api keys overview."
    ),
  project_id: z
    .string()
    .describe(
      "The project id to get api keys for. If not provided, returns available api keys overview."
    ),
});

// Query params types
export type ProjectsGetParams = z.infer<typeof GetProjectsToolScheme>;
export type ApplicationsGetParams = z.infer<typeof GetApplicationsToolScheme>;
export type ApiKeysGetParams = z.infer<typeof GetApiKeysToolScheme>;

// Response types
export type ApplicationsResponse = {
  id: string;
  name: string;
  description: string | null;
  allowedNetworks: string[];
  createdAt: string;
  projectId: string;
  serviceType: string;
}[];
