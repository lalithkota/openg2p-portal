"use client";

import {createContext, useContext, useState} from "react";

interface GlobalContextType {
  formState: boolean;
  profile: {
    sub?: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    picture?: string;
    email?: string;
    gender?: string;
    birthdate?: string;
    address?: any;
    phone_number?: string;
  } | null;
  setFormState: (_formStaet: boolean) => void;
  setProfile: (_profile: GlobalContextType["profile"]) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  formState: false,
  setFormState: () => {},
  profile: {},
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
  return {profile: context.profile, setProfile: context.setProfile};
};

export const GlobalContextProvider = ({children}: {children: React.ReactNode}) => {
  const [formState, setFormState] = useState(false);
  const [profile, setProfile] = useState<GlobalContextType["profile"]>(null);

  return (
    <GlobalContext.Provider value={{formState, profile, setFormState, setProfile}}>
      {children}
    </GlobalContext.Provider>
  );
};
