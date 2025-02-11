require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cohereRoutes = require('./cohere-apis');

const app = express();
const port = process.env.PORT || 8081; // Server Port

app.use(cors()); 

// Middleware for parsing JSON requests
app.use(express.json());

// API endpoints for handling the Cohere
app.use('/cohere', cohereRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});