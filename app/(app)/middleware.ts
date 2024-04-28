import { updateSession } from "@/utils/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|og-image|_not-found|widget|manifest.webmanifest|robots.txt|sitemap.xml|join|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|txt|xml|jpeg|gif|webp)$).*)",
  ],
};
