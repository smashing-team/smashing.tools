export const getBaseUrl = (): string => {
  if (process.env.URL) {
    return process.env.URL;
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return "https://smashing.tools";
};
