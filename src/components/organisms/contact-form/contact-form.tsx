"use client";
import * as React from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postContact, postInfolettre } from "@/api/api";
import { ContactData } from '@/interface/interface';
import { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [infolettre, setInfolettre] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"error" | "warning" | "info" | "success">("success");
  const [alertOpen, setAlertOpen] = useState(false);

  const schema = yup.object({
    firstName: yup.string().min(3, "Le prénom doit comporter minimum 3 caractères").max(50, "Le prénom ne peut être composé de plus de 50 caractères").required("Le prénom est requis"),
    lastName: yup.string().min(3, "Le nom doit comporter minimum 3 caractères").max(50, "Le nom ne peut être composé de plus de 50 caractères").required("Le nom est requis"),
    email: yup.string().email("Doit être un courriel valide").max(50, "Le courriel ne peut être composé de plus de 50 caractères").matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Le courriel ne correspond pas au format attendu").required("Un courriel est requis"),
    address: yup.string(),
    phoneNumber: yup.string(),
    subject: yup.string().max(50, "Le sujet ne peut être composé de plus de 50 caractères").required("Un sujet est requis"),
    content: yup.string().max(1000, "Le message ne peut être composé de plus de 1000 caractères").required("Un message est requis")
  });

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfolettre(event.target.checked);
  };

  const submit = async (formData: ContactData) => {
    setLoading(true);
    try {
      await postContact(formData);
      setAlertSeverity("success");
      setAlertMessage("Message envoyé avec succès");
      setLoading(false);
      setAlertOpen(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      submitInfolettre(formData.email);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage("Une erreur est survenue");
      setLoading(false);
      setAlertOpen(true);
    }
  };

  const submitInfolettre = async (formData: String) => {
    if (infolettre) {
      try {
        await postInfolettre(formData);
        setAlertSeverity("success");
        setAlertMessage("Inscription à l'infolettre réussite");
        setAlertOpen(true);
      } catch (error) {
        setAlertSeverity("error");
        setAlertMessage("Une erreur est survenue lors de l'inscription à l'infolettre");
        setAlertOpen(true);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ContactData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      subject: "Demande de rendez-vous",
      content: ""
    },
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

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
      <form onSubmit={handleSubmit(submit)} action="/contact">
        <Grid container rowSpacing={3}>
          <Grid item xs={12} md={7} sx={{ padding: "5px" }}>
            <TextField
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
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
          <Grid item xs={12} md={5} sx={{ padding: "5px" }}>
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
          <Grid item xs={12} md={8} sx={{ padding: "5px" }}>
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
          <Grid item xs={12} md={4} sx={{ padding: "5px" }}>
            <TextField
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
              id="phoneNumber"
              label={"Numéro de téléphone"}
              variant="outlined"
              fullWidth
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </Grid>
          <Grid item xs={12} sx={{ padding: "5px" }}>
            <TextField
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
              id="address"
              label={"Adresse"}
              variant="outlined"
              fullWidth
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sx={{ padding: "5px" }}>
            <TextField
              sx={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "40px" }}
              id="content"
              multiline={true}
              rows={4}
              label={"Message"}
              variant="outlined"
              fullWidth
              {...register("content")}
              error={!!errors.content}
              helperText={errors.content?.message}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ padding: "5px" }}>
            <FormControlLabel
              sx={{ color: "black" }}
              id="infolettre"
              label={"Oui, je désire m'abonner à l'infolettre"}
              control={
                <Checkbox
                  style={{ color: '#D590BD' }}
                  checked={infolettre}
                  onChange={handleChangeCheckbox}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ textAlign: "right", padding: "5px" }}>
            <Button
              sx={{ backgroundColor: "#315133" }}
              variant="contained"
              type="submit"
              disabled={!isValid}
            >
              {"Demander un rendez-vous"}
            </Button>
          </Grid>
        </Grid>
      </form>

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