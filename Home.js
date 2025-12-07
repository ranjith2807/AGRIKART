import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import {
  LocalFlorist,
  Agriculture,
  ShoppingCart,
  TrendingUp,
} from '@mui/icons-material';
import { setFeaturedProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { selectFeaturedProducts } from '../store/selectors';

// Mock data - in production, this would come from an API
const mockFeaturedProducts = [
  {
    id: 1,
    name: 'Organic Wheat Seeds',
    description: 'Premium quality organic wheat seeds for high yield',
    price: 450,
    originalPrice: 500,
    unit: 'kg',
    image: '/placeholder-crop.jpg',
    category: 'Seeds',
    rating: 4.5,
    reviews: 120,
    farmer: { name: 'Green Fields Farm' },
  },
  {
    id: 2,
    name: 'Fresh Tomatoes',
    description: 'Farm-fresh organic tomatoes, pesticide-free',
    price: 60,
    unit: 'kg',
    image: '/placeholder-crop.jpg',
    category: 'Vegetables',
    rating: 4.8,
    reviews: 89,
    farmer: { name: 'Sunshine Farm' },
  },
  {
    id: 3,
    name: 'Premium Fertilizer',
    description: 'Organic fertilizer for healthy crop growth',
    price: 850,
    unit: 'bag',
    image: '/placeholder-crop.jpg',
    category: 'Fertilizers',
    rating: 4.6,
    reviews: 156,
    farmer: { name: 'Agri Solutions' },
  },
  {
    id: 4,
    name: 'Basmati Rice',
    description: 'Premium quality basmati rice, long grain',
    price: 120,
    unit: 'kg',
    image: '/placeholder-crop.jpg',
    category: 'Grains',
    rating: 4.7,
    reviews: 203,
    farmer: { name: 'Golden Harvest' },
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const featuredProducts = useSelector(selectFeaturedProducts);

  useEffect(() => {
    // In production, fetch from API
    dispatch(setFeaturedProducts(mockFeaturedProducts));
  }, [dispatch]);

  const features = [
    {
      icon: <LocalFlorist sx={{ fontSize: 48 }} />,
      title: 'Fresh Products',
      description: 'Direct from farms to your doorstep',
    },
    {
      icon: <Agriculture sx={{ fontSize: 48 }} />,
      title: 'Trusted Farmers',
      description: 'Verified farmers with quality assurance',
    },
    {
      icon: <ShoppingCart sx={{ fontSize: 48 }} />,
      title: 'Easy Shopping',
      description: 'Simple and secure checkout process',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48 }} />,
      title: 'Best Prices',
      description: 'Competitive prices with great deals',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 10 },
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Agrikart
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Your trusted agricultural marketplace
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Connect directly with farmers, buy fresh produce, seeds, fertilizers,
            and agricultural supplies at the best prices.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/products')}
            >
              Shop Now
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/farmers')}
            >
              Explore Farmers
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose Agrikart?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Box sx={{ bgcolor: 'background.default', py: 6 }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4">Featured Products</Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/products')}
            >
              View All
            </Button>
          </Box>
          {featuredProducts.length === 0 ? (
            <LoadingSpinner />
          ) : (
            <Grid container spacing={3}>
              {featuredProducts.slice(0, 4).map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* CTA Section */}
      <Container sx={{ py: 6 }}>
        <Card sx={{ bgcolor: 'primary.light', color: 'white' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h4" gutterBottom>
              Join Agrikart Today
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Start buying fresh agricultural products or sell your farm produce
              to thousands of customers.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Home;

