import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import genToken from "../config/token.js";

// ++++++++++++   SIGNUP   ++++++++++++++
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //  Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    //  Check password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //  Generate token
    const token = await genToken(newUser._id);

    //  Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict", //  fixed typo (was semSite)
      secure: false,
    });

    //  Send response
    return res.status(201).json({
      message: "Signup successful!",
      user: newUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Signup failed", error: error.message });
  }
};

// ++++++++++++   LOGIN   +++++++++++++
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist!" });
    }

    //  Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password!" });
    } //  Added missing closing brace here

    // Generate token
    const token = await genToken(user._id);

    //  Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: false,
    });

    //  Send response
    return res.status(200).json({
      message: "Login successful!",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};
// logout

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: " log out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `log out error $ {error}` });
  }
};
