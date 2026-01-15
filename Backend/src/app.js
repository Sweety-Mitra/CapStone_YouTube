import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";
import commentRoutes from "./routes/comment.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

export default app;
