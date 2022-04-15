
// import Web3 from 'web3';
// import pkg from '@ethereumjs/tx';
// const { Transaction } = pkg;
// import fs from 'fs';
//
// console.log(config.contractAddress)
// import TransactionSchema from '../models/Transaction';

// const web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));

// const tokenContract = new web3.eth.Contract(config.contractABI, config.contractAddress, { from: config.adminAddress });

// const sleep = (milliseconds) => {
//     return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

// const privateKey = Buffer.from(config.adminPrivateKey, 'hex');

// export const loginBonusETH = async function (toAddress) {
//     const count = await web3.eth.getTransactionCount(config.adminAddress);
//     const nounce = await web3.utils.toHex(count);
//     const gasPrice = await web3.utils.toHex(2 * 1e9);
//     const gasLimit = await web3.utils.toHex(53000);
//     const amount = await web3.utils.toHex(await web3.utils.toWei('0.2', 'ether'));
//     const pk = Buffer.from(config.adminPrivateKey, 'hex');
//     const rawTransaction = {
//         "from": config.adminAddress,
//         "gasPrice": gasPrice,
//         "gasLimit": gasLimit,
//         "to": toAddress,
//         "value": amount,
//         "nonce": nounce
//     }
//     console.log('raw tx for ETH initialized');
//     const transaction = Transaction.fromTxData(rawTransaction);
//     const signTx = transaction.sign(pk);
//     const tx = await web3.eth.sendSignedTransaction('0x' + signTx.serialize().toString('hex'));
// }

// export const loginBonusToken = async function (toAddress) {
//     const amount = await web3.utils.toWei('5000', 'ether');
//     await tokenContract.methods.transfer(toAddress, await web3.utils.toHex(amount))
//         .send({ from: config.adminAddress }, async function (error, txHash) {
//             if (error) {
//                 console.log('Error', error);
//                 return error;
//             }
//             console.log('tx Submitted with', txHash);
//             let txReceipt = null;
//             while (txReceipt == null) {
//                 txReceipt = await web3.eth.getTransactionReceipt(txHash);
//                 await sleep(11000);
//             }
//             console.log('got Transaction Receipt', txReceipt);
//             const tx = new TransactionSchema({
//                 amount: 5000,
//                 sender: config.adminAddress,
//                 receiver: toAddress,
//                 txHash: txHash,
//                 txStatus: true
//             });
//             tx.save();
//         });
// }

// export const transferTokens = async function (fromAddress, fromPrivateKey, sendAmount, toAddress) {
//     const count = await web3.eth.getTransactionCount(fromAddress);
//     const nounce = await web3.utils.toHex(count);
//     const gasPrice = await web3.utils.toHex(2 * 1e9);
//     const gasLimit = await web3.utils.toHex(53000);
//     const amount = await web3.utils.toWei(sendAmount, 'ether');
//     const ethBal = await web3.utils.fromWei(await web3.eth.getBalance(fromAddress), 'ether');
//     fromPrivateKey = fromPrivateKey.split('0x')[1];
//     const fromPK = Buffer.from(fromPrivateKey, 'hex');
//     const data = tokenContract.methods.transfer(toAddress, amount).encodeABI();
//     const rawTransaction = {
//         "from": config.ownerAddress,
//         "gasPrice": gasPrice,
//         "gasLimit": gasLimit,
//         "to": config.contractAddress,
//         "value": "0x0",
//         "data": data,
//         "nonce": nounce
//     }
//     const transaction = Transaction.fromTxData(rawTransaction);
//     const signTx = transaction.sign(fromPK);
//     const txReceipt = await web3.eth.sendSignedTransaction('0x' + signTx.serialize().toString('hex'));
//     return txReceipt.transactionHash;
// };