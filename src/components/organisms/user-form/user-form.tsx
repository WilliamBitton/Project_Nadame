"use client"

import { postSignUp, putUser } from "@/api/api";
import { UserData } from "@/interface/interface";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, TextField, Button, Alert, AlertTitle, Snackbar, CircularProgress, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserForm({ userData }: { userData: UserData }) {
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
    const [alertOpen, setAlertOpen] = useState(false);
    const [modifyPassword, setModifyPassword] = useState<boolean>(false);

    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModifyPassword(event.target.checked);
        reset();
    };

    const passwordVal = yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères");
    const passwordConf = yup.string().oneOf([yup.ref('password')], 'Les mots de passe doivent être identique')

    const schema = yup.object({
        firstName: yup.string().min(3, "Le prénom doit comporter minimum 3 caractères").max(50, "Le prénom ne peut être composé de plus de 50 caractères").required("Le prénom est requis"),
        lastName: yup.string().min(3, "Le nom doit comporter minimum 3 caractères").max(50, "Le nom ne peut être composé de plus de 50 caractères").required("Le nom est requis"),
        email: yup.string().email("Le courriel doit être valide").required("Le courriel est requis"),
        password: (!userData._id || modifyPassword) ? passwordVal.required("Le mot de passe est requis") : passwordVal,
        passwordConfirmation: (!userData._id || modifyPassword) ? passwordConf.required("La confirmation est requise") : passwordConf
    });

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm<UserData>({
        defaultValues: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: undefined,
            passwordConfirmation: undefined
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const submit = async (user: UserData) => {
        setLoading(true);
        if (!userData._id) {
            try {
                await postSignUp(user);
                setAlertSeverity("success");
                setAlertMessage("L'utilisateur a été ajouté avec succès");
                setLoading(false);
                setAlertOpen(true);
                reset();
            } catch (error) {
                setAlertSeverity("error");
                setAlertMessage("Une erreur est survenue lors de la création de l'utilisateur");
                setLoading(false);
                setAlertOpen(true);
            }
        } else {
            try {
                await putUser(userData._id, user);
                setAlertSeverity("success");
                setAlertMessage("L'utilisateur a été modifié avec succès");
                setLoading(false);
                setAlertOpen(true);
            } catch (error) {
                setAlertSeverity("error");
                setAlertMessage("Une erreur est survenue lors de la modification de l'utilisateur");
                setLoading(false);
                setAlertOpen(true);
            }
        }
    };

    const cancel = () => {
        reset();
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
            <Box sx={{ backgroundColor: "white", padding: "20px", margin: "0 auto 80px auto", borderRadius: "4px", maxWidth: "1220px" }}>
                <form onSubmit={handleSubmit(submit)}>
                    <Grid container rowSpacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ backgroundColor: "white", borderRadius: "5px" }}
                                id="lastName"
                                label={"Nom"}
                                variant="outlined"
                                fullWidth
                                {...register("lastName")}
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ backgroundColor: "white", borderRadius: "5px" }}
                                multiline={true}
                                id="firstName"
                                label={"Prénom"}
                                variant="outlined"
                                fullWidth
                                {...register("firstName")}
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ backgroundColor: "white", borderRadius: "5px" }}
                                id="email"
                                label={"Courriel"}
                                variant="outlined"
                                fullWidth
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                required
                            />
                        </Grid>
                        {(!userData._id || modifyPassword) && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        sx={{ backgroundColor: "white", borderRadius: "5px" }}
                                        id="password"
                                        label={"Mot de passe"}
                                        variant="outlined"
                                        type="password"
                                        fullWidth
                                        {...register("password")}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        sx={{ backgroundColor: "white", borderRadius: "5px" }}
                                        id="passwordConfirmation"
                                        label={"Confirmer le mot de passe"}
                                        variant="outlined"
                                        type="password"
                                        fullWidth
                                        {...register("passwordConfirmation")}
                                        error={!!errors.passwordConfirmation}
                                        helperText={errors.passwordConfirmation?.message}
                                        required
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12} sx={{ textAlign: "right" }}>
                            {(userData._id) && (
                                <FormControlLabel
                                    sx={{ color: "black", margin: "10px" }}
                                    id="infolettre"
                                    label={"Modifier mot de passe"}
                                    control={
                                        <Checkbox
                                            style={{ color: '#D590BD' }}
                                            checked={modifyPassword}
                                            onChange={handleChangeCheckbox}
                                        />
                                    }
                                />
                            )}
                            <Button
                                sx={{
                                    margin: "10px",
                                    width: "100px",
                                    backgroundColor: "#F3F3F3",
                                    color: "#000000",
                                    "&:hover": {
                                        backgroundColor: "#ECECEC",
                                    },
                                }}
                                variant="contained"
                                onClick={cancel}
                                disabled={!isDirty}
                            >
                                {"Annuler"}
                            </Button>
                            <Button
                                sx={{
                                    margin: "10px", width: "100px", backgroundColor: "#315133",
                                    "&:hover": {
                                        backgroundColor: "#D590BD",
                                    }
                                }}
                                variant="contained"
                                type="submit"
                                disabled={!isValid || !isDirty}
                            >
                                {"Valider"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box >

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
            )
            }
        </>
    );
}