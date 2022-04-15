import {Router} from "express";
import * as transactionController from "../controllers/transaction";
import isAuth from "../middleware/is-auth";
const transactionRouter = Router();

transactionRouter.post("/sendToken",isAuth,transactionController.postSendTokens);

transactionRouter.get("/getTransactionDetails",isAuth,transactionController.getTransactionDetails);

export default transactionRouter;