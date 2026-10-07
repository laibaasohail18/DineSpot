/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { IUser, User } from "../models/User.js";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      const secret = process.env.JWT_SECRET || "fallback_secret";
      const decoded = jwt.verify(token, secret) as { id: string };

      // Fetch user with 3000ms DB timeout protection
      const user = await User.findById(decoded.id).select("-password").maxTimeMS(3000);

      if (!user) {
        res.status(401).json({ message: "Not authorized, user not found" });
        return;
      }

      req.user = user;
      return next();
    } catch (error: any) {
      res.status(401).json({ message: "Not authorized, token verification failed" });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token provided" });
    return;
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    res.status(403).json({ message: "Access denied, admin role required" });
    return;
  }
};

export const ownerOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && (req.user.role === "owner" || req.user.role === "admin")) {
    return next();
  } else {
    res.status(403).json({ message: "Access denied, restaurant owner role required" });
    return;
  }
};