const express = require("express");
const School = require("../models/school");
const router = express.Router();

// Create a new school
router.post("/", async (req, res) => {
  try {
    const newSchool = new School(req.body);
    await newSchool.save();
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all schools
router.get("/", async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single school by ID
router.get("/:id", async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ error: "School not found" });
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a school
router.put("/:id", async (req, res) => {
  try {
    const updatedSchool = await School.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSchool)
      return res.status(404).json({ error: "School not found" });
    res.json(updatedSchool);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a school
router.delete("/:id", async (req, res) => {
  try {
    const deletedSchool = await School.findByIdAndDelete(req.params.id);
    if (!deletedSchool)
      return res.status(404).json({ error: "School not found" });
    res.json({ message: "School deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
