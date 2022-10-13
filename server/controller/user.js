import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import verifyUser from "../models/valideUser.js";
import { sendEmail } from "../Utils/nodemailer.js";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, role: existingUser.role }, process.env.JWT, { expiresIn: '1d' });
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
        const result = { role: existingUser.role, _id: existingUser._id, selectedFile: existingUser.selectedFile, userName: existingUser.name }
        existingUser.role === 1 ? res.status(200).json({ data: result, token, message: `Welcome Admin, ${existingUser.name.split(" ")[0]}` }) : res.status(200).json({ data: result, token, message: `Welcome Back, ${existingUser.name.split(" ")[0]}` });
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
            token: jwt.sign({ email: existingUser.email, id: existingUser._id, role: existingUser.role }, process.env.JWT, { expiresIn: '1d' }),
        }).save();
        const url = `${process.env.BASE_URL}user/${existingUser._id}/verify/${createVerify.token}`;
        const { status } = await sendEmail(existingUser.email, "Verify Email from Shoes Store", url);
        if (status < 400) {
            res.status(200).json({ message: "User registered successfully. Please verify your email" });
        } else {
            console.log(`Create Gmail account and allow less secure apps: https://myaccount.google.com/lesssecureapps then add your credentials to .env file in root folder`);
            console.log('Example: EMAIL_PORT=587, PASS=yourpassword, USER=yourgmailname');
            console.log(`Or Watch this video to create Gmail Verification: https://www.youtube.com/watch?v=0E1MM3tBqRo&list=PLJ3uCOeGaRaKKNzSJKb1RD5-mO9mQ1qKD&index=2`);
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
        const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT, { expiresIn: '1d' });
        const data = { role: user.role, _id: user._id, selectedFile: user.selectedFile, userName: user.name }
        user.role === 1 ? res.status(200).json({ data: data, token, message: `Welcome Admin, ${user.name.split(" ")[0]}`, verifyMessage: " Email Verified" }) : res.status(200).json({ data: data, token, message: `Welcome Back, ${user.name.split(" ")[0]}`, verifyMessage: " Email Verified" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};