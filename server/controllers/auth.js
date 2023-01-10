import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            description,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            description,
            location,
            occupation,
            profileViews: 0,
            profileLikes: 0
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}