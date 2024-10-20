'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type GlobalParkingNameType = {
  parkingName: string; // parkingName은 string 값이어야 함
  setParkingName: (val: string) => void; // string 값을 받는 함수
};

const GlobalParkingNameContext = createContext<
  GlobalParkingNameType | undefined
>(undefined);

export const GlobalParkingNameProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [parkingName, setParkingName] = useState<string>(''); // parkingName은 string 값

  return (
    <GlobalParkingNameContext.Provider value={{ parkingName, setParkingName }}>
      {children}
    </GlobalParkingNameContext.Provider>
  );
};

export const useGlobalParkingNameState = () => {
  const context = useContext(GlobalParkingNameContext);
  if (!context) {
    throw new Error(
      'useGlobalParkingNameState must be used within a GlobalParkingNameProvider',
    );
  }
  return context;
};
