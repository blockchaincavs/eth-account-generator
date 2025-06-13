
const { 
    createWallet12, createWallet24, 
    args, decryptWallet, promptPassword
} = require("./utils.cjs");

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

    try {

        let wallet;
        // create wallet
        if (PHRASE_SIZE == 12) {

            wallet =  await createWallet12(password, FILE_PATH);

        } else if (PHRASE_SIZE == 24) {

            wallet = await createWallet24(password, FILE_PATH);

        }
        const ethAddress = wallet.address;
        console.log("Public Key:", ethAddress);
        
        /* WARNING: WILL PRINT SENSITIVE INFORMATION TO THE CONSOLE! */
        // console.log("Private Key:", wallet.privateKey);
        // console.log("Seed Phrase:", wallet.mnemonic);

    } catch (error) {

        console.error("Failed to create EOA:", error);
    }

}

main();

/* Decrypt keystore */
// decryptWallet("./keystore.json", PASSWORD)
//     .then(wallet => {
//         console.log("Keystore wallet address:", wallet.address);
//     });