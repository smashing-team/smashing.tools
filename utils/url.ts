export const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === "development") {
    return `http://localhost:${process.env.PORT ?? 3000}`;
  }

  return "https://smashing.tools";
};
