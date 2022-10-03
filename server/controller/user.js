import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import verifyUser from "../models/valideUser.js";
import { sendEmail } from "../Utils/nodemailer.js";
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users, msg: 'All Users' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // finding exisiting old user
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(404).json({ message: 'Password Incorrect' });
        if (!existingUser.verifiedUser) {
            let token = await verifyUser.findOne({ userId: existingUser._id });
            if (!token) {
                token = await new verifyUser({
                    userId: existingUser._id,
                    token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                }).save();
                const url = `${process.env.BASE_URL}user/${existingUser._id}/verify/${token.token}`;
                sendEmail(existingUser.email, "Verify Email", url);
                return res.status(355).json({ message: 'Please verify your email' });
            }
            return res
                .status(355)
                .send({ message: "Please verify your email" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, role: existingUser.role }, process.env.JWT, { expiresIn: '1d' });
        if (existingUser.role === 1) {
            res.status(200).json({ result: { role: existingUser.role, _id: existingUser._id, cart: existingUser.cart, selectedFile: existingUser.selectedFile }, token, message: `Welcome Admin, ${existingUser.name.split(" ")[0]}` });
        } else {
            res.status(200).json({ result: { role: existingUser.role, _id: existingUser._id, cart: existingUser.cart, selectedFile: existingUser.selectedFile }, token, message: `Welcome Back!, ${existingUser.name.split(" ")[0]}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const signup = async (req, res) => {
    // adding user to the database
    const { email, password, firstName, number, lastName, role, selectedFile, confirmPassword, address } = req.body;
    try {
        let existingUser = await User.findOne({ email });
        // if user is already exist
        if (existingUser) return res.status(404).json({ message: 'User already exist' });

        if (firstName.length < 3 || firstName.length > 10) return res.status(404).json({ message: 'Firstname required 3 to 10 char' });

        if (lastName.length < 3 || lastName.length > 10) return res.status(404).json({ message: 'Lastname required 3 to 10 char' });

        if (password.length < 8 || password.length > 40) return res.status(404).json({ message: 'Password required 8 to 40 char' });

        if (password !== confirmPassword) return res.status(404).json({ message: 'Password dont match' })
        // phone number validation
        if (number.length < 10 || number.length > 10) return res.status(404).json({ message: 'Phone number must be 10 digits' });
        // address validation
        if (address.length < 3 || address.length > 20) return res.status(404).json({ message: 'Address required 3 to 20 char' });
        // selectedFile validation
        if (selectedFile === null) return res.status(404).json({ message: 'Profile Pic is Required' });

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashPassword, number, name: `${firstName} ${lastName}`, role, selectedFile, number, address });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT, { expiresIn: '1d' });
        if (!token.verifiedUser) {
            const Verified = await new verifyUser({
                userId: result._id,
                token: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            }).save();
            const url = `${process.env.BASE_URL}user/${result._id}/verify/${Verified.token}`;
            sendEmail(result.email, "Verify Email", url);
            res.status(355).json({ result, token, message: "Please verify your email" });
        } else {

            res.status(200).json({ token, result: { role: result.role, _id: result._id, cart: result.cart, selectedFile: result.selectedFile }, message: "Account Created Successfully" });
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }
};

export const getVerified = async (req, res) => {
    const { id, token } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        if (!user) return res.status(400).send({ message: "Invalid link" });
        const Verified = await verifyUser.findOne({
            userId: user._id,
            token: token,
        });
        if (!Verified) return res.status(400).send({ message: "Verification expire re-login" });

        await User.updateOne({ _id: user._id }, { verifiedUser: true });
        await Verified.remove();

        res.status(200).send({ message: "Email verified" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const singleUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) return res.status(404).json({ message: 'User not found' });
        const singleUser = await User.findById(id);
        res.status(200).json({ singleUser, message: "Profile Page" });
    } catch (error) {
        res.json({ message: error });
    }
};

export const updateSingleUser = async (req, res) => {
    const { id } = req.params;
    const { email, firstName, number, lastName, role, selectedFile, address } = req.body;
    try {
        const existingUser = await User.findById(id);
        if (!existingUser) return res.status(404).json({ message: 'User not found' });
        if (firstName.length < 3 || firstName.length > 10) return res.status(404).json({ message: 'Firstname required 3 to 10 char' });

        if (lastName.length < 3 || lastName.length > 10) return res.status(404).json({ message: 'Lastname required 3 to 10 char' });
        // phone number validation
        if (number.length < 10 || number.length > 10) return res.status(404).json({ message: 'Phone number must be 10 digits' });
        // address validation
        if (address.length < 3 || address.length > 20) return res.status(404).json({ message: 'Address required 3 to 20 char' });
        // selectedFile validation
        if (selectedFile === null) return res.status(404).json({ message: 'SelectedFile is Required' });
        const updatedUser = await User.findByIdAndUpdate(id, { email, number, name: `${firstName} ${lastName}`, role, selectedFile, number, address }, { new: true });

        const token = jwt.sign({ email: updatedUser.email, id: updatedUser._id, role: updatedUser.role }, process.env.JWT, { expiresIn: '1d' });

        res.status(200).json({ result: updatedUser, token, message: "User Updated" });

    } catch (error) {
        res.json({ message: error });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) return res.status(404).json({ message: 'User not found' });
        await User.findByIdAndRemove(id);
        const result = await User.find();
        res.status(200).json({ result, message: "User Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
}

export const addCart = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(400).json({ message: "User does not exist." })

        await User.findOneAndUpdate({ _id: req.userId }, {
            cart: req.body
        })
        res.status(200).json({ message: "Cart Added" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
};

export const deleteaCart = async (req, res) => {
    const { id } = req.params;
    const cart = req.body;
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.status(400).json({ message: "User does not exist." })
        const newCart = cart.filter(item => item._id !== id)
        await User.findOneAndUpdate({ _id: req.userId }, {
            cart: newCart
        })
        res.status(200).json({ message: "Item Removed" })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const incrementCart = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const { cart, increment } = data;
        const user = await User.findById(req.userId)
        if (!user) return res.status(400).json({ message: "User does not exist." })
        const newCart = cart.map(item => {
            if (item._id === id) {
                if (increment === true) {
                    item.quantity += 1;
                } else {
                    item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
                }
            }
            return item;
        }
        )
        await User.findOneAndUpdate({ _id: req.userId }, {
            cart: newCart
        })
        if (increment === true) {
            res.status(200).json({ message: "Item Increment" })
        } else {
            res.status(200).json({ message: "Item Decrement" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

// report get by user 
export const reportData = async (req, res) => {
    const { userId } = req.params;
    const { reportData } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ message: "User does not exist." });
        const report = user.report.find(item => item.reporterUserId === reportData.reporterUserId);
        if (report) return res.status(404).json({ message: "You have already reported this user" });
        await User.findByIdAndUpdate({ _id: userId }, {
            $push: {
                report: reportData
            }
        })
        res.status(200).json({ message: "Report Added" })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}