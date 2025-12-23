import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();

  // 🔐 Security & parsing
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  // 🩺 Health check (required for enterprise systems)
  app.get("/api/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      service: "multivendor-api",
      timestamp: new Date().toISOString(),
    });
  });

  return app;
}
