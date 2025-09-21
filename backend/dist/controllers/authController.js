"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(id) {
    const secret = process.env.JWT_SECRET || "verysecretkey";
    const expiresIn = process.env.JWT_EXPIRES_IN || "1d";
    return jsonwebtoken_1.default.sign({ id }, secret, { expiresIn });
}
const register = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Email & password required" });
    const exists = await User_1.default.findOne({ email });
    if (exists)
        return res.status(400).json({ message: "User already exists" });
    const adminEmail = process.env.ADMIN_EMAIL;
    const isAdmin = adminEmail && adminEmail === email;
    const user = await User_1.default.create({ email, password, name, isAdmin });
    res.status(201).json({
        token: generateToken(user._id.toString()),
        user: { id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin }
    });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Email & password required" });
    const user = await User_1.default.findOne({ email });
    if (!user)
        return res.status(400).json({ message: "Invalid credentials" });
    // @ts-ignore
    const match = await user.comparePassword(password);
    if (!match)
        return res.status(400).json({ message: "Invalid credentials" });
    res.json({
        token: generateToken(user._id.toString()),
        user: { id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin }
    });
};
exports.login = login;
