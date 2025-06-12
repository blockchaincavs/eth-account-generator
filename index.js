
const { 
    createWallet12, createWallet24, 
    args, decryptWallet, promptPassword
} = require("./utils.js");

// Command line arguments passed to this script
const PHRASE_SIZE = args.phraseSize || 12;
const FILE_PATH = args.filePath || "./keystore.json";

async function main() {

    const password = await promptPassword();

    // Exit script if no password was provided
    if (password == undefined) {
        console.error("Failed to create wallet. Please provide a password to encrypt the wallet keystore. node index.js --help for more info.");
        process.exit(0);
    }

    // create wallet
    if (PHRASE_SIZE == 12) {

        createWallet12(password, FILE_PATH);

    } else if (PHRASE_SIZE == 24) {

        createWallet24(password, FILE_PATH);

    }
}

main();

/* Decrypt keystore */
// decryptWallet("./keystore.json", PASSWORD)
//     .then(wallet => {
//         console.log(wallet.address);
//     });