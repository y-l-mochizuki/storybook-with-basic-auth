import { next } from "@vercel/edge";

// Todo: 環境変数に定義する
const USER_NAME = "test";
const PASSWORD = "test";

export const config = {
  matcher: "/",
};

export default function middleware(request: Request) {
  const authorizationHeader = request.headers.get("authorization");

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(" ")[1];
    const [user, password] = atob(basicAuth).toString().split(":");

    if (user === USER_NAME && password === PASSWORD) {
      return next();
    }
  }

  return new Response("Basic Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}
