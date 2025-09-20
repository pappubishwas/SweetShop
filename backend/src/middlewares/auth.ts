import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface JwtPayload { id: string }

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const secret = process.env.JWT_SECRET || "verysecretkey";
    const payload = jwt.verify(token, secret) as JwtPayload;
    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ message: "No user found" });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) return res.status(403).json({ message: "Admin only" });
  next();
};
