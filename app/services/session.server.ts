import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData>({
    cookie: {
      name: "__session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: false,
    },
  });

export { getSession, commitSession, destroySession };
