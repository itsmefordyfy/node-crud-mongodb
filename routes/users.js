// routes/users.js

const express = require("express");
const Joi = require("joi");
const User = require("../models/User");

const router = express.Router();

// Joi validation schema
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).required(),
});

// POST endpoint for creating a user
router.post("/", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send({ message: "User already registered." });

    user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET endpoint for retrieving all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET endpoint for retrieving a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// PUT endpoint for updating a user by ID
router.put("/:id", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// DELETE endpoint for deleting a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
