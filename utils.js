const { HDNodeWallet } = require("ethers");
const { ethers, toUtf8Bytes } = require("ethers");
const { readFile, writeFile } = require('fs').promises;
const yargs = require('yargs');

/**
 * Generate a wallet with a 12 word seed phrase.
 * Encrypts keystore file
 * @param {string} password used with mn to generate private key
 * @param {string} filePath Location to store keystore file
 */
async function createWallet12(password, filePath="./keystore.json") {
    
    try {
        const hdNodeWallet = ethers.HDNodeWallet.createRandom(password);
        const publicKey = await hdNodeWallet.getAddress();
     
        console.log("Public Key:", publicKey)

        const keystore = await hdNodeWallet.encrypt(toUtf8Bytes(password));
        await writeFile(filePath, keystore);
        console.log("Successfully saved encrypted keystore to:", filePath);

        /* WARNING: WILL PRINT SENSITIVE INFORMATION TO THE CONSOLE! */
        // console.log("Private Key:", hdNodeWallet.privateKey);
        // console.log("Seed Phrase:", hdNodeWallet.mnemonic);

    } catch (error) {

        console.error("Failed to create EOA:", error);
    }

}

/**
 * Generate a wallet with a 24 word seed phrase
 * Encrypts keystore file
 * @param {string} password used with seed to generate private key
 * @param {string} filePath Location to store keystore file
 */
async function createWallet24(password, filePath="./keystore.json") {

    try {

        // Generate 32 bytes of random entropy (for 24 words) 
        const entropy = ethers.randomBytes(32);

        // Generate a mnemonic (seed phrase) from the entropy
        const mnemonic = ethers.Mnemonic.fromEntropy(entropy, password);

        // Create an HD node wallet from the mnemonic
        const hdNodeWallet = ethers.HDNodeWallet.fromMnemonic(mnemonic);
        const publicKey = await hdNodeWallet.getAddress();

        console.log("Public Key:", publicKey);

        const keystore = await hdNodeWallet.encrypt(toUtf8Bytes(password));
        await writeFile(filePath, keystore);
        console.log("Successfully saved encrypted keystore to:", filePath);

        /* WARNING: WILL PRINT SENSITIVE INFORMATION TO THE CONSOLE! */
        // console.log("Private Key:", hdNodeWallet.privateKey);
        // console.log("Seed Phrase:", mnemonic);

    } catch (error) {
        console.error("Failed to create EOA:", error);
    }
    
}

/**
 * This function decripts the keystore file
 * @param {string} filePath json string
 * @param {string} password to unlock keystore
 * @returns {Promise<ethers.Wallet>} decrypted wallet
 */
async function decryptWallet(filePath, password) {
        
    try {
        const keystore = await readFile(filePath, 'utf8');
        const decryptedWallet = await ethers.Wallet.fromEncryptedJson(keystore, toUtf8Bytes(password));
        console.log("Keystore wallet public key:", decryptedWallet.address)
        
        return decryptedWallet;

    } catch (error) {
        console.error("Failed to decrypt wallet from keystore file", error);
    }
    
}

const args = yargs
    .usage('Usage: $0 --phraseSize <phraseSize> --password <pass> --filePath <filePath>')
    .option('phraseSize', {
        alias: 'size',
        description: 'Seed phrase size. 12 or 24 words.',
        type: 'number',
    })
    .option('password', {
        alias: 'ps',
        description: 'This Password is used with the seed to generate private key and the encrypted keystore generated',
        type: 'string',
    })
    .option('filePath', {
        alias: 'fp',
        description: 'File destination for encrypted keystore. Default ./keystore.json',
        type: 'string',
    })
    .example('$0 --phraseSize 12 --password HelloWorld123! --filePath ./keystore.json') // Example usage
    .argv;

module.exports = {createWallet12, createWallet24, decryptWallet, args};