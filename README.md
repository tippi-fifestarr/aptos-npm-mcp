# Aptos NPM MCP

## Usage

1. Clone this MCP repo

```bash
git clone git@github.com:aptos-labs/aptos-npm-mcp.git
```

2. Link the MCP to your project

   1. Open the Cursor IDE
   2. On the project root folder, create a `.cursor` folder
   3. In the `.cursor` folder, create a `mcp.json` file
   4. paste this content

      ```json
      {
        "mcpServers": {
          "aptos-build-mcp": {
            "command": "npx",
            "args": ["tsx", "<path-to-mcp-server>/src/server.ts"],
            "type": "stdio"
          }
        }
      }
      ```

   5. Make sure to update the `args` to point to the cloned MCP folder from the previous step

3. Verify Cursor runs your MCP
   1. Open Cursor Setting: `cursor -> setting -> cursor setting`
   2. Head to the `MCP` section
   3. Make sure it is enabled and showing a green color indicator
   4. Click the “refresh” icon to update the MCP
4. Start vibe coding.

   1. Make sure the Cursor AI window dropdown is set to `Agent` and `claude-4-sonnet`

   2. Prompt the agent with something like
      1. “build a <whatever> dapp on Aptos”
      2. “Build a frontend of a <whatever> dapp on Aptos”

## Development

To get started, clone the repository and install the dependencies.

```bash
npm install
```

### Add the MCP to Cursor

```json
{
  "mcpServers": {
    "aptos-build-mcp": {
      "command": "npx",
      "args": ["tsx", "<path-to-mcp-server>/src/server.ts"],
      "type": "stdio"
    }
  }
}
```

### Start the server

If you simply want to start the server, you can use the `start` script.

```bash
npm run start
```

However, you can also interact with the server using the `dev` script.

```bash
npm run dev
```

This will start the server and allow you to interact with it using CLI.

### Linting

Having a good linting setup reduces the friction for other developers to contribute to your project.

```bash
npm run lint
```

This boilerplate uses [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) and [TypeScript ESLint](https://typescript-eslint.io/) to lint the code.

### Formatting

Use `npm run format` to format the code.

```bash
npm run format
```
