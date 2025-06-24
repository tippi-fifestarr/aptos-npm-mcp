# How to Write a Move Smart Contract

The following doc outlines the best practices and guidelines to follow when writing a Move smart contract on the Aptos blockchain.

- Always use the `Aptos Move 2` syntax.
- Always use the latest Aptos standards such as - `Object`, `Aptos Fungible Asset (FA) Standard`, `Aptos Digital Asset (DA) Standard`
  - For any coin related implementation, use the `Aptos Fungible Asset (FA) Standard`
  - For any token related implementation, use the `Aptos Digital Asset (DA) Standard`
  - For any resource, that should be easily modified, use the Aptos `Object`
- Comments should use double slash
- Doc strings or constans definitions should use triple slash
