import styles from './page.module.css'
import React from 'react';
import MyMenu from '../components/molecules/my-menu/my-menu';
import MediaCover from '../components/molecules/video-accueil/video-accueil'; 
import ResponsiveGridCards from '@/components/molecules/cards-projets/cards-projets';
import { Container } from '@mui/material';
import ResponsiveGrid from '@/components/molecules/valeur-mission-accueil/valeur-mission-accueil';
import ImageContainer from '@/components/molecules/qui-sommes-nous/qui-sommes-nous';

import './globals.css'

export default function Home() {
  return (
    <main>
      <MediaCover /> 
      <ResponsiveGridCards/> 
      <ResponsiveGrid/>
      <ImageContainer/>
    </main>
  )
}
