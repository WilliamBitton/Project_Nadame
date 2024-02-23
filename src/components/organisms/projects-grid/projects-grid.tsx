"use client"

import { useEffect, useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { deleteProject } from "@/api/api";
import { Snackbar, Alert, AlertTitle, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { EditProjectData } from "@/interface/interface";
import DeleteIcon from '@mui/icons-material/Delete';;
import EditIcon from '@mui/icons-material/EditSharp'
import { useRouter } from "next/navigation";

export default function ProjectsGrid({ projectsData }: { projectsData: EditProjectData[] }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [rows, setRows] = useState<{ id: string; title: string; description: string }[]>([]);
    const [deleteProjectId, setDeleteProjectId] = useState<string | "">("");
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
    const [alertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        setRows(projectsData.map((project: EditProjectData) => ({
            id: project._id,
            title: project.title,
            description: project.description
        })));
        setLoading(false)
    }, [projectsData]);

    const columns: GridColDef[] = [
        {
            field: 'title',
            headerName: 'Nom du projet',
            editable: false,
            width: 125
        },
        {
            field: 'description',
            headerName: 'Description',
            editable: false,
            minWidth: 75,
            flex: 1
        },
        {
            field: "delete",
            headerName: "",
            filterable: false,
            sortable: false,
            width: 75,
            renderCell: (params: GridCellParams) => (
                <Button
                    onClick={() => handleDeleteButtonClick(params)}
                >
                    <DeleteIcon style={{ color: "grey" }} />
                </Button>
            )
        },
        {
            field: "modify",
            headerName: "",
            renderCell: (params: GridCellParams) => (
                <Button
                    onClick={() => ModifyButtonClick(params)}
                >
                    <EditIcon style={{ color: "#315133" }} />
                </Button>
            ),
            headerAlign: "center",
            align: "center",
            filterable: false,
            sortable: false,
            width: 75
        }
    ];

    const handleDeleteButtonClick = (params: GridCellParams) => {
        setDeleteProjectId(params.row.id);
        setConfirmDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setConfirmDeleteOpen(false);
        setLoading(true);

        try {
            await deleteProject(deleteProjectId);
            setRows((prevRows) =>
                prevRows.filter((row) => row.id !== deleteProjectId)
            );
            setAlertSeverity("success");
            setAlertMessage("Projet supprimé avec succès");
            setLoading(false)
            setAlertOpen(true);
        } catch (error) {
            setAlertSeverity("error");
            setAlertMessage("erreur lors de la suppression du projet");
            setLoading(false)
            setAlertOpen(true);
        }
    };

    const ModifyButtonClick = (params: GridCellParams) => {
        setLoading(true);
        router.push(`/private/admin-panel/projets/${params.row.id}`);
    };

    const AddProjectButtonClick = () => {
        setLoading(true);
        router.push(`/private/admin-panel/projets/ajout-projet`);
    }

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
            <Box sx={{ backgroundColor: "white", padding: "10px", margin: "0 auto 80px auto", borderRadius: "4px", maxWidth: "1220px" }}>
                <Box sx={{ display: "flex", wrap: "noWrap" }}>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Button onClick={() => AddProjectButtonClick()} variant="contained" sx={{
                        marginBottom: "10px", backgroundColor: "#315133",
                        "&:hover": {
                            backgroundColor: "#D590BD",
                        }
                    }}>Ajouter un projet</Button>
                </Box>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection={false}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[3]}
                    disableRowSelectionOnClick
                />
            </Box>

            <Dialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Suppression de projet"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Voulez-vous supprimer ce projet ?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)}>
                        {"Annuler"}
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                        {"Supprimer"}
                    </Button>
                </DialogActions>
            </Dialog>

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