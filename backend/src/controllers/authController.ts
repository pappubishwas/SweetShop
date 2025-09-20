import { Request, Response } from "express";
import User from "../models/User";
import jwt, { SignOptions, Secret } from "jsonwebtoken";

function generateToken(id: string): string {
  const secret: Secret = process.env.JWT_SECRET || "verysecretkey";
  const expiresIn = (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1d";

  return jwt.sign({ id }, secret, { expiresIn });
}


export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email & password required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });


  const adminEmail = process.env.ADMIN_EMAIL;
  const isAdmin = adminEmail && adminEmail === email;

  const user = await User.create({ email, password, name, isAdmin });
  res.status(201).json({
    token: generateToken(user._id.toString()),
    user: { id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin }
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email & password required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // @ts-ignore
  
  const match = await user.comparePassword(password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    token: generateToken(user._id.toString()),
    user: { id: user._id, email: user.email, name: user.name, isAdmin: user.isAdmin }
  });
};
