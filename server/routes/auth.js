import express from "express";
import bcrypt from "bcryptjs";
import pool from "../db.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, city } = req.body;

    if (!name?.trim() || !email?.trim() || !password || !city?.trim()) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [
      normalizedEmail,
    ]);

    if (existing.length > 0) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, city) VALUES (?, ?, ?, ?)",
      [name.trim(), normalizedEmail, hashedPassword, city.trim()]
    );

    return res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: result.insertId,
        name: name.trim(),
        email: normalizedEmail,
        city: city.trim(),
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error during signup." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [rows] = await pool.query(
      "SELECT id, name, email, password, city FROM users WHERE email = ?",
      [normalizedEmail]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.json({
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.city,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login." });
  }
});

export default router;
