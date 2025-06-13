How to Write an Aptos dApp Checklist

The following checklist outlines the steps to create a dapp on the Aptos network without needing to rely on any third-party services or libraries. This guide is designed for developers who want to build an application using Aptos tools and their SDKs and custom code where needed.

- Dapp Configurations Selection

* Choose the Aptos network (devnet / testnet / mainnet) to work with.
* Choose whether to provide a known admin account private key or generate a new one.
  - This account will be used to later publish a samrt contract, if exists.
* Use environment variables to store the dapp configuration.

- Project folder structure

* In the root folder, generate the project setup based on the chosen framework.
* In the project folder, rename the `src` folder in the project folder to `frontend`, and make sure to modify all relevante references.
  - Use the `frontend` folder as the place to hold all of the project frontend code.
* In the project folder, create a `contract` folder.
  - Use the `contract` folder as the place to hold all of the project Move contract code.
  - Generate the relevant Move smart contract files in the `contract` folder, such as the `Move.toml` file, `sources` folder.
  - Implement any relevant smart contract code.

- Technology Stack Selection

* Confirm React as the sole frontend framework provider.
* Choose build tools that integrate well with Aptos (e.g., npm create vite@latest, npx create-next-app@latest).
* Prefer using TypeScript.
* Evaluate Aptos npm packages versions for compatibility and up-to-date features.

- User Interface (UI) and User Experience (UX) Design

* Define design guidelines and layout, emphasizing a seamless real-time experience (e.g., wallet selector modal).
* Plan for handling disconnections or wallet errors gracefully in the UI.

<!-- TODO -->

- Deployment

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
