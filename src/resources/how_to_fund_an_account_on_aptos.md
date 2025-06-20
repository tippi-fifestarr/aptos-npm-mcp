# How to Fund An Account On Aptos

If the dapp is configured to use the `devnet` network, run this function:

```
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const config = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(config);

await aptos.fundAccount({
    accountAddress: adminAccount.accountAddress,
    amount: 100_000_000,
  });
```

If the is configured to use the `testnet` network, you should use the online Aptos facuet that lives in https://aptos.dev/en/network/faucet

If the is configured to use the `mainnet` network, you should use dex/cex to gain real APT coins.
