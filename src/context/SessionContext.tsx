import React, { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { createContext, useState } from "react"
import supabase from "../utils/supabase";

export const SessionContext = createContext<User | null>(null);

interface ISessionContextElementProps {
  element: React.ReactNode;
}

const SessionContextElement: React.FC<ISessionContextElementProps> = ({ element }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = async () => {
      const existedUser = await supabase.auth.getUser();

      if (existedUser.error || !existedUser.data) {
        const anonUser = await supabase.auth.signInAnonymously();
        setUser(anonUser.data.user);
      } else {
        setUser(existedUser.data.user);
      }
    }
    auth();

    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (session) {
        setUser(session.user);
      }
    })

    return () => {
      subscription.data.subscription.unsubscribe();
    }
  }, [])

  return (
    <SessionContext.Provider value={user}>
      {element}
    </SessionContext.Provider>
  )
}

export default SessionContextElement;