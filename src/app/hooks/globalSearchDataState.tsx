'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type GlobalSearchDataType = {
  searchData: boolean;
  setSearchData: (val: boolean) => void;
};

const GlobalStateContext = createContext<GlobalSearchDataType | undefined>(
  undefined,
);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<boolean>(false);

  return (
    <GlobalStateContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
