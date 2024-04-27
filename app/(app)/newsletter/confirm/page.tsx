import { HeaderGradientProtected } from "@/components/blocks/header-gradient-protected";
import { cn } from "@/utils/cn";
import { constructMetadata } from "@/utils/metadata";
import { createClient } from "@/utils/supabase/server";

export const metadata = constructMetadata({
  title: "Newsletter",
  description: "Subscribe to the smashing.tools newsletter",
});

type Props = {
  searchParams: { token: string | undefined };
};

export default async function NewsletterConfirmPage({ searchParams }: Props) {
  const token = searchParams.token || "";
  let statusMessage = "Awaiting verification";
  let statusIcon = "info";

  const supabase = createClient();
  const { data: subscriberData, error: selectError } = await supabase
    .from("newsletter-sub")
    .select()
    .eq("verification_token", token)
    .limit(1)
    .maybeSingle();

  const isAlreadyVerified = subscriberData?.verified;

  if (selectError) {
    statusMessage =
      "An error occurred while verifying your subscription. Please try again later.";
    statusIcon = "error";
  } else if (isAlreadyVerified) {
    statusIcon = "success";
    statusMessage = "You're already subscribed to the newsletter!";
  } else {
    statusIcon = "success";
    statusMessage = "You have been successfully subscribed to the newsletter!";
    await supabase
      .from("newsletter-sub")
      .update({ verified: true })
      .eq("verification_token", token);
  }
  return (
    <div>
      <HeaderGradientProtected />
      <div className="mx-auto size-full px-4">
        <div className="mt-12">
          <div className="relative grow pl-10">
            <dt className="inline text-lg font-semibold dark:text-zinc-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute left-0 top-1 size-8 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
                  clipRule="evenodd"
                ></path>
                <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z"></path>
              </svg>
              Weekly Newsletter
            </dt>
            <dd className="block text-sm text-zinc-500">
              Get the latest updates and news from smashing.tools in your inbox
              every week.
            </dd>
          </div>

          <div className="mt-6 mb-12 flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={cn(
                "size-6 fill-orange-500 hidden",
                statusIcon === "error" && "block"
              )}
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={cn(
                "size-6 fill-sky-500 hidden",
                statusIcon === "info" && "block"
              )}
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={cn(
                "size-6 fill-sky-500 hidden",
                statusIcon === "success" && "block"
              )}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"></path>
            </svg>
            <span>
              {statusMessage}
              {statusIcon === "success" && (
                <p className="text-sm text-zinc-500">
                  You can unsubscribe from your settings page at any time.
                </p>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
