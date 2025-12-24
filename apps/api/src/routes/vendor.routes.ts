import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { createVendorProfile, getVendorProfile } from "../controllers/vendor.controller";

const router = Router();

router.post("/create", verifyToken, createVendorProfile);
router.get("/me", verifyToken, getVendorProfile);

export default router;
