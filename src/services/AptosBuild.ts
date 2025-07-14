import { config } from "../config.js";
import {
  ApiKey,
  createAdminApiClient,
  Project,
} from "@aptos-labs/api-gateway-admin-api-client";
import {
  ApiKeysGetParams,
  ApplicationsGetParams,
  ApplicationsResponse,
  ProjectsGetParams,
} from "../tools/types/organization.js";

export class AptosBuild {
  private readonly adminUrl: string;
  protected readonly headers: Record<string, string>;

  constructor() {
    if (!config.aptos_build.botKey) {
      throw new Error(
        `APTOS_BOT_KEY is not set. To generate a Bot Key: 
        1. Go to [https://build.aptoslabs.com/](https://build.aptoslabs.com/)
        2. Click on your name in the bottom left corner
        3. Click on "Bot Keys"
        4. Click on the "Create Bot Key" button
        5. Copy the Bot Key and paste it into the MCP configuration file as an env arg: APTOS_BOT_KEY=<your-bot-key>`
      );
    }
    this.adminUrl = config.aptos_build.adminUrl;
    this.headers = {
      Authorization: `Bearer ${config.aptos_build.botKey}`,
      "x-is-aptos-bot": "true",
    };
  }

  private createCustomFetch = (
    additionalHeaders: Record<string, string> = {}
  ) => {
    return async (
      input: string | URL | Request,
      init?: RequestInit
    ): Promise<Response> => {
      const headers = new Headers(init?.headers);

      const bearerToken = process.env.APTOS_BOT_KEY;

      headers.set("Authorization", `Bearer ${bearerToken}`);
      headers.set("x-is-aptos-bot", "true");

      Object.entries(additionalHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });

      return fetch(input, {
        ...init,
        headers,
      });
    };
  };

  protected createApiClient(additionalHeaders: Record<string, string> = {}) {
    return createAdminApiClient({
      apiUrl: this.adminUrl,
      customFetch: this.createCustomFetch(additionalHeaders),
    });
  }

  // TODO - update with recent recursive endpoint
  async getOrganizations(): Promise<
    { id: string; name: string; createdAt: string }[]
  > {
    try {
      const adminApiClient = this.createApiClient();
      const organizations = await adminApiClient.query(["getOrganizations"]);
      return organizations;
    } catch (error) {
      throw new Error(`Failed to get organizations: ${String(error)}`);
    }
  }

  async getProjects({
    organization_id,
  }: ProjectsGetParams): Promise<Project[]> {
    try {
      const adminApiClient = this.createApiClient({
        "x-jwt-organization-id": organization_id,
      });
      const projects = await adminApiClient.query(["getOrganizationProjects"]);
      return projects;
    } catch (error) {
      throw new Error(`Failed to get projects: ${String(error)}`);
    }
  }

  async getApplications({
    organization_id,
    projects_id,
  }: ApplicationsGetParams): Promise<ApplicationsResponse> {
    try {
      // Create client with specific headers for this call
      const adminApiClient = this.createApiClient({
        "x-jwt-organization-id": organization_id,
        "x-jwt-project-id": projects_id,
      });
      const applications = await adminApiClient.query([
        "getProjectApplications",
      ]);
      return applications;
    } catch (error) {
      throw new Error(`Failed to get applications: ${String(error)}`);
    }
  }

  async getApiKeys({
    application_id,
    organization_id,
    project_id,
  }: ApiKeysGetParams): Promise<ApiKey[]> {
    try {
      const adminApiClient = this.createApiClient({
        "x-jwt-application-id": application_id,
        "x-jwt-organization-id": organization_id,
        "x-jwt-project-id": project_id,
      });
      const apiKeys = await adminApiClient.query(["getApiKeysV2"]);
      return apiKeys;
    } catch (error) {
      throw new Error(`Failed to get api keys: ${String(error)}`);
    }
  }
}
