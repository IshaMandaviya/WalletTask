import { Router } from 'express';
import * as userController from '../controllers/user';
import { check, body } from 'express-validator';
import User from '../models/user';
const userRouter = Router();

userRouter.post("/signup", [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject(
                        'E-Mail exists already, please pick a different one.'
                    );
                }
            });
        })
        .normalizeEmail(),
    body(
        'password',
        'Please enter a password at least 5 characters.'
    )
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim(),
    body('cpassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords have to match!');
            }
            return true;
        })
], userController.postSignup);

userRouter.get("/verification/:verificationToken", userController.verificationOfUser);

userRouter.post("/login", [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .normalizeEmail(),
    body(
        'password',
        'Password should be valid'
    )
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
], userController.postLogin);

export default userRouter;