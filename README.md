# Ethereum Account Generation
Allows the user to generate an etherum EOA offline and create an encrypted keystore file for the users private key. 12 or 24 word seed phrase configurabile with command line arguments.

## About
1. Generates an ethereum EOA.
2. Stores the wallet in an encrypted keystore file.
3. Command line argument at runtime determines 12/24 word seed phrase.
4. Prompts user for password input at runtime for mnumonic and keystore password.
5. Prints the public key to the console.
6. Default file path is keystore.json

## Usage
To install dependencies: `npm install`
To run: `node index.cjs --phraseSize <12/24> --filePath <fp>`
For Help and command line descriptions: `node index.cjs --help`

</br>

Run dev with args: `npm run dev -- --phraseSize <12/24> --filePath <fp>`

## Dependencies
Refer to package.json