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
