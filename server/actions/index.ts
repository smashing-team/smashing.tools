"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import "server-only";

const supabase = createClient();

export async function signout() {
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/join");
  }

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
