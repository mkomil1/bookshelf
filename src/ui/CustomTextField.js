import { TextField, styled } from "@mui/material";

export const CustomTextField = styled(TextField)({
  width: "100%",
  "& .MuiInputBase-input": {
    height: "47px",
    borderRadius: "6px",
  },
  "& .MuiInputBase-root": {
    borderRadius: "6px",
  },
});
