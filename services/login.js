import bcrypt from 'bcryptjs';
import User from '../models/user';
import { validationResult } from 'express-validator';
import pkgg from 'jsonwebtoken';
const { sign } = pkgg;

export const login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors);
    }
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "User does not exist with this email" });
            }
            bcrypt
                .compare(password, user.password)
                .then(async doMatch => {
                    if (doMatch) {
                        if (user.isVerified) {
                            const Token = sign({
                                userId: user._id.toString(),
                                address: user.address,

                            }, process.env.SECRET, { expiresIn: "1h" });

                            return res.status(200).json({ userId: user._id, email: user.email, address: user.address, Token });
                        }
                        return res.status(422).json({ error: "Please Verify your Account." });
                    }
                    return res.status(422).json({ error: "Invalid  password." });
                })
                .catch(err => {
                    res.send(err);
                });
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
};