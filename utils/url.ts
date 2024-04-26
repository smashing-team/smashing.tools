export const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }

  return (
    process.env.NEXT_PUBLIC_HOST ||
    process.env.VERCEL_URL ||
    "https://smashing.tools"
  );
};
