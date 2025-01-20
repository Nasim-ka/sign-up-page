import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, users } from "@/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { username, email, password } = body;

    console.log("Received fields:", { username, email, password });

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertedUser = await db
      .insert(users)
      .values({
        username,
        email,
        password_hash: hashedPassword,
      })
      .returning();

    return NextResponse.json({ user: insertedUser });
  } catch (error: any) {
    console.error("Error in registration:", error);

    if (error.message.includes("duplicate key value")) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
