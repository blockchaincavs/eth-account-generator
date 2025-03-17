# Ethereum Account Generation
Allows the user to generate an etherum EOA offline and create an encrypted keystore file for the users private key. 12 or 24 word seed phrase configurabile with command line arguments.

## About
1. Generates an ethereum EOA.
2. Stores the wallet in an encrypted keystore file.
3. Command line argument at runtime determines 12/24 word seed phrase.
4. Command line argument at runtime determines mnumonic and keystore password.
5. Prints the public key to the console.

## Usage
To install dependencies: `npm install`
To run: `node index.js --phraseSize <12/24> --password <password> --filePath <fp>`
For Help and command line descriptions: `node index.js --help`

## Dependencies
Refer to package.json