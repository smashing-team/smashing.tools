"use server";
import "server-only";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/");
}
