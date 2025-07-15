# How to config an Api Key in an Aptos dapp

This guide is designed for agents to follow when configuring `APTOS_API_KEY`.
It is structured to enforce user validation steps before applying any modifications.

### 🟩 Step 1: Retrieve & Display Available API Keys

1. Fetch the user's Build Organizations, including:

- Organizations
- Applications
- Projects
- API Keys

2. Display all available API Keys with:

- Key Name
- Key Secret
- Associated Network
- Project/Application Name

3. If no API keys exist, prompt the user to:

- Create a new API Key in Build

### 🟩 Step 2: Prompt the User to Select Keys

Wait for explicit user selection of:

API Key (APTOS_API_KEY) — for client authentication.

❗ Do not proceed automatically. Pause and await user selection input in the format:

```json
{
  "apiKey": "<selected-api-key>"
}
```

### 🟩 Step 3: Apply User-Selected Keys

Once user input is received:

1. ✅ Update the .env file:

```
APTOS_API_KEY=<apiKey>
```

2. ✅ Ensure the selected API key is injected into the:

- AptosWalletAdapterProvider:

```ts
<AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
      network: Network.MAINNET,  // The Aptos Network The Dapp Works With
      aptosApiKeys: {
          <dapp-network>: APTOS_API_KEY,
        }
      }}
      onError={(error) => {
        console.log("error", error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
```

- Aptos client instance:

```ts
const aptos = new Aptos(
  new AptosConfig({
    network: NETWORK,
    clientConfig: { API_KEY: APTOS_API_KEY },
  })
);
```

```

3. ✅ Confirm to the user that:

- The keys have been set.
- The relevant code/config files were updated.

### 🟩 Step 4: Validation

- ✅ Ensure that the API Key's network matches the dapp's current network.
- ✅ If mismatched, warn the user and ask for confirmation before proceeding.

### 🟩 Bonus: Documentation References
[Build API Keys Guide](https://build.aptoslabs.com/docs/start/api-keys)

```
