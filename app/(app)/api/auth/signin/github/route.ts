import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const redirectTo =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/auth/callback"
      : "https://smashing.tools/api/auth/callback";

  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
    },
  });

  if (error) {
    return redirect("/join");
  }

  return redirect(data.url);
}
