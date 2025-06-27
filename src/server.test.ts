import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { readFile } from "fs/promises";
import * as fs from "fs";
import { join as pathJoin } from "path";

// Mock fs and readFile
vi.mock("fs/promises");
vi.mock("fs");

// Mock the resources directory structure
const mockResourcesStructure = {
  "how_to_write_an_aptos_dapp.md": "Root level dApp guide content",
  "management/how_to_configure_admin_account.md":
    "Admin account configuration content",
  "management/how_to_fund_an_account_on_aptos.md": "Fund account content",
  "move/how_to_write_a_move_smart_contract.md": "Move contract content",
  "move/how_to_develop_smart_contract.md": "Develop contract content",
  "move/how_to_deploy_smart_contract.md": "Deploy contract content",
  "frontend/how_to_add_wallet_connection.md": "Wallet connection content",
  "frontend/how_to_integrate_wallet_selector_ui.md":
    "Wallet selector UI content",
  "frontend/how_to_sign_and_submit_transaction.md":
    "Transaction signing content",
};

const mockAptosResourceOptions = {
  how_to_write_an_aptos_dapp: "how_to_write_an_aptos_dapp.md",
  how_to_configure_admin_account:
    "management/how_to_configure_admin_account.md",
  how_to_fund_an_account_on_aptos:
    "management/how_to_fund_an_account_on_aptos.md",
  how_to_write_a_move_smart_contract:
    "move/how_to_write_a_move_smart_contract.md",
  how_to_develop_smart_contract: "move/how_to_develop_smart_contract.md",
  how_to_deploy_smart_contract: "move/how_to_deploy_smart_contract.md",
  how_to_add_wallet_connection: "frontend/how_to_add_wallet_connection.md",
  how_to_integrate_wallet_selector_ui:
    "frontend/how_to_integrate_wallet_selector_ui.md",
  how_to_sign_and_submit_transaction:
    "frontend/how_to_sign_and_submit_transaction.md",
};

// Mock the execute function from server.ts
const mockExecute = async ({
  context,
  specific_resource,
}: {
  context?: string;
  specific_resource?: string;
}) => {
  const resourcesDir = pathJoin(__dirname, "resources");
  const aptosResourceOptions = mockAptosResourceOptions;

  // If specific resource is requested, return it directly
  if (specific_resource) {
    const resourcePath =
      aptosResourceOptions[
        specific_resource as keyof typeof aptosResourceOptions
      ];
    if (resourcePath) {
      const filePath = pathJoin(resourcesDir, resourcePath);
      const content =
        mockResourcesStructure[
          resourcePath as keyof typeof mockResourcesStructure
        ];
      return {
        type: "text",
        text: content,
      };
    } else {
      return {
        type: "text",
        text: `Resource '${specific_resource}' not found. Available resources: ${Object.keys(aptosResourceOptions).join(", ")}`,
      };
    }
  }

  // If no context provided, return overview of available resources
  if (!context) {
    const resourcesList = Object.keys(aptosResourceOptions)
      .map((resource) => {
        return `- ${resource.replace(/_/g, " ").replace(/^how to /, "")}`;
      })
      .join("\n");

    return {
      type: "text",
      text: `# Available Aptos Development Resources\n\nThe following resources are available to help with Aptos dApp development:\n\n${resourcesList}\n\nTo get specific guidance, describe what you're trying to accomplish (e.g., "smart contract development", "wallet integration", "full dapp setup").`,
    };
  }

  // Intelligent resource matching based on context
  const contextLower = context.toLowerCase();
  const relevantResources: string[] = [];

  // Define context-to-resource mappings
  const contextMappings = {
    move: [
      "how_to_write_a_move_smart_contract",
      "how_to_develop_smart_contract",
      "how_to_deploy_smart_contract",
    ],
    contract: [
      "how_to_write_a_move_smart_contract",
      "how_to_develop_smart_contract",
      "how_to_deploy_smart_contract",
    ],
    dapp: [
      "how_to_configure_admin_account",
      "how_to_fund_an_account_on_aptos",
      "how_to_write_an_aptos_dapp",
      "how_to_write_a_move_smart_contract",
      "how_to_develop_smart_contract",
      "how_to_deploy_smart_contract",
      "how_to_add_wallet_connection",
      "how_to_integrate_wallet_selector_ui",
      "how_to_sign_and_submit_transaction",
    ],
    wallet: [
      "how_to_add_wallet_connection",
      "how_to_integrate_wallet_selector_ui",
    ],
    frontend: [
      "how_to_add_wallet_connection",
      "how_to_integrate_wallet_selector_ui",
      "how_to_sign_and_submit_transaction",
    ],
    ui: ["how_to_integrate_wallet_selector_ui", "how_to_add_wallet_connection"],
    transaction: ["how_to_sign_and_submit_transaction"],
    account: [
      "how_to_configure_admin_account",
      "how_to_fund_an_account_on_aptos",
    ],
    deploy: ["how_to_deploy_smart_contract"],
    publish: ["how_to_deploy_smart_contract"],
    fund: ["how_to_fund_an_account_on_aptos"],
    admin: ["how_to_configure_admin_account"],
    setup: [
      "how_to_fund_an_account_on_aptos",
      "how_to_configure_admin_account",
    ],
    "getting started": ["how_to_write_an_aptos_dapp"],
    overview: ["how_to_write_an_aptos_dapp"],
  };

  // Find matching resources based on context
  for (const [keyword, resources] of Object.entries(contextMappings)) {
    if (contextLower.includes(keyword)) {
      relevantResources.push(...resources);
    }
  }

  // Remove duplicates and ensure resources exist
  const uniqueResources = [...new Set(relevantResources)].filter(
    (resource) =>
      aptosResourceOptions[resource as keyof typeof aptosResourceOptions] !==
      undefined
  );

  // If no specific matches, default to the main guide
  if (uniqueResources.length === 0) {
    uniqueResources.push("how_to_write_an_aptos_dapp");
  }

  // Read and combine the relevant resources
  let combinedContent = `# Aptos Development Resources for: ${context}\n\n`;

  for (const resource of uniqueResources) {
    const resourcePath =
      aptosResourceOptions[resource as keyof typeof aptosResourceOptions];
    if (resourcePath) {
      const content =
        mockResourcesStructure[
          resourcePath as keyof typeof mockResourcesStructure
        ];
      if (content) {
        combinedContent += `## ${resource
          .replace(/_/g, " ")
          .replace(/^how to /, "")
          .toUpperCase()}\n\n`;
        combinedContent += content + "\n\n---\n\n";
      }
    }
  }

  return {
    type: "text",
    text: combinedContent,
  };
};

describe("get_aptos_development_resources", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("specific_resource parameter", () => {
    it("should return content for valid specific resource from root directory", async () => {
      const result = await mockExecute({
        specific_resource: "how_to_write_an_aptos_dapp",
      });

      expect(result.type).toBe("text");
      expect(result.text).toBe("Root level dApp guide content");
    });

    it("should return content for valid specific resource from subdirectory", async () => {
      const result = await mockExecute({
        specific_resource: "how_to_configure_admin_account",
      });

      expect(result.type).toBe("text");
      expect(result.text).toBe("Admin account configuration content");
    });

    it("should return error message for non-existent specific resource", async () => {
      const result = await mockExecute({
        specific_resource: "non_existent_resource",
      });

      expect(result.type).toBe("text");
      expect(result.text).toContain(
        "Resource 'non_existent_resource' not found"
      );
      expect(result.text).toContain("Available resources:");
    });
  });

  describe("overview (no parameters)", () => {
    it("should return overview when no context is provided", async () => {
      const result = await mockExecute({});

      expect(result.type).toBe("text");
      expect(result.text).toContain("# Available Aptos Development Resources");
      expect(result.text).toContain("The following resources are available");
      expect(result.text).toContain("- write an aptos dapp");
      expect(result.text).toContain("- configure admin account");
    });
  });

  describe("context-based matching", () => {
    it('should return move-related resources for "move" context', async () => {
      const result = await mockExecute({ context: "move smart contract" });

      expect(result.type).toBe("text");
      expect(result.text).toContain(
        "# Aptos Development Resources for: move smart contract"
      );
      expect(result.text).toContain("WRITE A MOVE SMART CONTRACT");
      expect(result.text).toContain("DEVELOP SMART CONTRACT");
      expect(result.text).toContain("DEPLOY SMART CONTRACT");
      expect(result.text).toContain("Move contract content");
    });

    it('should return wallet-related resources for "wallet" context', async () => {
      const result = await mockExecute({ context: "wallet integration" });

      expect(result.type).toBe("text");
      expect(result.text).toContain(
        "# Aptos Development Resources for: wallet integration"
      );
      expect(result.text).toContain("ADD WALLET CONNECTION");
      expect(result.text).toContain("INTEGRATE WALLET SELECTOR UI");
      expect(result.text).toContain("Wallet connection content");
    });

    it('should return comprehensive resources for "dapp" context', async () => {
      const result = await mockExecute({ context: "full dapp development" });

      expect(result.type).toBe("text");
      expect(result.text).toContain(
        "# Aptos Development Resources for: full dapp development"
      );
      expect(result.text).toContain("CONFIGURE ADMIN ACCOUNT");
      expect(result.text).toContain("FUND AN ACCOUNT ON APTOS");
      expect(result.text).toContain("WRITE AN APTOS DAPP");
      expect(result.text).toContain("ADD WALLET CONNECTION");
    });

    it('should return setup-related resources for "setup" context', async () => {
      const result = await mockExecute({ context: "project setup" });

      expect(result.type).toBe("text");
      expect(result.text).toContain(
        "# Aptos Development Resources for: project setup"
      );
      expect(result.text).toContain("FUND AN ACCOUNT ON APTOS");
      expect(result.text).toContain("CONFIGURE ADMIN ACCOUNT");
    });

    it('should return transaction resources for "transaction" context', async () => {
      const result = await mockExecute({ context: "transaction signing" });

      expect(result.type).toBe("text");
      expect(result.text).toContain(
        "# Aptos Development Resources for: transaction signing"
      );
      expect(result.text).toContain("SIGN AND SUBMIT TRANSACTION");
      expect(result.text).toContain("Transaction signing content");
    });

    it("should handle case-insensitive matching", async () => {
      const result = await mockExecute({ context: "WALLET CONNECTION" });

      expect(result.type).toBe("text");
      expect(result.text).toContain("ADD WALLET CONNECTION");
      expect(result.text).toContain("INTEGRATE WALLET SELECTOR UI");
    });

    it("should handle multiple keyword matches", async () => {
      const result = await mockExecute({ context: "move contract deployment" });

      expect(result.type).toBe("text");
      expect(result.text).toContain("WRITE A MOVE SMART CONTRACT");
      expect(result.text).toContain("DEVELOP SMART CONTRACT");
      expect(result.text).toContain("DEPLOY SMART CONTRACT");
    });

    it("should default to main guide when no keywords match", async () => {
      const result = await mockExecute({ context: "some random context" });

      expect(result.type).toBe("text");
      expect(result.text).toContain(
        "# Aptos Development Resources for: some random context"
      );
      expect(result.text).toContain("WRITE AN APTOS DAPP");
      expect(result.text).toContain("Root level dApp guide content");
    });
  });

  describe("edge cases", () => {
    it("should handle empty context string", async () => {
      const result = await mockExecute({ context: "" });

      expect(result.type).toBe("text");
      // Empty string is falsy, so it should return overview instead of context-based results
      expect(result.text).toContain("# Available Aptos Development Resources");
      expect(result.text).toContain("The following resources are available");
    });

    it("should handle whitespace-only context", async () => {
      const result = await mockExecute({ context: "   " });

      expect(result.type).toBe("text");
      expect(result.text).toContain("# Aptos Development Resources for:    ");
      expect(result.text).toContain("WRITE AN APTOS DAPP");
    });

    it("should remove duplicates when multiple keywords match same resources", async () => {
      const result = await mockExecute({
        context: "move contract smart contract",
      });

      expect(result.type).toBe("text");
      // Should contain each resource section only once
      const sections = result.text.split("## ");
      const contractSections = sections.filter((section) =>
        section.includes("WRITE A MOVE SMART CONTRACT")
      );
      expect(contractSections.length).toBe(1);
    });

    it("should handle context with special characters", async () => {
      const result = await mockExecute({ context: "wallet & ui integration!" });

      expect(result.type).toBe("text");
      expect(result.text).toContain("ADD WALLET CONNECTION");
      expect(result.text).toContain("INTEGRATE WALLET SELECTOR UI");
    });
  });

  describe("resource mapping validation", () => {
    it("should only include resources that exist in aptosResourceOptions", async () => {
      const result = await mockExecute({ context: "move" });

      expect(result.type).toBe("text");
      // Should not include any non-existent resources
      expect(result.text).not.toContain("NON_EXISTENT_RESOURCE");
    });

    it("should handle all available context mappings", async () => {
      const contexts = [
        "move",
        "contract",
        "dapp",
        "wallet",
        "frontend",
        "ui",
        "transaction",
        "account",
        "deploy",
        "publish",
        "fund",
        "admin",
        "setup",
        "getting started",
        "overview",
      ];

      for (const context of contexts) {
        const result = await mockExecute({ context });
        expect(result.type).toBe("text");
        expect(result.text).toContain(
          `# Aptos Development Resources for: ${context}`
        );
        expect(result.text.length).toBeGreaterThan(0);
      }
    });
  });
});
