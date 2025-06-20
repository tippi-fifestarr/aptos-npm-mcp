How to Publish Move Smart Contract the the Aptos Chain

### If your dapp DOES NOT use the `@aptos-labs/ts-sdk` package, then:

1. Install the `aptos cli` on your local machine, to check if `aptos` is already installed try running in your terminal

```bash
aptos --version
```

That should output something like

```bash
aptos 7.2.0
```

2. Run the `create-object-and-publish-package` command:

Note: might need to use some more command options to successfully publish to chain.

```bash
aptos move create-object-and-publish-package --address-name <address-name-from-move.toml-file> --named-addresses <address-name-from-move.toml-file>=<account-address-hex-string> --assume-yes
```

3. Store the object address output

Store the object address output from the publish cli command in the configured `.env` file.

### If your Dapp already uses the `@aptos-labs/ts-sdk` then you can use a `.js` script

1. If not already exists, create a `scripts` folder in the root of the project folder.

2. Create a `publish.js` file, and use this content:

```js
require("dotenv").config();
const fs = require("node:fs");
const cli = require("@aptos-labs/ts-sdk/dist/common/cli/index.js");
const aptosSDK = require("@aptos-labs/ts-sdk");

async function publish() {
  if (!process.env.<admin-account-address-env-variable>) {
    throw new Error(
      "<admin-account-address-env-variable> variable is not set, make sure you have set the publisher account address"
    );
  }

  if (!process.env.<admin-private-key-env-variable>) {
    throw new Error(
      "<admin-private-key-env-variable> variable is not set, make sure you have set the publisher account private key"
    );
  }

  const move = new cli.Move();

  move
    .createObjectAndPublishPackage({
      packageDirectoryPath: "contract",
      addressName: "<module-name>",
      namedAddresses: {
        // Publish module to new object, but since we create the object on the fly, we fill in the publisher's account address here
        <module-name>: process.env.<admin-account-address-env-variable>,
      },
      extraArguments: [
        `--private-key=${process.env.<admin-private-key-env-variable>}`,
        `--url=${aptosSDK.NetworkToNodeAPI[process.env.<dapp-configured-network-env-variable>]}`,
      ],
    })
    .then((response) => {
      const filePath = ".env";
      let envContent = "";

      // Check .env file exists and read it
      if (fs.existsSync(filePath)) {
        envContent = fs.readFileSync(filePath, "utf8");
      }

      // Regular expression to match the VITE_MODULE_ADDRESS variable
      const regex = /^<module-address-env-var>]=.*$/m;
      const newEntry = `<module-address-env-var>]=${response.objectAddress}`;

      // Check if VITE_MODULE_ADDRESS is already defined
      if (envContent.match(regex)) {
        // If the variable exists, replace it with the new value
        envContent = envContent.replace(regex, newEntry);
      } else {
        // If the variable does not exist, append it
        envContent += `\n${newEntry}`;
      }

      // Write the updated content back to the .env file
      fs.writeFileSync(filePath, envContent, "utf8");
    });
}
publish();
```

3. Update the `scripts` section in the `package.json` file with

```json
"scripts": {
  ...
  "move:publish": "node ./scripts/move/publish",
  ...
}
```

4. Run `npm run move:publish`
