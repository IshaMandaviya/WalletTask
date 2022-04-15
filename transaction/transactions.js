import { ethers } from "ethers";
import config from '../config.json';
import pkg from '@ethereumjs/tx';
const { Transaction } = pkg;
const provider = new ethers.providers.JsonRpcProvider(config.web3Provider);
const signer = provider.getSigner();
const erc20 = new ethers.Contract(config.contractAddress, config.contractABI, provider);
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const privateKey = Buffer.from(config.adminPrivateKey, 'hex');
var wallet = new ethers.Wallet(config.adminPrivateKey, provider);
var tokenContract = new ethers.Contract(config.contractAddress, config.contractABI, wallet);


export const loginBonusETH = async function (toAddress) {
    const txCount = await provider.getTransactionCount(config.adminAddress);
    let amountInEther = '0.01'
    let tx = {
        to: toAddress,
        value: ethers.utils.parseEther(amountInEther),
        nonce: ethers.utils.hexlify(txCount)
    }
    wallet.sendTransaction(tx)
        .then((txObj) => {
            console.log('txHash', txObj.hash)

        })

}

export const loginBonusToken = async function (toAddress) {
    await sleep(11000);
    const txCount = await provider.getTransactionCount(config.adminAddress);
    var sendPromise = tokenContract.transfer(toAddress, 5000);

    sendPromise.then(function (transaction) {
        console.log(transaction);
    });

}

export const transferTokens = async function (fromAddress, fromPrivateKey, sendAmount, toAddress) {
    await sleep(11000);
    var userWallet = new ethers.Wallet(fromPrivateKey, provider);
    var tokenContract = new ethers.Contract(config.contractAddress, config.contractABI, userWallet);
    var sendPromise =  tokenContract.transfer(toAddress, sendAmount);
    sendPromise.then(function (transaction) {
        console.log(transaction);
    });
    

}

