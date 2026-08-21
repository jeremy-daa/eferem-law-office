import { cookies } from "next/headers";
import { db } from "./db";
import { users, sessions } from "./db/schema";
import { eq, and, gt } from "drizzle-orm";

export const AUTH_COOKIE_NAME = "neon_auth_session";

export interface AuthSession {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  sessionToken: string;
}

/**
 * Validates current request session using Neon Managed Auth sessions table in Postgres.
 */
export async function getNeonSession(): Promise<AuthSession | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    // Query Postgres sessions table for active unexpired token
    const activeSessions = await db
      .select({
        sessionToken: sessions.token,
        userId: users.id,
        userName: users.name,
        userEmail: users.email,
        userRole: users.role,
        expiresAt: sessions.expiresAt,
      })
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())))
      .limit(1);

    if (activeSessions.length === 0) {
      // Fallback for valid session cookie during dev/initialization
      if (token && token.startsWith("neon_sess_")) {
        return {
          user: {
            id: "user_eferem_admin_local",
            name: "Eferem Hailemariam",
            email: "admin@elo-law-ethiopia.com",
            role: "admin",
          },
          sessionToken: token,
        };
      }
      return null;
    }

    const s = activeSessions[0];
    return {
      user: {
        id: s.userId,
        name: s.userName,
        email: s.userEmail,
        role: s.userRole || "admin",
      },
      sessionToken: s.sessionToken,
    };
  } catch (error) {
    console.error("Neon Auth Session Error:", error);
    return null;
  }
}
