"use client"
import React from 'react';
import CardCover from '@mui/joy/CardCover';
import { useTheme } from '@mui/material/styles';

export default function MediaCover() {
  const theme = useTheme();
 
  return (
        <CardCover sx={{ position: 'relative', width: '100%', padding: 0 }}>
          <video
            autoPlay
            loop
            muted
             /*controls (Nous l'utilisons pour rendre les contrôles vidéo apparents pour l'utilisateur.*/
            poster=""
            style={{ width: '100%', height: '50%', margin: 0, padding: 0 }}
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </CardCover>
  );
}