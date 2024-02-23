"use client"

import { postProject, putProject } from "@/api/api";
import { ProjectData, ProjectForm } from "@/interface/interface";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, TextField, Button, Alert, AlertTitle, Snackbar, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ClearIcon from '@mui/icons-material/Clear';


export default function ProjectForm({ projectData }: { projectData: ProjectData }) {
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
    const [alertOpen, setAlertOpen] = useState(false);

    const schema = yup.object({
        title: yup.string().min(3, "Le titre doit comporter minimum 3 caractères").max(300, "Le titre ne peut être composé de plus de 300 caractères").required("Le titre est requis"),
        description: yup.string().min(3, "La description doit comporter minimum 3 caractères").max(300, "La description ne peut être composé de plus de 300 caractères").required("La description est requise"),
        portfolioImgUrl: yup.string().max(255, "Le lien ne peut être composé de plus de 255 caractères").required("Le lien est requis"),
        img1: yup.string().max(255, "Le lien ne peut être composé de plus de 255 caractères").required("Le lien est requis"),
        img2: yup.string().max(255, "Le lien ne peut être composé de plus de 255 caractères"),
        img3: yup.string().max(255, "Le lien ne peut être composé de plus de 255 caractères")
    }).required();

    const {
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors, isValid, isDirty },
    } = useForm<ProjectForm>({
        defaultValues: {
            title: projectData.title,
            description: projectData.description,
            portfolioImgUrl: projectData.portfolioImgUrl,
            img1: projectData.portfolioProjectImgUrl[0],
            img2: projectData.portfolioProjectImgUrl[1],
            img3: projectData.portfolioProjectImgUrl[2]
        },
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const submit = async (project: ProjectForm) => {
        const editProjectData: ProjectData = {
            title: project.title,
            description: project.description,
            portfolioImgUrl: project.portfolioImgUrl,
            portfolioProjectImgUrl: [
                project.img1,
                project.img2 || null,
                project.img3 || null
            ].filter(Boolean) as string[]
        }
        setLoading(true);
        if (!projectData._id) {
            try {
                await postProject(editProjectData);
                setAlertSeverity("success");
                setAlertMessage("Le projet a été ajouté avec succès");
                setLoading(false);
                setAlertOpen(true);
                reset();
            } catch (error) {
                setAlertSeverity("error");
                setAlertMessage("Une erreur est survenue lors de la création du projet");
                setLoading(false);
                setAlertOpen(true);
            }
        } else {
            try {
                await putProject(projectData._id, editProjectData);
                setAlertSeverity("success");
                setAlertMessage("Le projet a été modifié avec succès");
                setLoading(false);
                setAlertOpen(true);
            } catch (error) {
                setAlertSeverity("error");
                setAlertMessage("Une erreur est survenue lors de la modification du projet");
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
                                id="title"
                                label={"Titre"}
                                variant="outlined"
                                fullWidth
                                {...register("title")}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ backgroundColor: "white", borderRadius: "5px" }}
                                multiline={true}
                                id="description"
                                label={"Description"}
                                variant="outlined"
                                fullWidth
                                {...register("description")}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ backgroundColor: "white", borderRadius: "5px" }}
                                id="portfolioImgUrl"
                                label={"Image principale"}
                                variant="outlined"
                                fullWidth
                                {...register("portfolioImgUrl")}
                                error={!!errors.portfolioImgUrl}
                                helperText={errors.portfolioImgUrl?.message}
                                required
                            />
                        </Grid>
                        <Grid item xs={10} sm={11}>
                            <TextField
                                id={`img1`}
                                label={`Image 1`}
                                variant="outlined"
                                fullWidth
                                {...register(`img1`)}
                                error={!!errors.img1}
                                helperText={errors.img1?.message}
                                required
                            />
                        </Grid>
                        <Grid item xs={2} sm={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Button onClick={() => setValue("img1", "")}>
                                <ClearIcon style={{ color: "grey" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={10} sm={11}>
                            <TextField
                                id={`img2`}
                                label={`Image 2`}
                                variant="outlined"
                                fullWidth
                                {...register(`img2`)}
                                error={!!errors.img2}
                                helperText={errors.img2?.message}
                            />
                        </Grid>
                        <Grid item xs={2} sm={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Button onClick={() => setValue("img2", "")}>
                                <ClearIcon style={{ color: "grey" }} />
                            </Button>
                        </Grid>

                        <Grid item xs={10} sm={11}>
                            <TextField
                                id={`img3`}
                                label={`Image 3`}
                                variant="outlined"
                                fullWidth
                                {...register(`img3`)}
                                error={!!errors.img3}
                                helperText={errors.img3?.message}
                            />
                        </Grid>
                        <Grid item xs={2} sm={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Button onClick={() => setValue("img3", "")}>
                                <ClearIcon style={{ color: "grey" }} />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "right" }}>
                            <Button
                                sx={{
                                    margin: "10px",
                                    width: "100px",
                                    backgroundColor: "#F3F3F3",
                                    color: "#000000",
                                    "&:hover": {
                                        backgroundColor: "#ECECEC",
                                    }
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
                                disabled={!isValid}
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