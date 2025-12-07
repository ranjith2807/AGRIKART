import React from 'react';
import { Card as MuiCard, CardContent, CardMedia, CardActions } from '@mui/material';

const Card = ({ 
  children, 
  image, 
  imageAlt = '', 
  actions,
  onClick,
  ...props 
}) => {
  return (
    <MuiCard 
      onClick={onClick}
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      {...props}
    >
      {image && (
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={imageAlt}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        {children}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
};

export default Card;

