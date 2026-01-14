// Central express app configuration

import express from "express";
import cors from "cors";

const app = express();

// Enable CORS for frontend requests
app.use(cors());

// Parse incoming JSON
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

export default app;
