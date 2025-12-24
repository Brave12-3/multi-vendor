import { Router } from "express";
import { registerUser, loginUser } from "../service/auth.service";

const router = Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await registerUser(email, password, role);
    res.status(201).json({ message: "Account created!", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.status(200).json({ token, user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
