import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config.json';
import userRouter from './routes/user';
app.use(bodyParser.urlencoded({ extended: false }));


app.use(userRouter);



mongoose
    .connect(config.mongodbUrl)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });