import { LinearProgress } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Registry } from "./pages";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMainContext } from "./context/MainContext";
import { useEffect } from "react";
import Home from "./pages/Home";
function App() {
  const { user, key, isLogged, getUserInfo, getUserBooks, header, isLoading } =
    useMainContext();

  useEffect(() => {
    if (key) {
      getUserInfo(header("myself"));
      getUserBooks(header("books"));
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

  if (!isLogged) {
    return <Registry />;
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {isLoading && (
          <LinearProgress
            sx={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
            }}
          />
        )}
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
