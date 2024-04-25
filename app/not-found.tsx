import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 min-w-full">
      <div className="text-center">
        <p className="text-base font-semibold text-zinc-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-zinc-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-zinc-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600"
          >
            Go back to tools
          </Link>
        </div>
      </div>
    </main>
  );
}
