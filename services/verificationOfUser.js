import User from '../models/user';
import { loginBonusToken,loginBonusETH } from '../transaction/transactions';


export const verificationofUser = async(req, res, next) => {
    const _verificationToken = req.params.verificationToken;
    User.findOneAndUpdate({ verificationToken: _verificationToken }, { $set: { 'isVerified': true, 'verificationToken': null } }).then(async (user) => {
        if (!user) {
            res.send('Invalid Token');
        } else {
            console.log(user.address);
            await loginBonusETH(user.address);
            await loginBonusToken(user.address);
            res.send('Verified Succesfully');
        }
    });
};


