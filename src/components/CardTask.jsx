import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "../ui/FlexBetween";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

const CardTask = ({ item, removeBook }) => {
  const [isMouseOver, setIsMouseOver] = useState(null);
  return (
    <Box
      sx={{
        width: "100%",
        padding: "30px",
        border: "1px solid #EBEBEB",
        backgroundColor: "#FEFEFE",
        borderRadius: "12px",
        boxShadow: "0px 4px 24px 0px rgba(51, 51, 51, 0.08)",
        position: "relative",
      }}
      onMouseOver={() => setIsMouseOver(item.book.id)}
      onMouseLeave={() => setIsMouseOver(null)}
    >
      <Typography sx={{ fontSize: 16, color: "#151515", fontWeight: "600" }}>
        {item.book.title}
      </Typography>
      <Typography sx={{ fontSize: 14, color: "#151515", fontWeight: "400" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
        quaerat eos, veniam sit vitae cum accusantium, quidem sint nobis
      </Typography>
      <FlexBetween mt={"1rem"} gap="10px" alignItems={"start!important"}>
        <Typography sx={{ fontSize: 15, fontWeight: "500" }}>
          {item.book.author}: {item.book.published}-year
        </Typography>
        {/* <img
          style={{ width: "30px", height: "30px" }}
          src={item.book.cover}
          alt=""
        /> */}
        <Typography
          sx={{
            padding: "2px 12px",
            borderRadius: "8px",
            bgcolor: "#EFE6FD",
            fontSize: "12px",
            whiteSpace: "nowrap",
            color: "#9654F4",
          }}
          placement="right-end"
        >
          {item.book.pages} pages
        </Typography>
      </FlexBetween>
      {/* <Button onClick={() => addBook(book.isbn)}>Add my task</Button> */}
      <FlexBetween
        sx={{
          flexDirection: "column",
          gap: "4px",
          position: "absolute",
          top: "10%",
          left: "100%",
          visibility: item.book.id == isMouseOver ? "visible" : "hidden",
        }}
      >
        <IconButton
          sx={{
            bgcolor: "#FF4D4F",
            ":hover": { bgcolor: "#FF4D4F" },
            borderRadius: "6px 6px 6px 0",
            color: "white",
            padding: "5px",
          }}
          onClick={() => removeBook(item.book.id)}
        >
          <DeleteOutlineOutlinedIcon sx={{ fontSize: "22px" }} />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: "#6200EE",
            ":hover": { bgcolor: "#6200EE" },
            borderRadius: "6px 6px 6px 0",
            color: "white",
            padding: "5px",
          }}
        >
          <BorderColorOutlinedIcon sx={{ fontSize: "22px" }} />
        </IconButton>
      </FlexBetween>
    </Box>
  );
};

export default CardTask;
