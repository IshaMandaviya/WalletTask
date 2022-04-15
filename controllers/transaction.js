import { transactionDetails } from '../services/getDetails';
import { sendTokens } from '../services/sendTokens';

export const postSendTokens = async (req, res, next) => {
    sendTokens(req,res,next);
}

export const getTransactionDetails = async (req, res, next) => {
    transactionDetails(req,res,next);
}