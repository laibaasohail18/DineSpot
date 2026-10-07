/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { AuthRequest } from "../middlewares/auth.js";

// Helper to generate JWT token with safety check
const generateToken = (id: string) => {
  const secret = process.env.JWT_SECRET || "fallback_secret_key_12345";
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

// Register a new user
// POST /api/auth/register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Please enter all required fields" });
      return;
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || "user",
    });

    if (user) {
      const token = generateToken(user._id.toString());

      // Uniform Response Format
      res.status(201).json({
        message: "Registration successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error: any) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// Authenticate a user and get token
// POST /api/auth/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please provide email and password" });
      return;
    }

    console.log(`🔍 Attempting login for: ${email}`);

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found in DB");
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      console.log("❌ Password match failed");
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    console.log("✅ Password match success!");

    const token = generateToken(user._id.toString());

    // Uniform Response Format
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

// Get user profile
// GET /api/auth/me
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    res.status(200).json(req.user);
  } catch (error: any) {
    console.error("GetMe Error:", error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};