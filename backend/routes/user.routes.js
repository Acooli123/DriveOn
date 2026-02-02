import express from 'express';
import pkg from "express-validator";
const { body } = pkg;

import { authUser } from '../middlewares/auth.middileware.js';
import { getProfile, registerUser, loginUser } from '../controllers/user.controllers.js';
import BlacklistToken from "../models/blacklistToken.model.js";

//import blacklistTokenModel from '../models/blacklistToken.model.js';
const router = express.Router();

/* Test route */
router.get("/", (req, res) => {
  res.json({ message: "Users route working" });
});

/* Register user */
router.post('/register',
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').optional().isLength({min:3}).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    registerUser
);

/* Login user */
router.post('/login',
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    loginUser
);

router.get('/profile', authUser, getProfile);

/* Logout user - to be implemented */

router.get("/logout", authUser, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).json({ message: "No token" });

    await BlacklistToken.create({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: err.message });
  }
});


export default router;