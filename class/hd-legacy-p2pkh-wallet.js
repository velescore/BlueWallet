import { AbstractHDWallet } from './abstract-hd-wallet';
import Frisbee from 'frisbee';
import { NativeModules } from 'react-native';
import bip39 from 'bip39';
import BigNumber from 'bignumber.js';
import b58 from 'bs58check';
import signer from '../models/signer';
import { BitcoinUnit } from '../models/bitcoinUnits';
const bitcoin = require('bitcoinjs-lib');
const HDNode = require('bip32');
const BlueElectrum = require('../BlueElectrum');

const { RNRandomBytes } = NativeModules;
/**
 * HD Wallet (BIP39).
 * In particular, BIP44 (P2PKH legacy addressess)
 * @see https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
 */
export class HDLegacyP2PKHWallet extends AbstractHDWallet {
  static type = 'HDlegacyP2PKH';
  static typeReadable = 'HD Legacy (BIP44 P2PKH)';

  allowSend() {
    return true;
  }

  getXpub() {
    if (this._xpub) {
      return this._xpub; // cache hit
    }
    const mnemonic = this.secret;
    const seed = bip39.mnemonicToSeed(mnemonic);
    const root = bitcoin.bip32.fromSeed(seed);

    const path = "m/44'/0'/0'";
    const child = root.derivePath(path).neutered();
    this._xpub = child.toBase58();
    return this._xpub;
  }

  _getExternalWIFByIndex(index) {
    return this._getWIFByIndex(false, index);
  }

  _getInternalWIFByIndex(index) {
    return this._getWIFByIndex(true, index);
  }

  /**
   * Get internal/external WIF by wallet index
   * @param {Boolean} internal
   * @param {Number} index
   * @returns {*}
   * @private
   */
  _getWIFByIndex(index) {
    const mnemonic = this.secret;
    const seed = bip39.mnemonicToSeed(mnemonic);

    const root = HDNode.fromSeed(seed);
    const path = `m/44'/0'/0'/0/${index}`;
    const child = root.derivePath(path);

    return child.toWIF();
  }

  async generate() {
    let that = this;
    return new Promise(function(resolve) {
      if (typeof RNRandomBytes === 'undefined') {
        // CLI/CI environment
        // crypto should be provided globally by test launcher
        return crypto.randomBytes(32, (err, buf) => { // eslint-disable-line
          if (err) throw err;
          that.setSecret(bip39.entropyToMnemonic(buf.toString('hex')));
          resolve();
        });
      }

      // RN environment
      RNRandomBytes.randomBytes(32, (err, bytes) => {
        if (err) throw new Error(err);
        let b = Buffer.from(bytes, 'base64').toString('hex');
        that.setSecret(bip39.entropyToMnemonic(b));
        resolve();
      });
    });
  }

  generateAddresses() {
    let node = bitcoin.bip32.fromBase58(this.getXpub());;
    for (let index = 0; index <this.num_addresses; index++) {
      let address = bitcoin.payments.p2pkh({
        pubkey: node.derive(0).derive(index).publicKey,
      }).address;
      this._address.push(address);
      this._address_to_wif_cache[address] = this._getWIFByIndex(index);
      this._addr_balances[address] = {
        total: 0,
        c: 0,
        u: 0,
      };
    }
    console.warn(this._address);
  }

  createTx(utxos, amount, fee, address) {
    for (let utxo of utxos) {
      utxo.wif = this._getWifForAddress(utxo.address);
    }


    let amountPlusFee = parseFloat(new BigNumber(amount).plus(fee).toString(10));

    if (amount === BitcoinUnit.MAX) {
      amountPlusFee = new BigNumber(0);
      for (let utxo of utxos) {
        amountPlusFee = amountPlusFee.plus(utxo.value);
      }
      amountPlusFee = amountPlusFee.dividedBy(100000000).toString(10);
    }

    return signer.createHDTransaction(
      utxos,
      address,
      amountPlusFee,
      fee,
      this.getAddressForTransaction(),
    );
  }
}
