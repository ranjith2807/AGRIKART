import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, Email, Phone } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              🌾 Agrikart
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your trusted agricultural e-commerce platform connecting farmers
              and buyers.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link href="#" color="inherit" aria-label="Facebook">
                <Facebook />
              </Link>
              <Link href="#" color="inherit" aria-label="Twitter">
                <Twitter />
              </Link>
              <Link href="#" color="inherit" aria-label="Instagram">
                <Instagram />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link component={RouterLink} to="/products" color="inherit" underline="hover">
                Products
              </Link>
              <Link component={RouterLink} to="/farmers" color="inherit" underline="hover">
                Farmers
              </Link>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                About Us
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link component={RouterLink} to="/help" color="inherit" underline="hover">
                Help Center
              </Link>
              <Link component={RouterLink} to="/shipping" color="inherit" underline="hover">
                Shipping Info
              </Link>
              <Link component={RouterLink} to="/returns" color="inherit" underline="hover">
                Returns
              </Link>
              <Link component={RouterLink} to="/faq" color="inherit" underline="hover">
                FAQ
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" />
                <Typography variant="body2">support@agrikart.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone fontSize="small" />
                <Typography variant="body2">+91 1800-123-4567</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 3 }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Agrikart. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

