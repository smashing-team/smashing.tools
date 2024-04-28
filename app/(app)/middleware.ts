import { updateSession } from "@/utils/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("------------------------------------------------");
  console.log("------------------------------------------------");
  console.log("------------------------------------------------");
  console.log("------------------------------------------------");
  console.log("--------------------MIDDLEWARE------------------");
  console.log("------------------------------------------------");
  console.log("------------------------------------------------");
  console.log("------------------------------------------------");
  console.log("------------------------------------------------");
  console.log("------------------------------------------------");
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
    "/((?!_next/static|og-image|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
