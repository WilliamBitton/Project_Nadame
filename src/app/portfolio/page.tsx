"use client"

import React, { useEffect, useState } from "react";
import Header from "@/components/atoms/header/header";
import { getProjects } from "@/api/api";
import { ProjectData, ProjectImgUrlAndIdData } from "@/interface/interface";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";
import Subheader from "@/components/atoms/subheader/subheader";

export default function Projects() {
    const [projectsImgUrlsAndIds, setProjectsImgUrlsAndIds] = useState<ProjectImgUrlAndIdData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsData = await getProjects();
                const imgUrlsAndIds = projectsData.projects.map((project: ProjectData) => ({ id: project._id, imgUrl: project.portfolioImgUrl }));
                setProjectsImgUrlsAndIds(imgUrlsAndIds);
            } catch (error) {
                setError("Error fetching project data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
    }

    if (error) {
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
                    <Typography>{error}</Typography>;
                </Box>
            </Box>
        )
    }

    return (
        <>
            <Header title="QUEL TYPE DE PROJET RECHERCHEZ-VOUS ?" />
            <Subheader title="Nous sommes fiers de concevoir des espaces et des environnements qui libèrent le potentiel humain." />
            <Box sx={{ margin: "34px" }}>
                <Grid container spacing={0} sx={{ textAlign: "center", margin: "0 auto", maxWidth: "1280px" }}>
                    {projectsImgUrlsAndIds?.map((projectImgUrlAndId: ProjectImgUrlAndIdData) => (
                        <Grid item xs={12} sm={6} md={4} key={projectImgUrlAndId.id} sx={{ padding: "30px" }}>
                            <Link onClick={load} href={`/portfolio/${projectImgUrlAndId.id}`}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ width: "200px", height: "300px", flexShrink: 1, flexGrow: 1 }}>
                                        <Box component="img" src={projectImgUrlAndId.imgUrl} alt={`Project Image`} sx={{ width: "100%", height: "100%", borderRadius: "10px", objectPosition: "center center", objectFit: "cover" }} />
                                    </Box>
                                </Box>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

