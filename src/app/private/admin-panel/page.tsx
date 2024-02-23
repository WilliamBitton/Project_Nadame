"use client"

import AdminMenu from "@/components/molecules/admin-menu/admin-menu";
import CardTitle from "@/components/atoms/card-title/card-title";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function AdminPanel() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('token') : null;

    useEffect(() => {
        if (token == null) {
            router.push("/private/admin-panel/login");
        } else {
            setLoading(false);
        }
    }, [router, token])

    if (loading) {
        return (
            <Box sx={{ height: "100vh", maxHeight: "100%", width: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <CircularProgress />
                </Box>
            </Box>
        )
    };

    return (
        <>
            <AdminMenu href="/private/admin-panel/login" />

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CardTitle title="ACCUEIL" />
            </Box>

            <Box sx={{margin: "0 auto 80px 0"}}>
                <Typography sx={{ margin: "20px 0 20px 0", fontSize: "30px", textAlign: "center" }}>{"Panneau d'administration de Nadamé design d'intérieur"}</Typography>
            </Box>
        </>
    );
}