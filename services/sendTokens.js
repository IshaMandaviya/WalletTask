import jwt_decode from 'jwt-decode';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import User from "../models/user";
import Transaction from "../models/Transaction";
import { transferTokens } from '../transaction/transactions';
const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key:
                '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'
        }
    })
);

export const sendTokens = async (req, res, next) => {
    const { _receiver, _amount } = req.body;
    if (!_receiver || !_amount) {
        return res.status(400).send('Please provide the details');
    }
    const token = req.headers.authorization;
    const decode = jwt_decode(token)
    const _sender = decode.address;
    const fromUser = await User.findOne({ address: _sender }).then(fromUser => {
        if (!fromUser) {
            return res.json({ error: "From user address is not register" });
        }
        else {
            return fromUser;
        }
    });
    const toUser = await User.findOne({ address: _receiver }).then(toUser => {
        if (!toUser) {
            return res.json({ error: "Receiver user is not register" });
        }
        else {
            return toUser;
        }
    });
    if (fromUser.balance < _amount) {
        transporter.sendMail({
            to: fromUser.email,
            from: 'mandviyaisha@gmail.com',
            subject: 'Transaction Faild',
            html: `<h1>Transaction Faild</h1>
                <p>Insufficient funds in your wallet</p>`
        }, function (error, response) {
            if (error) {
                return res.send(error);
            }
            else {
                return res.send({
                    status: "Transaction Faild! Insufficient funds in your wallet",
                });
            }
        });
    } else {
        const txHash = await transferTokens(_sender, fromUser.privateKey, _amount, _receiver);
        const transaction = new Transaction({
            amount: _amount,
            sender: _sender,
            receiver: _receiver,
            txHash: txHash,
            txStatus: true
        })
        await transaction.save();
        await User.findOneAndUpdate({ address: _sender }, { $inc: { balance: -_amount } });
        await User.findOneAndUpdate({ address: _receiver }, { $inc: { balance: _amount } });
        transporter.sendMail({
            to: fromUser.email,
            from: 'mandviyaisha@gmail.com',
            subject: 'Transaction successFul',
            html: `<h1>Transaction successFul</h1>
                <p>Your transaction was successful!</p>`
        }, function (error, response) {
            if (error) {
                return res.send(error);
            }
        });
        transporter.sendMail({
            to: toUser.email,
            from: 'mandviyaisha@gmail.com',
            subject: 'Transaction successFul',
            html: `<h1>Transaction successFul</h1>
                <p>Your transaction was successful!</p>`
        }, function (error, response) {
            if (error) {
                return res.send(error);
            }
            else {
                return res.send({
                    status: "Transaction successFul",
                });
            }
        });
    }
}

