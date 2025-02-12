const express = require("express");
const SubRequest = require("../models/sub-request");

const router = express.Router();

// Create a new sub request
router.post("/", async (req, res) => {
  try {
    const newSubRequest = new SubRequest(req.body);
    await newSubRequest.save();
    res.status(201).json(newSubRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all sub requests
router.get("/", async (req, res) => {
  try {
    const subRequests = await SubRequest.find();
    res.json(subRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single sub request by ID
router.get("/:id", async (req, res) => {
  try {
    const subRequest = await SubRequest.findById(req.params.id);
    if (!subRequest)
      return res.status(404).json({ error: "SubRequest not found" });
    res.json(subRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a sub request
router.put("/:id", async (req, res) => {
  try {
    const updatedSubRequest = await SubRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSubRequest)
      return res.status(404).json({ error: "SubRequest not found" });
    res.json(updatedSubRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a sub request
router.delete("/:id", async (req, res) => {
  try {
    const deletedSubRequest = await SubRequest.findByIdAndDelete(req.params.id);
    if (!deletedSubRequest)
      return res.status(404).json({ error: "SubRequest not found" });
    res.json({ message: "SubRequest deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
