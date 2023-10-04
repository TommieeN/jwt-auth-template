const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Use environment variables for configuration
const { JWT_SECRET } = process.env;

// POST /api/users/register
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }

    // Check if the user already exists
    const existingUser = await knex("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use." });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };

    // Insert the user into the database
    await knex("users").insert(newUser);

    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Failed registration" });
  }
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password." });
    }

    // Find the user
    const user = await knex("users").where({ email }).first();
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Validate the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });

    return res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Failed login" });
  }
});

// GET /api/users/current
router.get("/current", async (req, res) => {
  try {
    // Ensure there is an auth header provided
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Please log in" });
    }

    // Extract and verify the token
    const authToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(authToken, JWT_SECRET);

    // Retrieve user data
    const user = await knex("users").where({ id: decoded.id }).first();
    if (!user) {
      return res.status(401).json({ error: "Invalid auth token" });
    }

    // Remove password from the user object
    delete user.password;

    return res.json(user);
  } catch (error) {
    console.error("Current user error:", error);
    return res.status(401).json({ error: "Invalid auth token" });
  }
});

module.exports = router;
