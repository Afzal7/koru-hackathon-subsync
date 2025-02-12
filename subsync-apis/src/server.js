require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./db"); // Import MongoDB connection

const cohereRoutes = require("./controllers/cohere-apis");
const classRoutes = require("./controllers/class-apis");
const schoolRoutes = require("./controllers/school-apis");
const subRequestRoutes = require("./controllers/sub-request-apis");

const app = express();
const port = process.env.PORT || 8081; // Server Port

// Connect to MongoDB
connectDB();

app.use(express.json());

// Middleware for parsing JSON requests
app.use(cors());

// Routes for db operations
app.use("/api/classes", classRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/sub-requests", subRequestRoutes);

// API endpoints for handling the Cohere
app.use("/api/cohere", cohereRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
