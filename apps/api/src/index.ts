import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import authRoutes from "./routes/auth";
import protectedRoutes from "./routes/protected-test.routes";
import vendorRoutes from "./routes/vendor.routes";


const app = express();

// ======================
// GLOBAL MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/test", protectedRoutes);
app.use("/vendors", vendorRoutes);
// ======================
// HEALTH CHECK
// ======================
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// ======================
// ERROR HANDLER (LAST)
// ======================
app.use(errorHandler);

// ======================
// SERVER START
// ======================
app.listen(env.PORT, "0.0.0.0", () => {
  console.log(`🚀 API running on http://localhost:${env.PORT}`);
});
