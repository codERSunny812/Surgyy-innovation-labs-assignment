const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {validationResult } = require('express-validator');



const secret_key = process.env.JWT_SECRET

const checkPatientAuthRoute = (req, res) => {
  res.send("hello from the patient auth route");
};

const userData = [];

const registerPatient = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
     return  res.status(401).json({
        message: "some field are missing",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const obj = {
      name,
      email,
      password: hashPassword,
    };

    userData.push(obj);

    res.status(201).json({
      message: "Patient registered successfully",
      user: obj,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Login Route
const loginPatient = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    try {
        const { email, password } = req.body;

        const user = userData.find((u) => u.email === email);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email },secret_key, { expiresIn: "1h" });

        // Store token in HTTP-only cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: true, // Set to `true` in production (for HTTPS)
            sameSite: "Strict",
        });

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
      return   res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

module.exports = { checkPatientAuthRoute, registerPatient, loginPatient };
