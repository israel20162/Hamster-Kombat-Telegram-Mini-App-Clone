import React, { useState, createContext } from "react";

export type AppContextTypes = {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

export const AppContext = createContext<AppContextTypes | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [page, setPage] = useState("Exchange");

  return (
    <AppContext.Provider value={{ page: page, setPage: setPage }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
