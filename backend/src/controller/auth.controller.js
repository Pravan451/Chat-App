import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

/* ===================== SIGN UP ===================== */
export const SignUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ success: false, message: "Password must be at least 6 characters." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // generate JWT cookie
    generateToken(newUser._id, res);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/* ===================== LOGIN ===================== */
export const LogIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    // generate JWT cookie
    generateToken(user._id, res);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/* ===================== LOGOUT ===================== */
export const Logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 0,
    });

    res.status(200).json({ success: true, message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/* ===================== UPDATE PROFILE ===================== */
export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
    return res
      .status(400)
      .json({ success: false, message: "Profile picture is required." });
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

/* ===================== GET CURRENT USER ===================== */
export const getUser = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Get user error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
