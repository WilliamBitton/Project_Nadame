"use client"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UserLoginData } from "@/interface/interface";
import { postLogin } from "@/api/api";
import { Snackbar, Alert, AlertTitle, Button, Grid, TextField, Box, CircularProgress } from "@mui/material";
import { useRouter } from 'next/navigation'
import CardTitle from "@/components/atoms/card-title/card-title";

export default function Login() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
    const [alertOpen, setAlertOpen] = useState(false);

    const schema = yup.object({
        email: yup.string().email("Doit être un courriel valide").max(50, "Le courriel ne peut être composé de plus de 50 caractères").required("Un courriel est requis"),
        password: yup.string().min(6, "Le mot de passe doit contenir un minimum de 6 caractères").required("Le mot de passe est requis")
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<UserLoginData>({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const submit = async (login: UserLoginData) => {
        setLoading(true);
        try {
            const token = await postLogin(login);
            sessionStorage.setItem('token', token.token);
            router.push("/private/admin-panel");
        } catch (error) {
            setAlertSeverity("error");
            setAlertMessage("Une erreur est survenue lors de la connexion");
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
            <Box sx={{ margin: "0 auto", display: "flex", justifyContent: "center", maxWidth: "1000px" }}>
                <CardTitle title={"CONNEXION"} />
            </Box>
            <Box sx={{ margin: "0 auto", display: "flex", justifyContent: "center", maxWidth: "1000px", padding: "0 20px 80px 20px" }}>
                <form onSubmit={handleSubmit(submit)} action="/login">
                    <Grid container rowSpacing={3}>
                        <Grid item xs={12} sx={{ padding: "5px" }}>
                            <TextField
                                sx={{ backgroundColor: "white", borderRadius: "5px" }}
                                id="email"
                                label={"Email"}
                                variant="outlined"
                                fullWidth
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ padding: "5px" }}>
                            <TextField
                                sx={{ backgroundColor: "white", borderRadius: "5px" }}
                                id="password"
                                label={"Mot de pase"}
                                variant="outlined"
                                type="password"
                                fullWidth
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "right", padding: "5px" }}>
                            <Button
                                sx={{
                                    backgroundColor: "#315133",
                                    "&:hover": {
                                        backgroundColor: "#D590BD",
                                    }
                                }}
                                variant="contained"
                                type="submit"
                                disabled={!isValid}
                            >
                                {"Se connecter"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            {alertMessage && (
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={3000}
                    onClose={() => setAlertOpen(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity={alertSeverity}>
                        <AlertTitle>{alertSeverity}</AlertTitle>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            )}
        </>
    )
}