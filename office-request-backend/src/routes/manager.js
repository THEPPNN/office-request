const express = require("express");
const prisma = require("../prisma");

const router = express.Router();

// UPDATE request status
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const { approveId } = req.body;
  if (!approveId) {
    return res.status(400).json({ message: "Approve ID is required" });
  }
  const request = await prisma.request.update({
    where: { id: parseInt(id) },
    data: { status, approveId: parseInt(approveId) },
  });
  res.json(request);
});

module.exports = router;