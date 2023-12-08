import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { getItem } from "../helpers/persistance-storage";
import {
  deleteBook,
  fetchBooks,
  fetchUserBooks,
  fetchUserInfo,
  postBook,
} from "../api";
import md5 from "md5";
import { useSnackbar } from "notistack";
export const MainContext = createContext({});

export const useMainContext = () => {
  return useContext(MainContext);
};

export const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const key = getItem("key");
  const primaryKey = getItem("primaryKey");
  const [books, setbooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [isLogged, setIsLogged] = useState(Boolean(key));
  const [isLoading, setIsLoading] = useState(true);
  const [isDisbable, setIsDisable] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const header = (url) => {
    const header = {
      Key: key ? key : "",
      Sign: primaryKey ? md5(`GET/${url}${primaryKey}`) : "",
    };
    return header;
  };

  const getUserInfo = async (header) => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await fetchUserInfo(header);
      setUser(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getUserBooks = async (header) => {
    try {
      const {
        data: { data },
      } = await fetchUserBooks(header);
      setUserBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchBooks = (searchText) => {
    if (searchText && searchText.length > 3) {
      setIsLoading(true);
      const header = {
        Key: key,
        Sign: md5(`GET/books/${searchText}${primaryKey}`),
      };
      fetchBooks(searchText, header)
        .then(({ data }) => {
          const limitData = data.data.slice(0, 10);
          setbooks(limitData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setbooks([]);
    }
  };

  const getNewUsersBooks = useCallback((key, primaryKey) => {
    const header = {
      Key: key ? key : "",
      Sign: primaryKey ? md5(`GET/books${primaryKey}`) : "",
    };
    getUserBooks(header);
  }, []);

  const addBook = async (isbn) => {
    const isbnJ = JSON.stringify({ isbn: String(isbn) });
    const header = {
      Key: key,
      Sign: md5(`POST/books${isbnJ}${primaryKey}`),
    };
    try {
      const { data } = await postBook(header, { isbn: isbn });
      getNewUsersBooks(key, primaryKey);
      if (data.isOk) {
        enqueueSnackbar("New book added", { variant: "success" });
      }
      setbooks([]);
    } catch (error) {
      console.log(error);
      let errMsg = error?.response?.data?.message;
      if (errMsg == "Book with this isbn already exists") {
        enqueueSnackbar("this is a book already exists", {
          variant: "warning",
        });
      }
    }
  };

  const removeBook = async (id) => {
    const header = {
      Key: key ? key : "",
      Sign: primaryKey ? md5(`DELETE/books/${id}${primaryKey}`) : "",
    };
    try {
      const { data } = await deleteBook(id, header);
      getNewUsersBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const searchUserBooks = userBooks
    ? userBooks.filter((c) =>
        c.book.title.toLowerCase().includes(searchValue.toLowerCase().trim())
      )
    : [];

  const contextValue = {
    setUser,
    user,
    key,
    primaryKey,
    getUserInfo,
    header,
    handleSearchBooks,
    books,
    setbooks,
    isLogged,
    setIsLogged,
    addBook,
    getUserBooks,
    isLoading,
    setIsLoading,
    userBooks,
    removeBook,
    isDisbable,
    setIsDisable,
    searchUserBooks,
    setSearchValue,
    enqueueSnackbar,
  };
  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
