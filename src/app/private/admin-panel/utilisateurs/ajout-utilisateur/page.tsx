"use client"

import AdminMenu from "@/components/molecules/admin-menu/admin-menu";
import CardTitle from "@/components/atoms/card-title/card-title";
import UserForm from "@/components/organisms/user-form/user-form";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AddUser() {
    const [loading, setLoading] = useState(true);
    const userData = { firstName: "", lastName: "", email: "" };
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
            <AdminMenu href="/private/admin-panel/utilisateurs" />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CardTitle title="AJOUT" />
            </Box>
            <UserForm userData={userData} />
        </>
    );
}