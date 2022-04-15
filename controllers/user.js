
import { signup } from '../services/signup';
import { login } from '../services/login';
import { verificationofUser } from "../services/verificationOfUser";

export const postSignup = (req, res, next) => {
    signup(req, res, next);
}

export const postLogin = (req, res, next) => {
    login(req, res, next);
}

export const verificationOfUser = async (req, res, next) => {
    verificationofUser(req,res,next);
};


