"use client"

import { getProject } from "@/api/api";
import AdminMenu from "@/components/molecules/admin-menu/admin-menu";
import CardTitle from "@/components/atoms/card-title/card-title";
import ProjectForm from "@/components/organisms/project-form/project-form";
import { ProjectData } from "@/interface/interface";
import { Snackbar, Alert, AlertTitle, Box, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function ModifyProject({ params }: { params: { id: string }; }) {
    const [loading, setLoading] = useState(true);
    const [projectData, setProjectData] = useState<ProjectData>();
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
    const [alertOpen, setAlertOpen] = useState(false);
    const [tokenCheck, setTokenCheck] = useState(false);
    const router = useRouter();
    const token = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('token') : null;

    useEffect(() => {
        if (token == null) {
            router.push("/private/admin-panel/login");
        } else {
            setTokenCheck(true);
        }
    }, [router, token])

    useEffect(() => {
        if (tokenCheck) {
            const fetchData = async () => {
                try {
                    const projectData = await getProject(params.id);
                    setProjectData(projectData.project);
                    setLoading(false);
                } catch (error) {
                    setAlertSeverity("error");
                    setAlertMessage("Une erreur est survenue lors de l'importation du projet");
                    setLoading(false);
                    setAlertOpen(true);
                }
            };
            fetchData();
        }
    }, [params.id, tokenCheck]);

    if (loading || !tokenCheck) {
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
            <AdminMenu href="/private/admin-panel/projets" />
            {projectData && (
                <>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CardTitle title="MODIFICATION" />
                    </Box>
                    <ProjectForm projectData={projectData} />
                </>
            )}

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
    );
}