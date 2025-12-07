import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Button,
} from '@mui/material';
import { FilterList, Clear } from '@mui/icons-material';
import { setProducts, setCategories, updateFilters, clearFilters } from '../store/slices/productsSlice';
import { selectFilteredProducts, selectCategories, selectFilters } from '../store/selectors';
import ProductCard from '../components/common/ProductCard';
import SearchBar from '../components/common/SearchBar';

// Mock data - in production, this would come from an API
const mockProducts = [
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
  {
    id: 5,
    name: 'Carrot Seeds',
    description: 'High germination rate carrot seeds',
    price: 180,
    unit: 'packet',
    image: '/placeholder-crop.jpg',
    category: 'Seeds',
    rating: 4.4,
    reviews: 67,
    farmer: { name: 'Veggie Farm' },
  },
  {
    id: 6,
    name: 'Onions',
    description: 'Fresh red onions, long shelf life',
    price: 40,
    unit: 'kg',
    image: '/placeholder-crop.jpg',
    category: 'Vegetables',
    rating: 4.3,
    reviews: 145,
    farmer: { name: 'Fresh Produce Co' },
  },
];

const ProductListing = () => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);
  const categories = useSelector(selectCategories);
  const filters = useSelector(selectFilters);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // In production, fetch from API
    dispatch(setProducts(mockProducts));
    dispatch(setCategories(['Seeds', 'Vegetables', 'Fertilizers', 'Grains', 'Tools', 'Equipment']));
  }, [dispatch]);

  const handleFilterChange = (key, value) => {
    dispatch(updateFilters({ [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice || filters.sortBy !== 'name';

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Products
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mt: 2 }}>
          <Box sx={{ flexGrow: 1, minWidth: 200 }}>
            <SearchBar placeholder="Search products..." />
          </Box>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </Box>
      </Box>

      {showFilters && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category || ''}
                label="Category"
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Min Price"
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              sx={{ minWidth: 120 }}
            />

            <TextField
              label="Max Price"
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              sx={{ minWidth: 120 }}
            />

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.sortBy || 'name'}
                label="Sort By"
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price-low">Price: Low to High</MenuItem>
                <MenuItem value="price-high">Price: High to Low</MenuItem>
              </Select>
            </FormControl>

            {hasActiveFilters && (
              <Button
                variant="outlined"
                startIcon={<Clear />}
                onClick={handleClearFilters}
              >
                Clear
              </Button>
            )}
          </Box>
        </Paper>
      )}

      {hasActiveFilters && (
        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {filters.category && (
            <Chip
              label={`Category: ${filters.category}`}
              onDelete={() => handleFilterChange('category', '')}
            />
          )}
          {filters.minPrice && (
            <Chip
              label={`Min: ₹${filters.minPrice}`}
              onDelete={() => handleFilterChange('minPrice', '')}
            />
          )}
          {filters.maxPrice && (
            <Chip
              label={`Max: ₹${filters.maxPrice}`}
              onDelete={() => handleFilterChange('maxPrice', '')}
            />
          )}
        </Box>
      )}

      {filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No products found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your filters or search query
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductListing;

 