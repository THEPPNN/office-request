const express = require("express");
const prisma = require("../prisma");

const router = express.Router();

// GET all requests
router.get("/", async (req, res) => {
  const { userId } = req.query;
  let requests = [];
  if(userId) {
    requests = await prisma.request.findMany({
      include: { user: true },
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    requests = await prisma.request.findMany({
      include: { user: true },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "PENDING").length,
    approved: requests.filter((r) => r.status === "APPROVED").length,
    rejected: requests.filter((r) => r.status === "REJECTED").length,
  };

  res.json({ requests, stats });
});

// CREATE request
router.post("/", async (req, res) => {
  const { type, startDate, endDate, note, userId } = req.body;
  const request = await prisma.request.create({
    data: {
      type,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      note,
      userId: parseInt(userId),
    },
  });
  if (!request) {
    return res.status(400).json({ message: "Failed to create request" });
  }
  res.status(201).json({ message: "Request created successfully" });
});

module.exports = router;