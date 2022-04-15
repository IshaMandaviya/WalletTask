import Transaction from "../models/Transaction";

export const transactionDetails = async (req, res, next) => {
    if (req.user.isAdmin) {
        const tx = Transaction.find().then(tx => {
            if (!tx) {
                return [];
            }
            return res.json({"data":tx});
        });
        
    } else {
        const tx = Transaction.find({ $or: [{ 'sender': req.user.address }, { 'receiver': req.user.address }] }).then(tx => {
            if (!tx) {
                return [];
            }
            return res.json({"data":tx});
        });
        
    }
}