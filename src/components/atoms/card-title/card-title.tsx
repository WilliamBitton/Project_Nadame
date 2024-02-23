import { Typography, Box } from "@mui/material";
import React from "react";
import { HeaderData } from "@/interface/interface";

export default function CardTitle(props: HeaderData) {
    return (
        <>
            <Box sx={{padding: "80px 0 30px 0"}}>
                <Box sx={{ backgroundColor: "#D590BD", width: "200px", height: "50px", borderRadius: "5px", position: "relative", top: "10px", left: "10px" }}></Box>
                <Box sx={{ backgroundColor: "#315133", width: "200px", height: "50px", borderRadius: "5px", position: "relative", top: "-50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography sx={{ color: "white" }}>{props.title}</Typography>
                </Box>
            </Box>
        </>
    );
}