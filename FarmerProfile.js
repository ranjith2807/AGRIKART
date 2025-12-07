import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Rating,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  Verified,
} from '@mui/icons-material';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const FarmerProfile = () => {
  const { id } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In production, fetch from API
    setFarmer({
      id: parseInt(id),
      name: 'Green Fields Farm',
      description: 'A family-owned organic farm with over 20 years of experience in sustainable agriculture.',
      image: '/placeholder-farmer.jpg',
      location: 'Punjab, India',
      phone: '+91 98765 43210',
      email: 'contact@greenfieldsfarm.com',
      verified: true,
      rating: 4.7,
      totalReviews: 234,
      totalProducts: 45,
      joinedDate: '2015-01-15',
      specialties: ['Organic Farming', 'Wheat', 'Rice', 'Vegetables'],
    });

    setProducts([
      {
        id: 1,
        name: 'Organic Wheat Seeds',
        description: 'Premium quality organic wheat seeds',
        price: 450,
        unit: 'kg',
        image: '/placeholder-crop.jpg',
        category: 'Seeds',
        rating: 4.5,
        reviews: 120,
        farmer: { name: 'Green Fields Farm' },
      },
      {
        id: 2,
        name: 'Basmati Rice',
        description: 'Premium quality basmati rice',
        price: 120,
        unit: 'kg',
        image: '/placeholder-crop.jpg',
        category: 'Grains',
        rating: 4.7,
        reviews: 89,
        farmer: { name: 'Green Fields Farm' },
      },
    ]);
  }, [id]);

  if (!farmer) {
    return <LoadingSpinner />;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Avatar
              src={farmer.image}
              sx={{ width: 120, height: 120, mx: 'auto' }}
            >
              {farmer.name.charAt(0)}
            </Avatar>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h4">{farmer.name}</Typography>
              {farmer.verified && (
                <Verified color="primary" />
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={farmer.rating} readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary">
                {farmer.rating} ({farmer.totalReviews} reviews)
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {farmer.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {farmer.specialties.map((specialty) => (
                <Chip key={specialty} label={specialty} size="small" />
              ))}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2">{farmer.location}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone fontSize="small" color="action" />
                  <Typography variant="body2">{farmer.phone}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email fontSize="small" color="action" />
                  <Typography variant="body2">{farmer.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Member since {new Date(farmer.joinedDate).getFullYear()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label={`Products (${products.length})`} />
          <Tab label={`Reviews (${farmer.totalReviews})`} />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {selectedTab === 0 && (
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard
                    product={product}
                    isFavorite={isFavorite}
                    onFavoriteToggle={() => setIsFavorite(!isFavorite)}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {selectedTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Customer Reviews
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[1, 2, 3].map((review) => (
                  <Card key={review} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          U{review}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle2">Customer {review}</Typography>
                          <Rating value={5} readOnly size="small" />
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {new Date().toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        Great quality products! Very satisfied with the purchase.
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default FarmerProfile;

