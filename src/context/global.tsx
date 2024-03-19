"use client";

import {ReactNode, createContext, useContext, useState} from "react";

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
  profileObtained: boolean;
  setFormState: (_formState: boolean) => void;
  setProfile: (_profile: GlobalContextType["profile"]) => void;
  setProfileObtained: (_profileObtained: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  formState: false,
  setFormState: () => {},
  profile: {},
  setProfile: () => {},
  profileObtained: false,
  setProfileObtained: () => {},
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
    profileObtained: context.profileObtained,
    setProfileObtained: context.setProfileObtained,
  };
};

export const GlobalContextProvider = ({children}: {children: ReactNode}) => {
  const [formState, setFormState] = useState(false);
  const [profile, setProfile] = useState<GlobalContextType["profile"]>(null);
  const [profileObtained, setProfileObtained] = useState(false);

  return (
    <GlobalContext.Provider
      value={{formState, profile, profileObtained, setFormState, setProfile, setProfileObtained}}
    >
      {children}
    </GlobalContext.Provider>
  );
};
