"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from '@mui/material/Container';
import styles from "../../../app/page.module.css";

export default function MyMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <React.Fragment>

      <AppBar position="static" style={{ background: '#ffffff' }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Link href="/" passHref>
              <Image src="/LOGO.png" alt="Logo" width={100} height={100} />
            </Link>


            <Box flexGrow={1} />

            {isSmallScreen && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                style={{ color: '#315133' }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {!isSmallScreen && (
              <Box display="flex" alignItems="center">
                <Link href="/portfolio" passHref>
                  <Button color="inherit" style={{ color: '#315133', marginRight: 20 }}>
                    PORTFOLIO
                  </Button>
                </Link>
                <Link href="/#qui-sommes-nous" passHref>
                  <Button color="inherit" style={{ color: '#315133', marginRight: 20 }}>
                    QUI SOMMES NOUS
                  </Button>
                </Link>
                <Link href="/prise-de-rendez-vous" passHref>
                  <Button variant="contained" sx={{
                    backgroundColor: "#D590BD",
                    "&:hover": {
                      backgroundColor: "#315133",
                    }
                  }}>
                    PRISE DE RENDEZ-VOUS
                  </Button>
                </Link>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Link href="/portfolio" passHref>
            <Button color="inherit" style={{ color: '#315133', width: '100%' }}>
              PORTFOLIO
            </Button>
          </Link>
          <Link href="/#qui-sommes-nous" passHref>
            <Button color="inherit" style={{ color: '#315133', width: '100%' }}>
              QUI SOMMES NOUS
            </Button>
          </Link>
          <Link href="/prise-de-rendez-vous" passHref>
            <Button variant="contained" style={{ backgroundColor: '#d590bd', color: '#315133', width: '100%' }}>
              PRISE DE RENDEZ-VOUS
            </Button>
          </Link>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};
