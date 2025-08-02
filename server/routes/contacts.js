const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /contact - Submit contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ success: true, message: "Message received." });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
