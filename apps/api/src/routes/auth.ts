import { Router } from "express";
import bcrypt from "bcrypt";
import { signToken } from "../config/auth";

const router = Router();

/**
 * TEMP LOGIN (no DB yet)
 * We simulate users until DB layer exists
 */
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  // Fake password check
  const hashed = await bcrypt.hash("password123", 10);
  const valid = await bcrypt.compare(password, hashed);

  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({
    userId: "temp-id",
    role,
  });

  res.json({ token });
});

export default router;
