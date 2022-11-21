import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import verifyUser from "../models/valideUser.js";
import { sendEmail } from "../Utils/nodemailer.js";
import Product from '../models/productModel.js';

const generateToken = (data) => {
    const { _id, email, name, role, wishlist, number, address, verifiedUser, cart } = data;
    return jwt.sign({ _id, email, name, role, wishlist, number, address, verifiedUser, cart }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });
        const token = generateToken(existingUser);
        if (!existingUser?.verifiedUser) {
            let checkVerify = await verifyUser.findOne({ userId: existingUser._id });
            if (!checkVerify) {
                checkVerify = await new verifyUser({
                    userId: existingUser._id,
                    token: token,
                }).save();
                const url = `${process.env.BASE_URL}user/${existingUser._id}/verify/${checkVerify.token}`;
                sendEmail(existingUser.email, "Verify Email from Shoes Store", url);
                return res.status(355).json({ message: 'Please verify your email' });
            }
            return res
                .status(355)
                .send({ message: "Verify link has already been sent to your email" });
        }
        existingUser.role === 1 ? res.status(200).json({ token, message: `Welcome Admin, ${existingUser.name.split(" ")[0]}` }) : res.status(200).json({ token, message: `Welcome Back, ${existingUser.name.split(" ")[0]}` });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, number, lastName, role, address } = req.body;
    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists." });
        if (firstName === "" || lastName === "" || email === "" || password === "") {
            return res.status(400).json({ message: "Please fill all the fields" });
        } else if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters long" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        existingUser = await new User({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
            number,
            role,
            address
        }).save();
        const createVerify = await new verifyUser({
            userId: existingUser._id,
            token: generateToken(existingUser),
        }).save();
        const url = `${process.env.BASE_URL}user/${existingUser._id}/verify/${createVerify.token}`;
        const { status } = await sendEmail(existingUser.email, "Verify Email from Shoes Store", url);
        if (status < 400) {
            res.status(200).json({ message: "User registered successfully. Please verify your email" });
        } else {
            res.status(355).json({ message: "email verification fail check your terminal you got error message" });
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
};

export const getVerified = async (req, res) => {
    const { userId, verifyId } = req.params;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) return res.status(404).json({ message: "User not found" });
        const Verified = await verifyUser.findOne({
            userId: user._id,
            token: verifyId,
        });
        if (!Verified) return res.status(404).json({ message: "Invalid verification link" });
        await User.updateOne({ _id: user._id }, { verifiedUser: true });
        await Verified.remove();
        const token = generateToken(user);
        user.role === 1 ? res.status(200).json({ token, message: `Welcome Admin, ${user.name.split(" ")[0]}`, verifyMessage: " Email Verified" }) : res.status(200).json({ token, message: `Welcome Back, ${user.name.split(" ")[0]}`, verifyMessage: " Email Verified" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const addWishlist = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        const checkWishlist = user.wishlist.find((item) => item === id);
        if (checkWishlist) {
            return res.status(400).json({ data: user.wishlist, message: "Product already in wishlist" });
        } else {
            user.wishlist.push(id);
            await user.save();
            const token = generateToken(user);
            res.status(200).json({ token, data: user.wishlist, message: "Product added to wishlist" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeWishlist = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        const checkWishlist = user.wishlist.find((item) => item === id);
        if (!checkWishlist) {
            return res.status(400).json({ data: user.wishlist, message: "Product not in wishlist" });
        }
        user.wishlist = user.wishlist.filter((item) => item !== id);
        await user.save();
        const token = generateToken(user);
        res.status(200).json({ token, data: user.wishlist, message: "Product removed from wishlist" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        const products = await Product.find({ _id: { $in: user.wishlist } });
        const token = generateToken(user);
        res.status(200).json({ token, data: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
