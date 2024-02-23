"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styles from "../../../app/page.module.css";
import { postInfolettre } from '@/api/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { EmailData } from '@/interface/interface';
import InfolettreForm from '@/components/organisms/infolettre-form/infolettre-form';


function MyFooter() {
  ;

  return (
    <footer>
      <AppBar position="static" style={{ backgroundColor: "#DEF38C", color: "#315133" }} sx={{ height: { xs: '650px', md: '250px' } }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Grid container spacing={2} >
              <Grid item xs={12} md={4}>
                {/* Col1 - Logo */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'left', height: '150px' }}>
                  <Link href="/">
                    <Image src="/LOGO.png" alt="Logo" width={100} height={100} style={{ maxWidth: '100%' }} />
                  </Link>
                  <Typography variant="body2" sx={{ textAlign: { xs: 'center', md: 'left' }, fontSize: { xs: '14px', md: '18px' } }}>
                    5300 Rue Armand-Viau
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: { xs: 'center', md: 'left' }, fontSize: { xs: '14px', md: '18px' }, marginBottom: '10px' }}>
                  Québec, QC, G2C 1Y7
                  </Typography>
                  <Link href="https://www.google.com/maps/place/5300+Rue+Armand-Viau,+Qu%C3%A9bec,+QC+G2C+1Y7/@46.8168869,-71.3414083,17z/data=!3m1!4b1!4m6!3m5!1s0x4cb899d2e1733d09:0x99a3427b25ba33c8!8m2!3d46.8168833!4d-71.338828!16s%2Fg%2F11c28bny1h?entry=ttu" passHref>
                    <Button variant="contained" sx={{
                      backgroundColor: "#D590BD",
                      "&:hover": {
                        backgroundColor: "#315133",
                      }
                    }}>
                      DIRECTION
                    </Button>
                  </Link>
                </div>
              </Grid>
              {/* Col2 - Menu */}

              <Grid item xs={12} md={4} >
                <Grid style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80px' }} sx={{ marginTop: { xs: 15, md: 10 } }}>
                  <Link href="/prise-de-rendez-vous" passHref>
                    <Button color="inherit" style={{ color: '#315133', width: '100%' }}>PRISE DE RENDEZ-VOUS</Button>
                  </Link>
                  <Link href="/portfolio" passHref>
                    <Button color="inherit" style={{ color: '#315133', width: '100%' }}>PORTFOLIO</Button>
                  </Link>
                  <Link href="/#qui-sommes-nous" passHref>
                    <Button color="inherit" style={{ color: '#315133', width: '100%' }}>QUI SOMMES NOUS</Button>
                  </Link>
                  {/* Ícons */}
                  <div style={{ display: 'flex', marginTop: 30 }}>
                  <FacebookIcon className={`${styles.socialIcon} ${styles.facebookIcon}`} style={{ fontSize: '50px' }} />
                  <LinkedInIcon className={`${styles.socialIcon} ${styles.linkedInIcon}`} style={{ fontSize: '50px' }} />
                  <InstagramIcon className={`${styles.socialIcon} ${styles.instagramIcon}`} style={{ fontSize: '50px' }} />
                  </div>
                </Grid>
              </Grid>

              <InfolettreForm />
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </footer>
  );
}
export default MyFooter;
