import { NextResponse, type NextRequest } from "next/server";

const canonicalHost = "www.juristalent.ca";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");
  const url = request.nextUrl;
  const pathname = url.pathname === "/" ? "/fr" : url.pathname;

  if (host === "juristalent.ca") {
    return NextResponse.redirect(new URL(`${pathname}${url.search}`, `https://${canonicalHost}`), 308);
  }

  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/fr", url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
