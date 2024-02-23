import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useRouter } from 'next/navigation';
import React, { useState } from "react";

export default function AdminMenu(props: { href: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const logout = () => {
        setLoading(true);
        sessionStorage.removeItem('token');
        router.push("/private/admin-panel/login");
    };

    const load = () => {
        setLoading(true);
    };

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
            <Box sx={{ backgroundColor: "#DEF38C", textAlign: "center" }}>
                <Grid container spacing={0} sx={{maxWidth: "1220px", margin: "0 auto", padding: "10px 0 0 0"}}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button href={props.href} variant="contained" sx={{
                            width: "175px",
                            marginBottom: "10px", backgroundColor: "#315133",
                            "&:hover": {
                                backgroundColor: "#D590BD",
                            }
                        }} onClick={load}>Retour</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button variant="contained" sx={{
                            width: "175px",
                            marginBottom: "10px", backgroundColor: "#315133",
                            "&:hover": {
                                backgroundColor: "#D590BD",
                            }
                        }} href="/private/admin-panel/projets" onClick={load}>PROJETS</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button variant="contained" sx={{
                            width: "175px",
                            marginBottom: "10px", backgroundColor: "#315133",
                            "&:hover": {
                                backgroundColor: "#D590BD",
                            }
                        }} href="/private/admin-panel/utilisateurs" onClick={load}>UTILISATEURS</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Button onClick={logout} variant="contained" sx={{
                            width: "175px",
                            marginBottom: "10px", backgroundColor: "#315133",
                            "&:hover": {
                                backgroundColor: "#D590BD",
                            }
                        }}>Se déconnecter</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}