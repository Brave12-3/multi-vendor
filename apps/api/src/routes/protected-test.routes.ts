import { Router, Request } from "express";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.get("/profile", verifyToken, (req: Request & { user?: any }, res) => {
  res.json({ message: "Profile Access Granted", user: req.user });
});

export default router;
