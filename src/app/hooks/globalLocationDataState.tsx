'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type GlobalLocationDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locationData: { [key: string]: any };
  setLocationData: (val: object) => void;
};

const GlobalLocationDataContext = createContext<
  GlobalLocationDataType | undefined
>(undefined);

export const GlovalLocationStateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [locationData, setLocationData] = useState<object>([]);

  return (
    <GlobalLocationDataContext.Provider
      value={{ locationData, setLocationData }}
    >
      {children}
    </GlobalLocationDataContext.Provider>
  );
};

export const useGlobalLocationState = () => {
  const context = useContext(GlobalLocationDataContext);
  if (!context) {
    throw Error(
      'useGlobalLocationState must be used within a GlobalStateProvider',
    );
  }
  return context;
};
