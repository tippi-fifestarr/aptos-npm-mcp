# How to Integrate the Fungible Asset Standard

- Follow the documentation on the [aptos.dev](https://aptos.dev/en/build/smart-contracts/fungible-asset) to understand what is the Fungible Asset Standard
- Check out these examples in the Aptos ts-sdk, on how to interact with the Fungible Asset Standard
  - https://github.com/aptos-labs/aptos-ts-sdk/blob/main/src/api/fungibleAsset.ts
  - https://github.com/aptos-labs/aptos-ts-sdk/blob/main/examples/typescript/your_fungible_asset.ts
  - https://github.com/aptos-labs/aptos-ts-sdk/blob/main/examples/typescript/transfer_between_fungible_stores.ts

### Known fungible asset addresses

- APT
  - Mainnet `0x000000000000000000000000000000000000000000000000000000000000000a`
  - Testnet `0x000000000000000000000000000000000000000000000000000000000000000a`
- USDC
  - Mainnet `0xbae207659db88bea0cbead6da0ed00aac12edcdda169e591cd41c94180b46f3b`
  - Testnet `0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832`
- USDT
  - Mainnet `0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b`
  - Testnet `0x357b0b74bc833e95a115ad22604854d6b0fca151cecd94111770e5d6ffc9dc2b`

### How to query for a fungible asset balance with the Aptos ts-sdk

```ts
const data = await aptos.getCurrentFungibleAssetBalances({
  options: {
    where: {
      owner_address: { _eq: accountAddress },
      asset_type: { _eq: assetTypeAddress },
    },
  },
});

return data[0]?.amount ?? 0;
```

### How to transfer a fungible asset balance with the Aptos ts-sdk

```ts
const transaction: InputTransactionData = {
  data: {
    function: "0x1::primary_fungible_store::transfer",
    typeArguments: ["0x1::fungible_asset::Metadata"],
    functionArguments: [fungibleAssetMetadataAddress, recipient, amount],
  },
};

const response = await signAndSubmitTransaction(transaction);

// always wait for transaction
try {
  await aptos.waitForTransaction({ transactionHash: response.hash });
} catch (error) {
  console.error(error);
}
```
