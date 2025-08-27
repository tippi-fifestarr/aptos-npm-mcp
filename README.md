# Aptos NPM MCP

## Prerequisites

- **Node.js 20+ and npm** (npm ≥ 5.2.0)
  - Check your versions: `node --version && npm --version`
  - Need to upgrade? Install [nvm](https://github.com/nvm-sh/nvm) and run `nvm install 20`
- Build Bot Api Key

### Generate a `Build Bot Api Key`

To be able to make [Aptos Build](https://build.aptoslabs.com/) actions like managing api keys, etc. Follow those instruction to generate a new Bot Api Key to use with the MCP

1. Go to [https://build.aptoslabs.com/](https://build.aptoslabs.com/)
2. Click on your name in the bottom left corner
3. Click on "Bot Keys"
4. Click on the "Create Bot Key" button
5. Copy the Bot Key and paste it into the MCP configuration file as an env arg: `APTOS_BOT_KEY=<your-bot-key>`

## Production Usage

#### Follow these guides on how to integrate the Aptos MCP with your prefered interface

- [Cursor](./integration_guides/cursor.md)
- [Claude Code](./integration_guides/claude_code.md)

### Start vibe coding.

Make sure to read the [user guide](./integration_guides/user_guide.md) for best results.

## Development Usage

#### Follow this guide on how to develop locally the Aptos MCP

- [Local development with the Aptos MCP](./integration_guides/development_usage.md)
