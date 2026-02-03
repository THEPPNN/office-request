const express = require("express");
const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// login 
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email, status: "ACTIVE" } });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.status(200).json({ token, user });
});
module.exports = router;