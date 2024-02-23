'use client';
import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Img from 'next/image';

const ImageContainer = () => {
  const [isXs, setIsXs] = useState(false);
  const [clickedImage, setClickedImage] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsXs(window.innerWidth < 600);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleImageClick = (image: string) => {
    if (image === clickedImage) {
      setClickedImage("");
    } else {
      setClickedImage(image);
    }
  };

  const handleImageHover = () => {
    // 
  };

  return (
    <Container maxWidth="lg" style={{ textAlign: 'center', marginBottom: 80, position: 'relative' }}>
      <style>{`
        .imageblock {
          position: relative;
          cursor: pointer;
        }
  
        .imageblock:hover {
          /* Adicione estilos desejados para o efeito de hover aqui */
        }
  
        .imageblock.clicked {
          z-index: 2;
        }
  
        .image-info {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          display: ${clickedImage ? 'block' : 'none'}; // Adicionado para mostrar apenas quando há uma imagem clicada
        }
      `}</style>
      <Typography id="qui-sommes-nous" variant={isXs ? 'h6' : 'h4'} component="h2" gutterBottom style={{ marginTop: 50, color: '#D590BD' }}>
        QUI SOMMES NOUS
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: 50,
          position: 'relative',
        }}
      >
        <div
          className={`imageblock ${clickedImage === 'nadia' ? 'clicked' : ''}`}
          style={{ margin: '0 10px', maxWidth: '100%', position: 'relative' }}
          onMouseEnter={() => handleImageClick('nadia')}
          onMouseLeave={() => handleImageClick("")}
        >
          <Img
            src="/nadia.jpg"
            alt="Nadia"
            width={isXs ? 170 : 350}
            height={isXs ? 220 : 420}
          />
          {clickedImage === 'nadia' && (
            <div className="image-info" onClick={() => handleImageClick('nadia_info')}>
              <Img
                src={`/nadia_info.jpg`}
                alt="Informações"
                width={isXs ? 170 : 350}
                height={isXs ? 220 : 420}
              />
            </div>
          )}
        </div>
        <div
          className={`imageblock ${clickedImage === 'amelie' ? 'clicked' : ''}`}
          style={{ margin: '0 10px', maxWidth: '100%', position: 'relative' }}
          onMouseEnter={() => handleImageClick('amelie')}
          onMouseLeave={() => handleImageClick("")}
        >
          <Img
            src="/amelie.jpg"
            alt="Amélie"
            width={isXs ? 170 : 350}
            height={isXs ? 220 : 420}
          />
          {clickedImage === 'amelie' && (
            <div className="image-info" onClick={() => handleImageClick('amelie_info')}>
              <Img
                src={`/amelie_info.jpg`}
                alt="Informações"
                width={isXs ? 170 : 350}
                height={isXs ? 220 : 420}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ImageContainer;