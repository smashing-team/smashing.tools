// import { sendConfirmationEmail } from "@/utils/ses-client";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authCode = request.nextUrl.searchParams.get("code");
  const supabase = createClient();

  if (!authCode) {
    return new Response("No code provided", { status: 400 });
  }

  const { data, error } = await supabase.auth.exchangeCodeForSession(authCode);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  if (!data.user.user_metadata.login_count && data.user.email) {
    const subInfo = await supabase
      .from("newsletter-sub")
      .insert({
        email: data.user.email,
        user_id: data.user.id,
      })
      .select()
      .limit(1)
      .maybeSingle();

    if (!subInfo.error) {
      // sendConfirmationEmail(data.user.email, subInfo.data?.verification_token!);
    }
  }

  // increase login count
  await supabase.auth.updateUser({
    data: {
      login_count: (data.user.user_metadata.login_count || 0) + 1,
    },
  });

  return redirect("/");
}
