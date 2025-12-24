import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { env } from "../config/env";

export async function registerUser(email: string, password: string, role: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db
    .insert(users)
    .values({
      email,
      passwordHash: hashedPassword,
      role,
    })
    .returning();

  return user[0];
}

export async function loginUser(email: string, password: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) throw new Error("User not found");

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) throw new Error("Incorrect password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user };
}
