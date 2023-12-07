import React, { useCallback, useState } from "react";
import Navbar from "../components/Navbar";
import FlexBetween from "../ui/FlexBetween";
import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { CustomTextField } from "../ui/CustomTextField";
import AddIcon from "@mui/icons-material/Add";
import CardTask from "../components/CardTask";
import { debounce } from "lodash";
import { useMainContext } from "../context/MainContext";
import AddBoxIcon from "@mui/icons-material/AddBox";

function BookList({ book, idx, addBook }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          onClick={() => addBook(book.isbn)}
          edge="end"
          aria-label="comments"
        >
          <AddBoxIcon sx={{ color: "#6200EE" }} />
        </IconButton>
      }
      key={idx}
      component="div"
      disablePadding
    >
      <ListItemButton>
        <ListItemText sx={{ marginLeft: "2px" }} primary={`${book.title}`} />
      </ListItemButton>
    </ListItem>
  );
}

const Home = () => {
  const { books, addBook, handleSearchBooks, userBooks, removeBook, searchUserBooks } =
    useMainContext();

  const handleTextDobounce = useCallback(debounce(handleSearchBooks, 2000), []);


  return (
    <>
      <Navbar  />
      <Box padding="1rem 6%">
        <FlexBetween>
          <FlexBetween gap="10px">
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#fff",
                letterSpacing: 0.576,
              }}
            >
              {userBooks?.length ? "You’ve" : "You haven't"} got
            </Typography>
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#6200EE",
                letterSpacing: 0.576,
              }}
            >
              {userBooks?.length > 0 ? userBooks.length : "a"} book
            </Typography>
          </FlexBetween>
          <FlexBetween gap="24px">
            <Box sx={{ width: "320px", position: "relative" }}>
              <CustomTextField
                sx={{
                  background: "white",
                  borderRadius: "6px",
                  width: "320px",
                }}
                placeholder="Enter your name"
                onChange={(e) => handleTextDobounce(e.target.value)}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: "0px",
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "6px",
                  maxHeight: "400px",
                  overflow: "auto",
                  zIndex: 100,
                  marginTop: "10px",
                  "&::-webkit-scrollbar": {
                    width: "0.5em",
                  },
                }}
              >
                {books &&
                  books.map((item, idx) => (
                    <BookList book={item} idx={idx} addBook={addBook} />
                  ))}
              </Box>
            </Box>
            <Button
              sx={{
                borderColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                padding: "10px 24px",
                textTransform: "none",
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "#6200EE",
                },
                fontSize: 16,
                backgroundColor: "#6200EE",
              }}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Create a book
            </Button>
          </FlexBetween>
        </FlexBetween>
        <Typography fontSize={20} color="#FEFEFE" fontWeight={400}>
          Your task today
        </Typography>
        <Box
          mt="2rem"
          display={"grid"}
          gap={"34px"}
          gridTemplateColumns={{
            sm: "repeat(2, minmax(0, 1fr ))",
            lg: "repeat(3, minmax(0, 1fr ))",
            xl: "repeat(4, minmax(0, 1fr ))",
          }}
        >
          {searchUserBooks &&
            searchUserBooks.map((item, idx) => (
              <CardTask removeBook={removeBook} item={item} key={idx} />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default Home;
