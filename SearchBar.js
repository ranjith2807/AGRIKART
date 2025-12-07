import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { updateFilters } from '../../store/slices/productsSlice';

const SearchBar = ({ placeholder = 'Search products...', fullWidth = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(updateFilters({ searchQuery }));
    if (window.location.pathname !== '/products') {
      navigate('/products');
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    dispatch(updateFilters({ searchQuery: '' }));
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ width: fullWidth ? '100%' : 'auto' }}>
      <TextField
        fullWidth={fullWidth}
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          dispatch(updateFilters({ searchQuery: e.target.value }));
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                aria-label="clear search"
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        aria-label="Search products"
      />
    </Box>
  );
};

export default SearchBar;

