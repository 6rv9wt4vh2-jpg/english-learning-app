import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const password = process.env.APP_PASSWORD;

  if (!password) {
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  const authorization = request.headers.get("authorization");

  if (authorization?.startsWith("Basic ")) {
    const encoded = authorization.slice(6).trim();
    try {
      const decoded = atob(encoded);
      const colon = decoded.indexOf(":");
      const username = colon === -1 ? decoded : decoded.slice(0, colon);
      const pass = colon === -1 ? "" : decoded.slice(colon + 1);

      if (username === "vlad" && pass === password) {
        return NextResponse.next();
      }
    } catch {
      // invalid base64 — fall through to 401
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="English App", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: [
    /*
     * Protect pages and /api. Skip Next.js internals and common static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff2?|ttf|eot)$).*)",
  ],
};
