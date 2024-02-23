"use client"
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Alert, AlertTitle, Box, CircularProgress, Grid, Snackbar, Typography } from '@mui/material';
import styles from "../../../app/page.module.css";
import { postInfolettre } from '@/api/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { EmailData } from '@/interface/interface';

export default function InfolettreForm() {
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
    const [alertOpen, setAlertOpen] = useState(false);
    const schema = yup.object({
        email: yup.string().email("Doit être un courriel valide").max(50, "Le courriel ne peut être composé de plus de 50 caractères").matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Le courriel ne correspond pas au format attendu").required("Un courriel est requis"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EmailData>({
        defaultValues: {
            email: "",
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const submit = async (formData: EmailData) => {
        setLoading(true);
        try {
            console.log(formData.email);
            await postInfolettre(formData.email);

            setAlertSeverity("success");
            setAlertMessage("Inscription avec succès");
            setLoading(false);
            setAlertOpen(true);
        } catch (error) {
            setAlertSeverity("error");
            setAlertMessage("Une erreur est survenue");
            setLoading(false);
            setAlertOpen(true);
        }
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
            {/* Col3 - Form*/}
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'rigth' } }}>
                <Grid style={{ marginTop: 80, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80px' }}>
                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: { xs: '60px', md: '0px' } }}>
                        Vous voulez plus d&#x2019;inspiration?
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', marginTop: 1 }}>
                        Restez au courant des tendances en matière de décoration dans notre infolettre.
                    </Typography>
                    <form
                        style={{
                            marginTop: 15,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        onSubmit={handleSubmit(submit)}
                        action="/Infolettre"
                    >
                        <input
                            {...register("email")}
                            placeholder="Courriel"
                            style={{
                                marginBottom: 10,
                                width: '100%',
                                height: '20px',
                                border: 'none',
                                padding: '5px',
                                borderRadius: '4px',
                            }}
                        />
                        <Button
                            variant="contained"
                            disabled={!isValid}
                            type="submit"
                            sx={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: 'fit-content',
                                backgroundColor: "#D590BD",
                                "&:hover": {
                                    backgroundColor: "#315133",
                                }
                            }}
                        >
                            ENVOYER
                        </Button>
                    </form>
                </Grid>
            </Grid>
            {alertMessage && (
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={3000}
                    onClose={() => setAlertOpen(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity={alertSeverity}>
                        {alertSeverity === "success" && <AlertTitle>Succès</AlertTitle>}
                        {alertSeverity === "error" && <AlertTitle>Erreur</AlertTitle>}
                        {alertMessage}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
}
