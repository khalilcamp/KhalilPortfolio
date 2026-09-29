import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware({ ...routing, localeDetection: false });

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const escolhido = request.cookies.get("NEXT_LOCALE")?.value;
    const idiomas = request.headers.get("accept-language");
    const detectado = idiomas && !/^\s*pt\b/i.test(idiomas) ? "en" : undefined;

    if ((escolhido ?? detectado) === "en") {
      return NextResponse.redirect(new URL("/en", request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
