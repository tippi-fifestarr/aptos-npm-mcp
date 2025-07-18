# Integrate Aptos MCP with Cursor

1.  Open the Cursor IDE
2.  On the project root folder, create a `.cursor` folder
3.  In the `.cursor` folder, create a `mcp.json` file
4.  paste this content

    ```json
    {
      "mcpServers": {
        "aptos-build-mcp": {
          "command": "npx",
          "args": ["tsx", "<path-to-mcp-server>/src/server.ts"],
          "type": "stdio",
          "env": {
            "APTOS_BOT_KEY": "<bot_api_key>"
          }
        }
      }
    }
    ```

5.  Make sure to update the `args` to point to the cloned MCP folder from the previous step.
6.  Make sure to update the `APTOS_BOT_KEY` with the key you generated in the previous step.

### Verify Cursor runs your MCP

1.  Open Cursor Setting: `cursor -> setting -> cursor setting`
2.  Head to the `MCP` or `Tools & Integrations` section
3.  Make sure it is enabled and showing a green color indicator
    <img width="939" alt="image" src="https://github.com/user-attachments/assets/568600be-2a00-4381-876d-619e5771f602" />

4.  Click the “refresh” icon to update the MCP.

5.  Make sure the Cursor AI window dropdown is set to `Agent` and `claude-4-sonnet`
    <br/>
    <img width="270" alt="image (1)" src="https://github.com/user-attachments/assets/957ab3eb-72ef-46ee-b129-f43ecb327158" />
6.  Prompt the agent with `what aptos mcp version are you using?` to verify the connection. The agent should replay with something like:
    ![Screenshot 2025-06-26 at 3 54 44 PM](https://github.com/user-attachments/assets/4ead13c6-1697-40e1-b4e7-0fbf7dd5f281)
