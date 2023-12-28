/* eslint-disable no-restricted-syntax */
export const setCookie = (
  cookieKey: string,
  cookieValue: string,
  expirationDays: number = 365 * 10,
) => {
  const date = new Date();
  date.setTime(date.getTime() + (expirationDays || 30) * 24 * 60 * 60 * 1000);
  const expiryDate = `; expires=${date.toUTCString()}`;

  document.cookie = `${cookieKey}=${cookieValue || ''}${expiryDate}; path=/`;
};

export const getCookie = (cookieKey: string): string | undefined => {
  const cookieName = `${cookieKey}=`;
  const cookieArray = document.cookie.split(';');

  for (const cookie of cookieArray) {
    const currentCookie = cookie.trim();

    if (currentCookie.indexOf(cookieName) === 0) {
      return currentCookie.substring(cookieName.length);
    }
  }

  return undefined;
};
