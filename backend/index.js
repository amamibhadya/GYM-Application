const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const UserModel = require("./Model/User");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log(err));

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

// 🔻 Move this AFTER the signup route to avoid intercepting it
app.use("/", (req, res) => {
    res.send("It is working");
});

