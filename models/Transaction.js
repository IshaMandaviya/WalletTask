import mongoose from "mongoose";
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    amount: String,
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    txId: {
        type: Number,
        // required: true
    },
    txHash: {
        type: String,
        // required: true
    },
    txStatus: {
        type: Boolean,
        required: true
    }
});
export default mongoose.model("Transaction", transactionSchema);
