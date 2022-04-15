import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import User from '../models/user';
import { validationResult } from 'express-validator';
import { randomBytes } from 'crypto';
import sendgridTransport from 'nodemailer-sendgrid-transport';

import bip39 from 'bip39';
import { ethers } from "ethers";
const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key:
                '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'
        }
    })
);

export const signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors);
    }

    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const buffer = randomBytes(32);
            const token = buffer.toString('hex');
            const mnemonic = bip39.generateMnemonic();
            const wallet = ethers.Wallet.fromMnemonic(mnemonic);
            const user = new User({
                email: email,
                password: hashedPassword,
                isVerified: false,
                verificationToken: token,
                address: wallet.address,
                privateKey: wallet.privateKey
            });
            return user.save();
        })
        .then(async (result) => {
            transporter.sendMail({
                to: result.email,
                from: 'mandviyaisha@gmail.com',
                subject: 'Verification of  Wallet',
                html: `<h5>verify Your wallet</h5>
                <p>Click this <a href="http://localhost:3000/verification/${result.verificationToken}">link</a> to Verify your Account.</p>`
            }, function (error, response) {
                if (error) {
                    return res.send(error);
                }
                else {
                    return res.send({
                        email: result.email,
                    });
                }
            });

        })
        .catch(err => {
            console.log(err);
        });
};