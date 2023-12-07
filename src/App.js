import { Alert, Button, LinearProgress } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Registry } from "./pages";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useMainContext } from "./context/MainContext";
import { fetchUserInfo } from "./api";
import { useEffect, useRef, useState } from "react";
import Home from "./pages/Home";
import md5 from "md5";
function App() {
  const { setUser, user, key, primaryKey, isLogged } = useMainContext();
  const [isLoading, setIsLoading] = useState(false);
  const header = {
    Key: key ? key : "",
    Sign: primaryKey ? md5(`GET/myself${primaryKey}`) : "",
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
  useEffect(() => {
    if (key) {
      // getUserInfo(header);
    }
  }, []);
  const theme = createTheme({
    components: {
      overrides: {
        MuiInputBase: {
          input: {
            background: "#000",
            padding: 10,
            color: "red",
            height: "10px",
          },
        },
      },
    },
  });

  if(!isLogged) {
    return <Registry />
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoading && <LinearProgress sx={{position: "absolute", top:"0px", left: "0px", width: "100%"}} />}
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
