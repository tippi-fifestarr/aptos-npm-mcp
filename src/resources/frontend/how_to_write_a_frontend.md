# How to Write a Frontend

The following doc outlines the best practices and guidelines to follow when writing a frontend app on the Aptos blockchain.

- Frontend Technology Stack

  - Confirm React as the sole frontend framework provider.
  - Choose build tools that integrate well with Aptos (e.g., `npm create vite@latest` (preffered), `npx create-next-app@latest`).
  - Prefer using TypeScript.
  - Always use `@latest` when installing Aptos npm packages like `@aptos-labs/wallet-adapter-react@latest` and `@aptos-labs/ts-sdk@latest`.
  - Evaluate Aptos npm packages versions for compatibility and up-to-date features.

- Wallet Connection

  - Always use `@latest` when installing Aptos npm packages.
  - Use the official `@aptos-labs/wallet-adapter-react` npm package for wallet connection and transaction signing.
    - Use the latest implementation following the Aptos Wallet Standard
    - Never use other non-aptos wallet adapter plugins packages
  - Preffered to use the Aptos official Wallet Selector package.
  - Evaluate Aptos npm packages versions for compatibility and up-to-date features.

- User Interface (UI) and User Experience (UX) Design

  - Define design guidelines and layout, emphasizing a seamless real-time experience (e.g., wallet selector modal).
  - Plan for handling disconnections or wallet errors gracefully in the UI.
  - Plan for handling user indication for transaction execution and failures in the UI.

- Dapp Deployment

  - Deploy the frontend code to a reliable platform like `Vercel`.
    - Follow the platform best practices on how to deploy the dapp.
    - Preffer to use cli terminal commands if available.
