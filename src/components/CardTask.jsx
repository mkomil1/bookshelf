import { Box, Typography } from "@mui/material";
import React from "react";
import FlexBetween from "../ui/FlexBetween";

const CardTask = ({ book }) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "30px",
        border: "1px solid #EBEBEB",
        backgroundColor: "#FEFEFE",
        borderRadius: "12px",
        boxShadow: "0px 4px 24px 0px rgba(51, 51, 51, 0.08)",
      }}
    >
      <Typography sx={{ fontSize: 16, color: "#151515", fontWeight: "600" }}>
        {book.title}
      </Typography>
      <Typography sx={{ fontSize: 14, color: "#151515", fontWeight: "400" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
        quaerat eos, veniam sit vitae cum accusantium, quidem sint nobis
      </Typography>

      <FlexBetween mt={"1rem"}>
        <Typography sx={{fontSize: 15, fontWeight: "500" }}>
          {book.author}: {book.published}-year
        </Typography>
        <img style={{width: "30px", height: "30px"}} src={book.cover} alt="" />
      </FlexBetween>
    </Box>
  );
};

export default CardTask;
