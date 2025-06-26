# How to Write a Move Smart Contract

The following doc outlines the best practices and guidelines to follow when writing a Move smart contract on the Aptos blockchain.

### Move syntax

- Always use the `Aptos Move 2` syntax.
- All comments (other than error code comments) should be using double slash comments (//)
- Always use the latest Aptos standards such as - `Object`, `Aptos Fungible Asset (FA) Standard`, `Aptos Digital Asset (DA) Standard`
  - For any coin related implementation, use the `Aptos Fungible Asset (FA) Standard`
  - For any token related implementation, use the `Aptos Digital Asset (DA) Standard`
  - For any resource, that should be easily modified, use the Aptos `Object`

### Error Codes

- Each error code must be documented with triple slash comments (///) above its definition
- Error messages should be clear and user-friendly with wide context on what the error is, as they are directly visible to end users
