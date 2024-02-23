"use client"
import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/system';
import Button from '@mui/joy/Button';

const StyledPaper = styled(Paper)({
    backgroundColor: "#DEF38C",
    color: "#315133",
    textAlign: "justify", 
    padding: "40px", 
});

const BoldText = styled('span')({
    fontWeight: 'bold',
    fontSize: "20px"
});

const ResponsiveGrid: React.FC = () => {
    return (
      <div style={{ backgroundColor: "#D5FA4A", width: "100%" }}>
        <Container maxWidth="lg">
          <Grid container rowSpacing={0} columnSpacing={0} style={{ backgroundColor: "#DEF38C", color: "#315133", marginBottom: "10px", textAlign: "center" }}>
            <Grid item xs={12} md={6} >
              <StyledPaper elevation={0} >
                <div style={{ backgroundColor: "#D5FA4A", fontSize: "24px", maxWidth: "500px", fontWeight: "bold", textAlign: "center", padding: "50px" }} >
                  <Typography>
                    <BoldText>VALEUR</BoldText>
                  </Typography>
                </div>
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledPaper elevation={0} style={{ maxWidth: "500px", padding: "50px", marginTop: "40px" }}>
              {"Créer des concepts de design d’intérieur qui répondent aux besoins des clients à mesure que leur vie change en ayant une approche ludique, durable et éco-énergétique."}
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledPaper elevation={0} style={{ backgroundColor: "#DEF38C", color: "#315133", textAlign: "center" }} >
                <Image
                  src="/mission.png"
                  alt="Mission Image"
                  width={200}
                  height={400}
                />
              </StyledPaper>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledPaper elevation={0}>
                <Typography>
                  <BoldText>Équilibre</BoldText><br />
                </Typography>
                    <Typography>
                        {"Nous nous engageons quotidiennement à créer des concepts de design d'intérieur harmonieux et à offrir un environnement de travail équilibré qui favorise le rythme travail/vie personnelle."}
                    </Typography>
                    <Typography>
                        <BoldText>Audace</BoldText><br />
                    </Typography>
                    <Typography>
                    {"Nadamé souhaite toujours offrir des idées uniques pour chaque projet de design d’intérieur et à sortir des sentiers battus en ajoutant une touche éclatée et colorée. Elle est prête à concrétiser les rêves les plus fous de ses clients sans tabous."}
                    </Typography>
                    <Typography>
                        <BoldText> Durabilité</BoldText><br />
                    </Typography>
                    <Typography>
                         {"Nadamé souhaite diminuer l’impact environnemental des rénovations en proposant des solutions durables en qualité et en esthétique."}
                    </Typography>
                    <Typography>
                        <BoldText> Positivisme</BoldText><br />
                    </Typography>
                    <Typography>
                        {" Nadamé souhaite travailler dans un environnement positif et amusant. Elle approche toutes les situations avec une attitude positive lui permettant d’aller de l’avant et de gérer efficacement toutes les situations possibles."}
                    </Typography>
                    <Typography>
                        <BoldText>  Engagement</BoldText><br />
                    </Typography>
                    <Typography>
                         {"L’équipe s’implique à fond dans chaque projet de design, ainsi qu’au sein de leur entreprise. Elle souhaite répondre le mieux possible aux besoins de leurs clients afin d’assurer leur satisfaction."}
                    </Typography>
                    </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ResponsiveGrid;
