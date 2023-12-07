import { createContext, useContext, useEffect, useState } from "react";
import { getItem } from "../helpers/persistance-storage";
import { fetchBooks } from "../api";
import md5 from "md5";

export const MainContext = createContext({});

export const useMainContext = () => {
  return useContext(MainContext);
};

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const key = getItem("key");
  const primaryKey = getItem("primaryKey");
  const [books, setbooks] = useState([]);
  const [isLogged, setIsLogged] = useState(Boolean(key))

  const handleSearchBooks = async (searchText) => {
    if (searchText && searchText.length > 3) {
      const header = {
        Key: key,
        Sign: md5(`GET/books/${searchText}${primaryKey}`)
      };
      await fetchBooks(searchText, header)
        .then(({ data }) => {
          console.log(data);
          const limitData = data.data.slice(0, 10);
          setbooks(limitData);
        })
        .catch((err) => console.log(err));
    } else {
      setbooks([])
    }
  };

  const contextValue = {
    setUser,
    user,
    key,
    primaryKey,
    handleSearchBooks,
    books,
    setbooks,
    isLogged,
    setIsLogged
  };
  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
