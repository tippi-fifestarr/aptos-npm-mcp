// import { createAdminApiClient } from "@aptos-labs/api-gateway-admin-api-client";

// // Create custom fetch with authorization header
// export const createCustomFetch = (
//   additionalHeaders: Record<string, string> = {}
// ) => {
//   return async (
//     input: string | URL | Request,
//     init?: RequestInit
//   ): Promise<Response> => {
//     const headers = new Headers(init?.headers);

//     const bearerToken = process.env.APTOS_BOT_KEY;

//     headers.set("Authorization", `Bearer ${bearerToken}`);
//     headers.set("x-is-aptos-bot", "true");

//     Object.entries(additionalHeaders).forEach(([key, value]) => {
//       headers.set(key, value);
//     });

//     return fetch(input, {
//       ...init,
//       headers,
//     });
//   };
// };

// // Helper function to create API client with specific headers
// export const createApiClient = (
//   additionalHeaders: Record<string, string> = {}
// ) => {
//   return createAdminApiClient({
//     apiUrl: "https://admin.api.staging.aptoslabs.com/api/rspc",
//     customFetch: createCustomFetch(additionalHeaders),
//   });
// };
