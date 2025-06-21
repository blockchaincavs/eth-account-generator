
const utils = require('../utils.cjs');
const { readFileSync } = require('fs');
const { DecryptError, CreateWalletError } = require("../errors.cjs")

const PASSWORD = "Test123!";
const FIILE_PATH = "./keystore.json"

beforeEach( () => {
  // initiialize wallet before each test
  
});

describe('Test create wallets', () => {
  test('Encrypted wallet 12 word mnumonic and decrypted wallet addresses match ', async () => {
    const wallet = await utils.createWallet12(PASSWORD, FIILE_PATH);
    const decryptedWallet = await utils.decryptWallet(FIILE_PATH, PASSWORD);
    
    expect(wallet.address).toEqual(decryptedWallet.address);
  });

  test('Encrypted wallet 12 word mnumonic and decrypted wallet addresses match', async () => {

    const wallet = await utils.createWallet24(PASSWORD, FIILE_PATH);
    const decryptedWallet = await utils.decryptWallet(FIILE_PATH, PASSWORD);

    expect(wallet.address).toBe(decryptedWallet.address);
  })
 
});

describe('test create wallet errors', () => {
  test('Decrypt wallet wrong password', async function() {
    try {
      await utils.decryptWallet(FIILE_PATH, 'abc');
    } catch(error) {
      expect(error instanceof DecryptError).toBe(true); // expects any error
    }
  });

  test('Create wallet 24 word seed throws CreateWalletError', async () => {
    await utils.createWallet24(8).catch( (err) => {
      expect(err instanceof CreateWalletError).toBe(true);
    });
    
  });

  test('Create wallet 12 word seed throws CreateWalletError', async () => {
    await utils.createWallet12([1]).catch( (err) => {
      expect(err.message).toEqual("Failed to create Wallet with 12 word seed phrase: invalid string value" );
    })
  });

});

