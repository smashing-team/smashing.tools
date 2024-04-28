"use client";

import { Tables } from "@/supabase/database";
import { type User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

type UserContextType = {
  user: User | null;
  bookmarks: Tables<"bookmark">[] | null;
};

const UserContext = createContext<UserContextType>({
  user: null,
  bookmarks: [],
});

const UserProvider = ({
  children,
  user,
  bookmarks,
}: { children: React.ReactNode } & UserContextType) => {
  return (
    <UserContext.Provider
      value={{ user, bookmarks: bookmarks ? bookmarks : [] }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserProvider;
