import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  Divider,
  Chip,
  Rating,
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@mui/material';
import {
  AddShoppingCart,
  FavoriteBorder,
  Favorite,
  Share,
  CompareArrows,
} from '@mui/icons-material';
import { addToCart } from '../store/slices/cartSlice';
import { selectProducts } from '../store/selectors';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [comparisonProducts, setComparisonProducts] = useState([]);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // In production, fetch from API
      // For now, use mock data
      setProduct({
        id: parseInt(id),
        name: 'Organic Wheat Seeds',
        description: 'Premium quality organic wheat seeds for high yield. These seeds are carefully selected and tested for optimal germination rates.',
        fullDescription: 'Our organic wheat seeds are sourced directly from certified organic farms. They are non-GMO and have been tested for high germination rates. Perfect for farmers looking to grow healthy, sustainable crops.',
        price: 450,
        originalPrice: 500,
        unit: 'kg',
        image: '/placeholder-crop.jpg',
        category: 'Seeds',
        rating: 4.5,
        reviews: 120,
        farmer: { name: 'Green Fields Farm', id: 1 },
        stock: 50,
        specifications: {
          'Germination Rate': '95%',
          'Purity': '99%',
          'Moisture Content': '<12%',
          'Packaging': '5kg bags',
        },
      });
    }
  }, [id, products]);

  if (!product) {
    return <LoadingSpinner />;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleCompare = () => {
    // Add comparison logic
    if (comparisonProducts.length < 3) {
      setComparisonProducts([...comparisonProducts, product]);
    }
  };

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: 'background.default',
              minHeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={product.image || '/placeholder-crop.jpg'}
              alt={product.name}
              sx={{
                maxWidth: '100%',
                maxHeight: 500,
                objectFit: 'contain',
              }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Rating value={product.rating} readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary">
                ({product.reviews} reviews)
              </Typography>
              <Chip label={product.category} color="primary" size="small" />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography variant="h4" color="primary">
                  ₹{product.price}
                </Typography>
                {product.originalPrice && (
                  <Typography
                    variant="h6"
                    sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                  >
                    ₹{product.originalPrice}
                  </Typography>
                )}
                {product.originalPrice && (
                  <Chip
                    label={`${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`}
                    color="error"
                    size="small"
                  />
                )}
              </Box>
              <Typography variant="body2" color="text.secondary">
                Per {product.unit}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            {product.farmer && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Sold by
                </Typography>
                <Button
                  variant="text"
                  onClick={() => navigate(`/farmers/${product.farmer.id}`)}
                >
                  {product.farmer.name}
                </Button>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" gutterBottom>
                Quantity
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  inputProps={{ min: 1, max: product.stock || 100 }}
                  sx={{ width: 100 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {product.stock || 'In stock'} available
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AddShoppingCart />}
                onClick={handleAddToCart}
                fullWidth
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label="toggle favorite"
              >
                {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
              </Button>
              <Button variant="outlined" startIcon={<Share />}>
                Share
              </Button>
              <Button
                variant="outlined"
                startIcon={<CompareArrows />}
                onClick={handleCompare}
              >
                Compare
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
          <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label="Reviews" />
        </Tabs>

        <Paper sx={{ p: 3, mt: 2 }}>
          {selectedTab === 0 && (
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {product.fullDescription || product.description}
            </Typography>
          )}

          {selectedTab === 1 && product.specifications && (
            <Grid container spacing={2}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {key}:
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {selectedTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Customer Reviews
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No reviews yet. Be the first to review this product!
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {similarProducts.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Similar Products
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {similarProducts.map((similarProduct) => (
              <Grid item xs={12} sm={6} md={3} key={similarProduct.id}>
                <Card
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/products/${similarProduct.id}`)}
                >
                  <Box
                    component="img"
                    src={similarProduct.image || '/placeholder-crop.jpg'}
                    alt={similarProduct.name}
                    sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {similarProduct.name}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{similarProduct.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetail;

