"use client";

import {ReactNode, createContext, useContext, useState} from "react";
import {Profile} from "@/types";

interface GlobalContextType {
  formState: boolean;
  profile?: Profile | null;
  setFormState: (_formState: boolean) => void;
  setProfile: (_profile: GlobalContextType["profile"]) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  formState: false,
  setFormState: () => {},
  setProfile: () => {},
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalContext");
  }
  return context;
};

export const useAuth = () => {
  const context = useGlobalContext();
  return {
    profile: context.profile,
    setProfile: context.setProfile,
  };
};

export const GlobalContextProvider = ({children}: {children: ReactNode}) => {
  const [formState, setFormState] = useState(false);
  const [profile, setProfile] = useState<GlobalContextType["profile"]>(undefined);

  return (
    <GlobalContext.Provider value={{formState, profile, setFormState, setProfile}}>
      {children}
    </GlobalContext.Provider>
  );
};
