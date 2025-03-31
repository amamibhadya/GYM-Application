const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

const UserModel = require("./Model/User");
const sendEmail = require("./utils/sendEmail");

dotenv.config();
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',  // Frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,  // Allow credentials to be sent
};

app.use(cors(corsOptions));



app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    console.log("📩 Received sign-up request with data:", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      console.log("⚠️ Missing email or password");
      return res.status(400).json({ error: "Missing fields" });
    }

    const existingUser = await UserModel.findOne({ email });
    console.log("🔍 Checking if user exists:", existingUser);

    if (existingUser) {
      console.log("🚨 Email already exists:", email);
      return res.status(400).json({ error: "Email already exists" });
    }

    console.log("🔒 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("📝 Creating new user...");
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();

    console.log("✅ User Created Successfully:", newUser);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Send Email Route
app.post("/send/mail", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Send email using Nodemailer
    await sendEmail({
      name,
      email,
      message,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ message: "Email could not be sent!" });
  }
});

