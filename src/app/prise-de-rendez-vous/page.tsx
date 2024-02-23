"use client";
import CardTitle from "@/components/atoms/card-title/card-title";
import Header from "@/components/atoms/header/header";
import Subheader from "@/components/atoms/subheader/subheader";
import ContactForm from "@/components/organisms/contact-form/contact-form";
import { Box, Typography, Grid } from "@mui/material";

export default function Rdv() {

  return (
    <>
      <Header title="PRISE DE RENDEZ-VOUS" />
      <Subheader title={"Nous sommes fiers de concevoir des espaces et des environnements qui libèrent le potentiel humain."} />
      <Box sx={{ backgroundColor: "#D5FA49", padding: "0px 20px 80px 20px" }}>
        <Box sx={{ maxWidth: "800px", margin: "0 auto" }}>
          <CardTitle title="CONTACTEZ-NOUS" />
          <ContactForm />
        </Box>
      </Box >
      <Grid container spacing={0} sx={{ maxWidth: "800px", margin: "0 auto", padding: "70px 0 70px 0", textAlign: "center" }}>
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "25px", color: "#315133", margin: "10px 0 10px 0" }}>SUIVEZ-NOUS</Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ margin: "10px 0 10px 0" }}>
          <Box component="img" src="/facebook.svg" sx={{ margin: "0 5px 0 5px" }} width={40} />
          <Box component="img" src="/instagram.svg" sx={{ margin: "0 5px 0 5px" }} width={40} />
          <Box component="img" src="/linkedin.svg" sx={{ margin: "0 5px 0 5px" }} width={40} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography sx={{ fontSize: "25px", color: "#315133", margin: "10px 0 10px 0" }}>TAGUEZ-NOUS</Typography>
        </Grid>
      </Grid>
    </>
  );
}
