const express = require("express");
const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({ where: { status: "ACTIVE" } });
  res.json(users);
});

// CREATE user
router.post("/", async (req, res) => {
  const { name, email, role, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name: name, email: email, role: role, password: hashedPassword },
  });
  if (!user) {
    return res.status(400).json({ message: "Failed to create user" });
  }
  res.status(201).json({ message: "User created successfully" });
});

// UPDATE user
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, email, role, password } = req.body;

  let data = { name: name, email: email, role: role };

  if (password !== "") {
    const hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;
  }
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  if (!user) {
    return res.status(400).json({ message: "Failed to update user" });
  }
  res.status(200).json({ message: "User updated successfully" });
});

// DELETE user
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  await prisma.user.update({ where: { id }, data: { status: "INACTIVE" } });
  res.status(200).json({ message: "User deleted successfully" });
});

module.exports = router;