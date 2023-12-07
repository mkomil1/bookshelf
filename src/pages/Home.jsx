import React, { useCallback, useState } from "react";
import Navbar from "../components/Navbar";
import FlexBetween from "../ui/FlexBetween";
import { Box, Button, Typography } from "@mui/material";
import { CustomTextField } from "../ui/CustomTextField";
import AddIcon from "@mui/icons-material/Add";
import CardTask from "../components/CardTask";
import { debounce } from "lodash";
import { useMainContext } from "../context/MainContext";
import md5 from "md5";
import axios from "axios";
import { fetchBooks } from "../api";
const Home = () => {
  const { books } = useMainContext();
  return (
    <>
      <Navbar />
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
              You’ve got
            </Typography>
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#6200EE",
                letterSpacing: 0.576,
              }}
            >
              7 book
            </Typography>
          </FlexBetween>
          <FlexBetween gap="24px">
            <CustomTextField
              sx={{ background: "white", borderRadius: "6px", width: "320px" }}
              placeholder="Enter your name"
            />
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
          gap={"24px"}
          gridTemplateColumns={{
            sm: "repeat(2, minmax(0, 1fr ))",
            md: "repeat(3, minmax(0, 1fr ))",
            xl: "repeat(4, minmax(0, 1fr ))",
          }}
        >
          {books.map((item) => (
            <CardTask book={item} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Home;
