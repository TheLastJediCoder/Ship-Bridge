import "server-only";
import { cookies } from "next/headers";

export async function createSession(token) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
