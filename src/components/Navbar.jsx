import React, { useState } from "react";
import FlexBetween from "../ui/FlexBetween";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import searchIcon from "../assets/search-refraction.png";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { deepPurple } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import { useMainContext } from "../context/MainContext";
import { removeItem } from "../helpers/persistance-storage";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  padding: "10px 0px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  top: "0",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "300px",
    },
  },
}));

const Navbar = () => {
  const { setIsLogged, user, setSearchValue } = useMainContext();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <FlexBetween padding="1rem 6%">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FlexBetween gap="20px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.2965 13.8285C23.4013 13.933 23.4844 14.0571 23.5411 14.1938C23.5978 14.3305 23.627 14.477 23.627 14.625C23.627 14.773 23.5978 14.9195 23.5411 15.0562C23.4844 15.1928 23.4013 15.317 23.2965 15.4215L16.5465 22.1715C16.442 22.2763 16.3179 22.3594 16.1812 22.4161C16.0445 22.4728 15.898 22.502 15.75 22.502C15.602 22.502 15.4555 22.4728 15.3188 22.4161C15.1822 22.3594 15.058 22.2763 14.9535 22.1715L11.5785 18.7965C11.4739 18.6919 11.3909 18.5677 11.3343 18.4311C11.2777 18.2944 11.2486 18.1479 11.2486 18C11.2486 17.8521 11.2777 17.7056 11.3343 17.5689C11.3909 17.4323 11.4739 17.3081 11.5785 17.2035C11.6831 17.0989 11.8073 17.0159 11.944 16.9593C12.0806 16.9027 12.2271 16.8736 12.375 16.8736C12.5229 16.8736 12.6694 16.9027 12.8061 16.9593C12.9427 17.0159 13.0669 17.0989 13.1715 17.2035L15.75 19.7842L21.7035 13.8285C21.808 13.7237 21.9322 13.6406 22.0688 13.5839C22.2055 13.5272 22.352 13.498 22.5 13.498C22.648 13.498 22.7945 13.5272 22.9312 13.5839C23.0679 13.6406 23.192 13.7237 23.2965 13.8285Z"
                fill="white"
              />
              <path
                d="M9.9135 7.5195C12.1623 5.5803 15.0305 4.50931 18 4.5C24.0525 4.5 29.0768 9 29.6235 14.8027C33.2055 15.309 36 18.3082 36 21.9893C36 26.0302 32.6295 29.25 28.5457 29.25H8.50725C3.843 29.25 0 25.5735 0 20.9655C0 16.9987 2.8485 13.7137 6.6195 12.8812C6.94125 10.9395 8.19 9.0045 9.9135 7.5195ZM11.3827 9.22275C9.6795 10.692 8.7885 12.4628 8.7885 13.8488V14.8568L7.78725 14.967C4.644 15.3112 2.25 17.892 2.25 20.9655C2.25 24.2663 5.0175 27 8.50725 27H28.5457C31.455 27 33.75 24.723 33.75 21.9893C33.75 19.2532 31.455 16.9762 28.5457 16.9762H27.4207V15.8512C27.423 10.8563 23.238 6.75 18 6.75C15.5697 6.75971 13.2229 7.63748 11.3827 9.225V9.22275Z"
                fill="#6200EE"
              />
            </svg>
            <FlexBetween gap="6px">
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#6200EE",
                  letterSpacing: 0.576,
                }}
              >
                Books
              </Typography>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#fff",
                  letterSpacing: 0.576,
                }}
              >
                List
              </Typography>
            </FlexBetween>
          </FlexBetween>
          <Search>
            <SearchIconWrapper>
              <img src={searchIcon} alt="" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for any training you want "
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Search>
        </Box>
        <FlexBetween gap="1rem">
          <Tooltip sx={{ cursor: "pointer" }}>
            <Badge color="error" size="small" variant="dot" overlap="circular">
              <NotificationsOutlinedIcon
                sx={{ color: "black", fontSize: "30px" }}
              />
            </Badge>
          </Tooltip>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: deepPurple[500],
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography textAlign="center">{user.name}</Typography>
              </MenuItem>

              <MenuItem>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    handleCloseUserMenu();
                    removeItem("key");
                    removeItem("primaryKey");
                    setIsLogged(false);
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Navbar;
