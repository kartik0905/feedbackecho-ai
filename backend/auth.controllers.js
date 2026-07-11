import User from "./users.models.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Domain Restriction Validation
    if (!email.endsWith("@geu.ac.in")) {
      return res
        .status(403)
        .json({
          success: false,
          error: "Access Denied: Registration restricted to @geu.ac.in domain.",
        });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ success: true, token: generateToken(user._id) });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    res.status(200).json({ success: true, token: generateToken(user._id) });
  } catch (error) {
    next(error);
  }
};

export const googleOAuth = async (req, res, next) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, sub: googleId } = ticket.getPayload();

    if (!email.endsWith("@geu.ac.in")) {
      return res
        .status(403)
        .json({
          success: false,
          error: "Access Denied: Please use your @geu.ac.in university email.",
        });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, googleId });
    }

    res.status(200).json({ success: true, token: generateToken(user._id) });
  } catch (error) {
    next(error);
  }
};
