import { next } from "@vercel/edge";

const USER_NAME = "test";
const PASSWORD = "test";

export function middleware(req: Request) {
  const basicAuth = req.headers.get("authorization");
  if (basicAuth) {
    const auth = basicAuth.split(" ")[1];
    const [user, password] = atob(auth).split(":");
    if (user === USER_NAME && password === PASSWORD) {
      return next();
    }
  }

  return new Response("Auth required", {
    status: 401,
    headers: {
      "WWW-authenticate": 'Basic realm="Secure Area"',
    },
  });
}
