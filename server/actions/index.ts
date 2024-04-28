"use server";
import { canResendConfirmationEmail, sendConfirmationEmail } from "@/utils/ses";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "server-only";

async function userGuard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/join");
  }

  return user;
}

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/");
}

export async function signIn() {
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

export async function bookmarkToggle(
  collection: string,
  slug: string,
  checked: boolean
) {
  const supabase = createClient();
  const user = await userGuard();

  if (checked) {
    await supabase.from("bookmark").delete().match({
      content_id: slug,
      collection: collection,
    });
  } else {
    await supabase.from("bookmark").insert({
      collection: collection,
      content_id: slug,
      user_id: user.id,
    });
  }

  revalidatePath("/");

  return true;
}

export async function resendConfirmation() {
  const supabase = createClient();
  const user = await userGuard();

  if (!user.email) {
    return redirect("/settings?error=NoEmail");
  }

  const { canResend } = canResendConfirmationEmail(
    user.user_metadata.newsletter_confirmation_sent_date
  );

  if (!canResend) {
    redirect("/settings?error=TooSoon");
  }

  // get existing subInfo
  const subInfo = await supabase
    .from("newsletter-sub")
    .select()
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (!subInfo.data) {
    return redirect("/settings?error=NoSubInfo");
  }

  try {
    await sendConfirmationEmail(user.email, subInfo.data.verification_token);

    await supabase.auth.updateUser({
      data: {
        newsletter_confirmation_sent_date: new Date().toISOString(),
      },
    });
  } catch (error) {
    await supabase.from("newsletter-sub").delete().match({
      email: user.email,
      user_id: user.id,
    });
  }

  revalidatePath("/settings");
  return redirect("/settings?success=Resent");
}

export async function unsubscribe() {
  const supabase = createClient();
  const user = await userGuard();

  if (!user.email) {
    return redirect("/settings?error=NoEmail");
  }

  await supabase.from("newsletter-sub").delete().match({
    email: user.email,
    user_id: user.id,
  });

  revalidatePath("/settings");
  return redirect("/settings?success=Unsubscribed");
}

export async function subscribe() {
  const supabase = createClient();
  const user = await userGuard();

  if (!user.email) {
    return redirect("/settings?error=NoEmail");
  }

  const { canResend } = canResendConfirmationEmail(
    user.user_metadata.newsletter_confirmation_sent_date
  );

  if (!canResend) {
    redirect("/settings?error=TooSoon");
  }

  const subInfo = await supabase
    .from("newsletter-sub")
    .insert({
      email: user.email,
      user_id: user.id,
    })
    .select()
    .limit(1)
    .maybeSingle();

  if (!subInfo.data) {
    return redirect("/settings?error=NoSubInfo");
  }

  try {
    await sendConfirmationEmail(user.email, subInfo.data?.verification_token!);

    await supabase.auth.updateUser({
      data: {
        newsletter_confirmation_sent_date: new Date().toISOString(),
      },
    });
  } catch (error) {
    await supabase.from("newsletter-sub").delete().match({
      email: user.email,
      user_id: user.id,
    });
  }

  revalidatePath("/settings");
  return redirect("/settings?success=Subscribed");
}
