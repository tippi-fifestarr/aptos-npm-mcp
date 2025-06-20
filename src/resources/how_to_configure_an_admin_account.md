# How to Configure An Admin Account

The admin account for a dapp on Aptos, is used to publish the Move contract to the Aptos configured chain. To setup an admin account you can either generate a new keypair and then store it in a secret place like `.env` file, or use an existing private key that is known to you.

### How to Generate a new Keypair for an admin account

1. Import the `Account` module from the '@aptos-labs/ts-sdk' package, and use it to generate a new keypair.

```
import { Account } from '@aptos-labs/ts-sdk';

const adminAccount = Account.generate();

return {privateKey: adminAccount.privateKey.toString(), accountAddress: adminAccount.accountAddress.toString()};
```

2. Store the private key and the account address

Store the generated private key and the account address in an `.env` file. If not already exists, create a new one and store it there.

3. Fund The Admin Account

See [How to Fund An Account On Aptos](./how_to_fund_an_account_on_aptos.md)

### How to Use a Known admin account

If you have your own admin account you would like to use, past its key pair information to the dapp `.env` file. Make sure the account is funded.
