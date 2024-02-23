import { Typography, Box } from "@mui/material";
import React from "react";
import { HeaderData } from "@/interface/interface";

export default function Header(props: HeaderData) {
  return (
    <>
      <Box sx={{ margin: "50px" }}>
        <Typography
          sx={{
            fontSize: "30px",
            margin: "80px auto 30px auto",
            color: "#D590BD",
            textAlign: "center"
          }}
        >
          {props.title}
        </Typography>
      </Box>

    </>
  );
}