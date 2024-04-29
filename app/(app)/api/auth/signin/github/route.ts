import { createClient } from "@/utils/supabase/server";
import { getBaseUrl } from "@/utils/url";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${getBaseUrl()}/api/auth/callback`,
    },
  });

  if (error) {
    return redirect("/join");
  }

  return redirect(data.url);
}
