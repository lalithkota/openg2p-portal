'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";



interface ContextProps {
  formState: boolean,
  setFormState: Dispatch<SetStateAction<boolean>>,
  
}

const GlobalContext = createContext<ContextProps>({
  formState: false,
  setFormState: () => {}, 
})
export const GlobalContextProvider = ({children }: {children: React.ReactNode}) => {
  const [formState, setFormState] = useState(false);
  
  return (
    <GlobalContext.Provider value={{ formState, setFormState }}>
      {children}
    </GlobalContext.Provider>
  )
};

export const useGlobalContext = () => useContext(GlobalContext);