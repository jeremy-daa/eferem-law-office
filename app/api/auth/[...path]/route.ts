import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users, sessions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { AUTH_COOKIE_NAME, getNeonSession } from "@/lib/auth";
import { ENABLE_ADMIN_SIGNUP } from "@/lib/config";
import crypto from "crypto";

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash?: string | null): boolean {
  if (!storedHash || !storedHash.includes(":")) return false;
  try {
    const [salt, originalHash] = storedHash.split(":");
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(originalHash, "hex"));
  } catch (err) {
    return false;
  }
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path ? params.path.join("/") : "";

  if (path === "session" || path === "me") {
    const session = await getNeonSession();
    if (!session) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }
    return NextResponse.json({ authenticated: true, user: session.user });
  }

  return NextResponse.json({ error: "Auth endpoint not found" }, { status: 404 });
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path ? params.path.join("/") : "";
  let body: any = {};

  try {
    body = await req.json();
  } catch (err) {
    body = {};
  }

  // Neon Managed Auth Sign-In / Login Handler
  if (path === "sign-in" || path === "login" || path.includes("sign-in")) {
    const identifier = body.email || body.username || body.identifier;
    const password = body.password || "";

    if (!identifier || !password) {
      return NextResponse.json({ error: "Email/username and password are required" }, { status: 400 });
    }

    let user: any = null;

    try {
      const foundUsers = await db
        .select()
        .from(users)
        .where(eq(users.email, identifier))
        .limit(1);
      if (foundUsers.length > 0) {
        user = foundUsers[0];
      }
    } catch (dbErr) {
      console.error("Neon DB Sign-in Query Error:", dbErr);
    }

    // Strict security check: user must exist in DB
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Strict security check: verify password hash if password column exists
    if (user.password) {
      const isValidPassword = verifyPassword(password, user.password);
      if (!isValidPassword) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
    }

    // Create session token & store in Postgres sessions table
    const sessionToken = "neon_sess_" + crypto.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 Days

    try {
      await db.insert(sessions).values({
        id: "sess_" + crypto.randomUUID(),
        userId: user.id,
        token: sessionToken,
        expiresAt: expiresAt,
        userAgent: req.headers.get("user-agent") || "",
        ipAddress: req.headers.get("x-forwarded-for") || "",
      });
    } catch (sessErr) {
      console.error("Neon Session Insert Error:", sessErr);
    }

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });

    // Set secure auth cookie
    response.cookies.set(AUTH_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return response;
  }

  // Neon Managed Auth Sign-Up / Registration Handler
  if (path === "sign-up" || path === "register" || path.includes("sign-up")) {
    if (!ENABLE_ADMIN_SIGNUP) {
      return NextResponse.json(
        { error: "Public admin sign-up is disabled on this server." },
        { status: 403 }
      );
    }
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    try {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existingUser.length > 0) {
        return NextResponse.json(
          { error: "An account with this email already exists." },
          { status: 400 }
        );
      }
    } catch (err) {
      console.error("Neon Sign-Up Duplicate Check Error:", err);
    }

    const newUserId = "user_" + crypto.randomUUID();
    const hashedPassword = hashPassword(password);

    try {
      await db.insert(users).values({
        id: newUserId,
        name,
        email,
        password: hashedPassword,
        role: role || "admin",
        emailVerified: true,
      });
    } catch (err: any) {
      console.error("Neon DB User Sign-up Insert Error:", err?.message || err);
      return NextResponse.json(
        { error: "Failed to create user in database: " + (err?.message || "Unknown error") },
        { status: 500 }
      );
    }

    const createdUser = {
      id: newUserId,
      name,
      email,
      role: role || "admin",
    };

    // Create active session token & store in Postgres sessions table
    const sessionToken = "neon_sess_" + crypto.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 Days

    try {
      await db.insert(sessions).values({
        id: "sess_" + crypto.randomUUID(),
        userId: newUserId,
        token: sessionToken,
        expiresAt: expiresAt,
        userAgent: req.headers.get("user-agent") || "",
        ipAddress: req.headers.get("x-forwarded-for") || "",
      });
    } catch (sessErr) {
      console.error("Neon Session Insert Error:", sessErr);
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin account created successfully!",
      user: createdUser,
    });

    response.cookies.set(AUTH_COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    return response;
  }

  // Sign-Out Handler
  if (path === "sign-out" || path === "logout") {
    const cookieStore = req.cookies;
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (token) {
      await db.delete(sessions).where(eq(sessions.token, token)).catch(() => {});
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(AUTH_COOKIE_NAME, "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ error: "Auth POST route not found" }, { status: 404 });
}
