import express, { json } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import userRouter from './routes/user.js';
import transactionRouter from "./routes/transaction.js";

config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(json());
app.use(userRouter);
app.use(transactionRouter);



mongoose
    .connect(process.env.MONGO_DB)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });