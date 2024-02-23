"use client"

import React, { useEffect, useState } from "react";
import { getProject } from "@/api/api";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { ProjectData } from "@/interface/interface";
import CardTitle from "@/components/atoms/card-title/card-title";

export default function Project({ params }: { params: { id: string } }) {
    const [projectData, setProjectData] = useState<ProjectData | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectData = await getProject(params.id);
                setProjectData(projectData.project);
                setSelectedImage(projectData.project.portfolioImgUrl);
            } catch (error) {
                setError("Error fetching project data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    const projectDataImg = projectData?.portfolioImgUrl || "";
    const projectDataTitle = projectData?.title || "";
    const carouselImgChange = (url: string) => {
        setSelectedImage(url);
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
            <Box sx={{ maxWidth: "800px", margin: "0 auto" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CardTitle title={projectDataTitle.toUpperCase()} />
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ width: "800px", height: "400px", maxHeight: "400px", flexShrink: 1, flexGrow: 1 }}>
                        <Box component="img" src={selectedImage || projectData?.portfolioImgUrl} alt={`Project Image`} sx={{ width: "100%", height: "100%", borderRadius: "10px", objectFit: "cover", objectPosition: "center center", minHeight: "350px" }} />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ maxWidth: "840px", margin: "0 auto" }}>
                <Grid container spacing={0} sx={{ textAlign: "center", margin: "10px auto", padding: "0 10px" }}>
                    <Grid item xs={6} sm={3} sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex" }}>
                            <Box sx={{ width: "200px", height: "100px", flexShrink: 1, flexGrow: 1 }}>
                                <Box onClick={() => carouselImgChange(projectDataImg)} component="img" src={projectData?.portfolioImgUrl} alt={`Project Image`} sx={{ width: "100%", height: "100%", borderRadius: "10px", objectPosition: "center center", objectFit: "cover", opacity: selectedImage === projectData?.portfolioImgUrl ? "1" : "0.5" }} />
                            </Box>
                        </Box>
                    </Grid>
                    {projectData?.portfolioProjectImgUrl.map((url: string) => (
                        <Grid item xs={6} sm={3} key={url} sx={{ padding: "10px" }}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ width: "200px", height: "100px", flexShrink: 1, flexGrow: 1 }}>
                                    <Box onClick={() => carouselImgChange(url)} component="img" src={url} alt={`Project Image`} sx={{ width: "100%", height: "100%", borderRadius: "10px", objectPosition: "center center", objectFit: "cover", opacity: selectedImage === url ? "1" : "0.5" }} />
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ maxWidth: "800px", margin: "0 auto" }}>
                <Box sx={{ margin: "80px 0", backgroundColor: "#D5FA49", borderRadius: "10px" }}>
                    <Typography sx={{ textAlign: "center", color: "black", padding: "80px 50px" }}>{projectData?.description}</Typography>
                </Box>
            </Box >
        </>
    );
};
