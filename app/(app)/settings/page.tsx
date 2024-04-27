import { Alert, AlertDescription, AlertTitle } from "@/components/alert";
import { Countdown } from "@/components/blocks/countdown";
import { HeaderGradientProtected } from "@/components/blocks/header-gradient-protected";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { resendConfirmation, subscribe, unsubscribe } from "@/server/actions";
import { constructMetadata } from "@/utils/metadata";
import { canResendConfirmationEmail } from "@/utils/ses";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = constructMetadata({
  title: "Settings",
  description: "Your settings for smashing.tools",
});

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/join");
  }

  const subInfo = await supabase
    .from("newsletter-sub")
    .select("*")
    .limit(1)
    .maybeSingle();

  const { remainingSeconds } = canResendConfirmationEmail(
    user.user_metadata.newsletter_confirmation_sent_date
  );

  return (
    <div>
      <HeaderGradientProtected />
      <div className="mx-auto size-full px-4">
        <div className="center-h mb-6 flex">
          <div>
            <span className="text-2xl font-semibold">Your settings</span>
            <p className="mt-2 text-sm text-zinc-500">
              Adjust your settings and preferences.
            </p>
          </div>
          <div className="flex grow"></div>
        </div>
        <div className="mt-12 mb-12">
          <div className="relative grow pl-7">
            <dt className="inline text-lg font-semibold dark:text-zinc-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute left-0 top-1 size-5 text-yellow-500"
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
          <div>
            {!subInfo.data && (
              <form action={subscribe} className="mt-4 pl-7">
                <div className="flex items-center">
                  <Input
                    type="email"
                    name="email"
                    readOnly
                    placeholder="Email"
                    defaultValue={user?.email}
                  />
                  <Button type="submit" className="ml-2">
                    Subscribe
                  </Button>
                </div>
              </form>
            )}

            {subInfo.data !== null && (
              <div className="mt-4 pl-5">
                {subInfo.data?.verified ? (
                  <Alert>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 fill-sky-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <AlertTitle>Subscribed</AlertTitle>
                    <AlertDescription>
                      Newsletter subscription confirmed for
                      <span className="font-semibold ml-1">
                        {subInfo.data?.email}
                      </span>
                      <div className="mt-4">
                        <form action={unsubscribe}>
                          <Button type="submit" size="sm" variant="destructive">
                            Unsubscribe
                          </Button>
                        </form>
                      </div>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5 animate-spin stroke-yellow-500"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 3a9 9 0 1 0 9 9" />
                    </svg>

                    <AlertTitle>Awaiting verification</AlertTitle>
                    <AlertDescription>
                      We have sent a verification email to
                      <span className="font-semibold ml-1">
                        {subInfo.data?.email}
                      </span>
                      <div className="mt-4">
                        <form action={resendConfirmation}>
                          <Countdown
                            key={`resend-${remainingSeconds}-${new Date().getTime()}`}
                            remainingSeconds={remainingSeconds}
                          />
                        </form>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
