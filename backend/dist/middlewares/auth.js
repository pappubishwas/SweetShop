"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token)
        return res.status(401).json({ message: "Not authorized" });
    try {
        const secret = process.env.JWT_SECRET || "verysecretkey";
        const payload = jsonwebtoken_1.default.verify(token, secret);
        const user = await User_1.default.findById(payload.id).select("-password");
        if (!user)
            return res.status(401).json({ message: "No user found" });
        req.user = user;
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid token" });
    }
};
exports.protect = protect;
const adminOnly = (req, res, next) => {
    if (!req.user?.isAdmin)
        return res.status(403).json({ message: "Admin only" });
    next();
};
exports.adminOnly = adminOnly;
