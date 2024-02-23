import { Typography, Box } from "@mui/material";
import React from "react";
import { HeaderData } from "@/interface/interface";

export default function Subheader(props: HeaderData) {
    return (
        <>
            <Box sx={{ margin: "50px" }}>
                <Typography
                    sx={{
                        margin: "0 auto 80px auto",
                        textAlign: "center",
                        maxWidth: "600px"
                    }}
                >
                    {props.title}
                </Typography>
            </Box>
        </>
    );
}