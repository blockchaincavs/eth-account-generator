/**
 * @author cavs
 * @class AccountGenError
 * @description Base class for accout gen errors
 */
class AccountGenError extends Error  {

        /**
         * @description custom errors for ETH EOA Generator
         * @param {string} message 
         * @param {number | string} code 
         */
    constructor(message, code) {
        super(message);

        this.name = "AccountGenError";
        this.code = code || 0;

    }

}

/**
 * Custom Errors
 */
class DecryptError extends AccountGenError {};
class CreateWalletError extends AccountGenError {};

// common js exports
module.exports = {
    AccountGenError,
    DecryptError,
    CreateWalletError
}