"use client"
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import CardTitle from '@/components/atoms/card-title/card-title';
import { Container } from '@mui/material';

const ResponsiveGridCards: React.FC = () => {
    return (
        <Container maxWidth="lg" style={{ textAlign: 'center' }}>
            <div style={{ textAlign: 'center' }}>
                <Typography variant="h4" component="div" sx={{ color: '#D590BD', marginBottom: '50px', marginTop: '50px', '@media (min-width:0px) and (max-width:600px)': { fontSize: 'h6.fontSize' } }}>
                    PLUS DE 155 VIES TRANSFORMÉES
                </Typography>
            </div>
            <Grid container spacing={3} sx={{ '@media (max-width:600px)': { justifyContent: 'center'} }}>
                <Grid item lg={4} sx={{ margin: '0px', width: '300px', height: '350px' }}>
                    <Paper sx={{ width: '250px', maxWidth: '400px', objectPosition: "center center", objectFit: "cover", height: "200px", margin: 'auto' }} component='img' src='/projets.png' />
                    <Box sx={{ position: "relative", top: "-100px", width: '210px', maxWidth: '400px', margin: 'auto' }}>
                        <CardTitle title={'35 Projets par an'} />
                    </Box>
                </Grid>
                <Grid item md={4} sx={{ margin: '0px', width: '300px', height: '350px' }}>
                    <Paper sx={{ width: '250px', maxWidth: '400px', objectPosition: "center center", objectFit: "cover", height: "200px", margin: 'auto' }} component='img' src='/amelieNadia.png' />
                    <Box sx={{ position: "relative", top: "-100px", width: '210px', maxWidth: '400px', margin: 'auto' }}>
                        <CardTitle title={'120 Sourires conquis'} />
                    </Box>
                </Grid>
                <Grid item sm={4} sx={{ margin: '0px', width: '300px', height: '350px' }}>
                    <Paper sx={{ width: '250px', maxWidth: '400px', objectPosition: "center center", objectFit: "cover", height: "200px", margin: 'auto' }} component='img' src='/livres.png' />
                    <Box sx={{ position: "relative", top: "-100px", width: '210px', maxWidth: '400px', margin: 'auto' }}>
                        <CardTitle title={"12 000 m2 d'environnements livrés"} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ResponsiveGridCards;