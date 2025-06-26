# How to Write an Aptos dApp Checklist

The following checklist outlines the steps to create a dapp on the Aptos network without needing to rely on any third-party services or libraries. This guide is designed for developers who want to build an application using Aptos tools and their SDKs and custom code where needed.

- Dapp Configurations Selection

* Configure the Aptos network (devnet / testnet / mainnet) to work with.
* Configure an Admin Account for smart contract publishing.
* Use environment variables to store the dapp configuration.
* Dont create .md or script files for how to do actions like deployment - just do it.

- Project folder structure

* In the `project folder`, rename the `src` folder in the project folder to `frontend`, and make sure to modify all relevante references.
  - Use the `frontend` folder as the place to hold all of the project frontend code.
* In the `project folder`, create a `contract` folder.
  - Use the `contract` folder as the place to hold all of the project Move contract code.
  - Generate the relevant Move smart contract files in the `contract` folder, such as the `Move.toml` file, `sources` folder.
  - Implement any relevant smart contract code.
* A minimal dapp folder structure should look like

```
├── project-folder/
│   ├── frontend/               # The folder that holds all of the project frontend code.
│   ├── contract/               # The folder that holds all of the project Move contract code.
|   ├── .env                    # Dapp configurations file
|   ├── package.json
```

- Move Smart Contract

* All of the project Move contract code should live in a `contract` folder.
* At the minimum, the `contract` folder should have `Move.toml` file and a `sources` folder.
  - `Move.toml` file is the configuration of the Move project.
  - `sources` folder holds all the Move modules.
* Make sure to write unit tests for the Move module.
* Make sure to always add the `build/` folder in the `.gitignore` file

- Frontend Technology Stack

* Confirm React as the sole frontend framework provider.
* Choose build tools that integrate well with Aptos (e.g., npm create vite@latest (preffered), npx create-next-app@latest).
* Prefer using TypeScript.
* Always use `@latest` when installing Aptos npm packages like `@aptos-labs/wallet-adapter-react` and `@aptos-labs/ts-sdk`.
* Evaluate Aptos npm packages versions for compatibility and up-to-date features.

- Wallet Connection

* Always use `@latest` when installing Aptos npm packages.
* Use the official `@aptos-labs/wallet-adapter-react` npm package for wallet connection and transaction signing.
  - Use the latest implementation following the Aptos Wallet Standard
  - Never use other non-aptos wallet adapter plugins packages
* Preffered to use the Aptos official Wallet Selector package.
* Evaluate Aptos npm packages versions for compatibility and up-to-date features.

- User Interface (UI) and User Experience (UX) Design

* Define design guidelines and layout, emphasizing a seamless real-time experience (e.g., wallet selector modal).
* Plan for handling disconnections or wallet errors gracefully in the UI.
* Plan for handling user indication for transaction execution and failures in the UI.

- Dapp Deployment

* Publish the Move smart contract to the Aptos blockchain.
* Modify the front end code to interact with the deployed contract address.
* Deploy the frontend code to a reliable platform like `Vercel`.
  - Follow the platform best practices on how to deploy the dapp.
  - Preffer to use cli terminal commands if available.

<!-- * Aptos Build Account Setup and API Key Configuration

- Create a Build account:
  - Go to Aptos Build's official website and sign up with a valid email address.
  - Verify your account if prompted, and log in to the Build dashboard.
- Create a new application on Build:
  - In the dashboard, navigate to the Projects section and create a new project.
  - Provide a descriptive name for your project to easily identify it later.
- Generate Aptos Build API keys:
  - From within your newly created project, click on the "API Resource" section.
  - Provide a descriptive Resource Name to easily identify it later.
  - Select the Aptos network (devnet, testnet, mainnet) you intend to use the API Key with.
  - Provide a descriptive name for your API Key to easily identify it later.
  - Enable the Client usage option.
    – Obtain the Node API for both development and production environments.
- Store and manage your keys securely:
  – Do not embed API keys in publicly visible repositories.
  – Use environment variables or secure configuration management to protect your credentials. -->
