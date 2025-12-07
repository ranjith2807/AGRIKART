import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Rating,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search, Verified } from '@mui/icons-material';

const Farmers = () => {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // In production, fetch from API
    setFarmers([
      {
        id: 1,
        name: 'Green Fields Farm',
        description: 'Organic farming specialist with 20+ years experience',
        image: '/placeholder-farmer.jpg',
        location: 'Punjab, India',
        verified: true,
        rating: 4.7,
        totalReviews: 234,
        totalProducts: 45,
        specialties: ['Organic', 'Wheat', 'Rice'],
      },
      {
        id: 2,
        name: 'Sunshine Farm',
        description: 'Fresh vegetables and fruits directly from farm',
        image: '/placeholder-farmer.jpg',
        location: 'Maharashtra, India',
        verified: true,
        rating: 4.8,
        totalReviews: 189,
        totalProducts: 32,
        specialties: ['Vegetables', 'Fruits'],
      },
      {
        id: 3,
        name: 'Golden Harvest',
        description: 'Premium grains and cereals',
        image: '/placeholder-farmer.jpg',
        location: 'Haryana, India',
        verified: false,
        rating: 4.5,
        totalReviews: 156,
        totalProducts: 28,
        specialties: ['Grains', 'Cereals'],
      },
    ]);
  }, []);

  const filteredFarmers = farmers.filter((farmer) =>
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Our Farmers
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Connect with verified farmers and buy directly from the source
      </Typography>

      <TextField
        fullWidth
        placeholder="Search farmers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4 }}
      />

      {filteredFarmers.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No farmers found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredFarmers.map((farmer) => (
            <Grid item xs={12} sm={6} md={4} key={farmer.id}>
              <Paper
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s',
                  },
                }}
                onClick={() => navigate(`/farmers/${farmer.id}`)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar
                    src={farmer.image}
                    sx={{ width: 64, height: 64 }}
                  >
                    {farmer.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6">{farmer.name}</Typography>
                      {farmer.verified && (
                        <Verified color="primary" fontSize="small" />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={farmer.rating} readOnly size="small" />
                      <Typography variant="caption" color="text.secondary">
                        ({farmer.totalReviews})
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {farmer.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  📍 {farmer.location}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {farmer.specialties.map((specialty) => (
                    <Chip key={specialty} label={specialty} size="small" />
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {farmer.totalProducts} products available
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Farmers;

