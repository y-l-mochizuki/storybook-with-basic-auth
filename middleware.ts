import { NextRequest, NextResponse } from "next/server";

const USER_NAME = "test";
const PASSWORD = "test";

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  if (basicAuth) {
    const auth = basicAuth.split(" ")[1];
    const [user, password] = atob(auth).split(":");
    if (user === USER_NAME && password === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new Response("Auth required", {
    status: 401,
    headers: {
      "WWW-authenticate": 'Basic realm="Secure Area"',
    },
  });
}
