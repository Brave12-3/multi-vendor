import { Request, Response } from "express";
import { db } from "../db";
import { vendors } from "../db/schema";
import { eq } from "drizzle-orm";

export const createVendorProfile = async (req: any, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Not authorized" });

  const { brandName } = req.body;

  try {
    const vendorExists = await db
      .select()
      .from(vendors)
      .where(eq(vendors.userId, req.user.id));

    if (vendorExists.length > 0) {
      return res.status(400).json({ error: "Vendor profile already exists" });
    }

    const created = await db.insert(vendors).values({
      userId: req.user.id,
      brandName,
    }).returning();

    res.status(201).json({ message: "Vendor profile created", vendor: created[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getVendorProfile = async (req: any, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Not authorized" });

  try {
    const vendor = await db
      .select()
      .from(vendors)
      .where(eq(vendors.userId, req.user.id));

    if (vendor.length === 0) {
      return res.status(404).json({ error: "Vendor profile not found" });
    }

    res.json({ vendor: vendor[0] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
