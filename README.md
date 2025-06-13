# Aptos NPM MCP

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
      "command": "node",
      "args": ["<path-to-mcp-server>/dist/server.js"],
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
