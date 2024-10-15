import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";

export async function getCurrentUser(): Promise<Session['user'] | null> {
  const session = await getServerSession(authOptions);

  // Ensure we return the user object or null if it doesn't exist
  return session?.user || null;
}
