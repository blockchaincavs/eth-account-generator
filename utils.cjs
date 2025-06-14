// const { HDNodeWallet } = require("ethers");
const { ethers, toUtf8Bytes } = require("ethers");
const { readFile, writeFile } = require('fs').promises;
const yargs = require('yargs');
const inquirer = require('inquirer');
const { Wallet } = require("ethers");

/**
 * Generate a wallet with a 12 word seed phrase. Encrypts keystore file
 * @param {string} password used with mn to generate private key
 * @param {string} filePath Location to store keystore file
 * @returns {Promise<ethers.HDNodeWallet>} wallet that was encrypted
 */
async function createWallet12(password, filePath="./keystore.json") {
    
    const hdNodeWallet = ethers.HDNodeWallet.createRandom(password);
    const ethAddress = await hdNodeWallet.getAddress();

    const keystore = await hdNodeWallet.encrypt(toUtf8Bytes(password));
    await writeFile(filePath, keystore);
    console.log("Successfully saved encrypted keystore to:", filePath);

    /* WARNING: WILL PRINT SENSITIVE INFORMATION TO THE CONSOLE! */
    // console.log("Private Key:", hdNodeWallet.privateKey);
    // console.log("Seed Phrase:", hdNodeWallet.mnemonic);

    return hdNodeWallet;
}

/**
 * @description 
 * Generate a wallet with a 24 word seed phrase. Encrypts keystore file
 * 
 * @param {string} password used with seed to generate private key
 * @param {string} filePath Location to store keystore file
 * @returns {Promise<ethers.HDNodeWallet>} wallet that was encrypted
 */
async function createWallet24(password, filePath="./keystore.json") {

    // Generate 32 bytes of random entropy (for 24 words) 
    const entropy = ethers.randomBytes(32);

    // Generate a mnemonic (seed phrase) from the entropy
    const mnemonic = ethers.Mnemonic.fromEntropy(entropy, password);

    // Create an HD node wallet from the mnemonic
    const hdNodeWallet = ethers.HDNodeWallet.fromMnemonic(mnemonic);
    const ethAddress = await hdNodeWallet.getAddress();

    const keystore = await hdNodeWallet.encrypt(toUtf8Bytes(password));
    await writeFile(filePath, keystore);
    console.log("Successfully saved encrypted keystore to:", filePath);

    /* WARNING: WILL PRINT SENSITIVE INFORMATION TO THE CONSOLE! */
    // console.log("Private Key:", hdNodeWallet.privateKey);
    // console.log("Seed Phrase:", mnemonic);

    return hdNodeWallet;
    
}

/**
 * This function decripts the keystore file
 * @param {string} filePath json string
 * @param {string} password to unlock keystore
 * @returns {Promise<ethers.Wallet>} decrypted wallet
 */
async function decryptWallet(filePath, password) {
        
    const keystore = await readFile(filePath, 'utf8');
    const decryptedWallet = await ethers.Wallet.fromEncryptedJson(keystore, toUtf8Bytes(password));

    return decryptedWallet;

}

const args = yargs
    .usage('Usage: $0 --phraseSize <phraseSize> --password <pass> --filePath <filePath>')
    .option('phraseSize', {
        alias: 'size',
        description: 'Seed phrase size. 12 or 24 words.',
        type: 'number',
    })
    .option('filePath', {
        alias: 'fp',
        description: 'File destination for encrypted keystore. Default ./keystore.json',
        type: 'string',
    })
    .example('$0 --phraseSize 12 --filePath ./keystore.json') // Example usage
    .argv;


async function promptPassword() {

    const answers = await inquirer.prompt([
        {
        type: 'password',
        name: 'password',
        message: 'Enter your password for encrypted keystore:',
        mask: '*',
        },
    ]);

    return answers.password;
}
module.exports = {
    createWallet12, 
    createWallet24, 
    decryptWallet, 
    args,
    promptPassword
};