import { createContext, useContext, useEffect, useState } from "react";
import { getItem } from "../helpers/persistance-storage";

export const MainContext = createContext({});

export const useMainContext = () => {
  return useContext(MainContext);
};

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const key = getItem("key");
  const primaryKey = getItem("primaryKey");

  console.log(user);

  const contextValue = { setUser, user, key, primaryKey };
  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
