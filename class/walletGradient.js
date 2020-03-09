// import { LegacyWallet } from './legacy-wallet';
import { HDSegwitP2SHWallet } from './hd-segwit-p2sh-wallet';
import { HDLegacyP2PKHWallet } from './hd-legacy-p2pkh-wallet';
import { WatchOnlyWallet } from './watch-only-wallet';
import { HDSegwitBech32Wallet } from './hd-segwit-bech32-wallet';

export default class WalletGradient {
  static hdSegwitP2SHWallet = ['#e4b99c', '#e08a50'];
  static hdSegwitBech32Wallet = ['#f19b7e', '#f43d00'];
  static watchOnlyWallet = ['#7d7d7d', '#4a4a4a'];
  static legacyWallet = ['#40fad1', '#15be98'];
  static hdLegacyP2PKHWallet = ['#e36dfa', '#bd10e0'];
  static defaultGradients = ['#aeed6a', '#8aea23'];
  static createWallet = ['#eef0f4', '#eef0f4'];

  static gradientsFor(type) {
    let gradient;
    switch (type) {
      case WatchOnlyWallet.type:
        gradient = WalletGradient.watchOnlyWallet;
        break;
      case HDLegacyP2PKHWallet.type:
        gradient = WalletGradient.hdLegacyP2PKHWallet;
        break;
      case HDSegwitP2SHWallet.type:
        gradient = WalletGradient.hdSegwitP2SHWallet;
        break;
      case HDSegwitBech32Wallet.type:
        gradient = WalletGradient.hdSegwitBech32Wallet;
        break;
      case 'CreateWallet':
        gradient = WalletGradient.createWallet;
        break;
      default:
        gradient = WalletGradient.defaultGradients;
        break;
    }
    return gradient;
  }

  static headerColorFor(type) {
    let gradient;
    switch (type) {
      case WatchOnlyWallet.type:
        gradient = WalletGradient.watchOnlyWallet;
        break;
      //case LegacyWallet.type:
      //  gradient = WalletGradient.legacyWallet;
      //  break;
      case HDLegacyP2PKHWallet.type:
        gradient = WalletGradient.hdLegacyP2PKHWallet;
        break;
      case HDSegwitP2SHWallet.type:
        gradient = WalletGradient.hdSegwitP2SHWallet;
        break;
      case HDSegwitBech32Wallet.type:
        gradient = WalletGradient.hdSegwitBech32Wallet;
        break;
      case 'CreateWallet':
        gradient = WalletGradient.createWallet;
        break;
      default:
        gradient = WalletGradient.defaultGradients;
        break;
    }
    return gradient[0];
  }
}
