import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from "./db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const distPath = path.join(__dirname, "../dist");

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    await testConnection();
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

app.use("/api/auth", authRoutes);
app.use(express.static(distPath));

app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("MySQL connected successfully.");
  } catch (error) {
    console.error("Failed to connect to MySQL:", error.message);
  }
});

export default app;
