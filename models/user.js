import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from "mongoose-unique-validator";
import pkgg from "validator";
const { isEmail } = pkgg;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 200,
        validate: [isEmail, "Enter valid Email"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 300
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    balance: {
        type: Number,
        default: 100
    },
    address: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    verificationToken: String,
});
export default mongoose.model("User", userSchema);
userSchema.plugin(uniqueValidator);
