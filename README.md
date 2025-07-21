# Aptos NPM MCP

## Usage

### Clone this MCP repo

```bash
git clone git@github.com:aptos-labs/aptos-npm-mcp.git
```

### Generate a `Build Bot Api Key`

To be able to make [Aptos Build](https://build.aptoslabs.com/) actions like generate api keys, etc. Follow those instruction to generate a new Bot Api Key to use with the MCP

1. Go to [https://build.aptoslabs.com/](https://build.aptoslabs.com/)
2. Click on your name in the bottom left corner
3. Click on "Bot Keys"
4. Click on the "Create Bot Key" button
5. Copy the Bot Key and paste it into the MCP configuration file as an env arg: `APTOS_BOT_KEY=<your-bot-key>`

### Integrate MCP with

- [Cursor](./integration_guides/cursor.md)
- [Claude Code](./integration_guides/claude_code.md)

### Start vibe coding.

Make sure to read the [user guide](./integration_guides/user_guide.md) for best results.

## Development

To get started, clone the repository and install the dependencies.

```bash
npm install
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

### Debugging

You can test and debug the MCP using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector) tool.

Run the following command from the root path of this Repo

```bash
npx @modelcontextprotocol/inspector
```

That would open up a UI where you can run and test the MCP tools/prompts/resources

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
