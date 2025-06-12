
const utils = require('../utils');
const { readFileSync } = require('fs');

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

describe('test wallet wrong password', () => {
  test('throws error', function() {
    const checkWalletError = async () => await utils.decryptWallet(FIILE_PATH, 'abc');
    expect(checkWalletError).rejects.toThrow(); // expects any error
  })
});

