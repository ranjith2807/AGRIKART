import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Notifications,
  Menu as MenuIcon,
  Logout,
  Dashboard,
  AccountCircle,
} from '@mui/icons-material';
import { selectCartTotalQuantity } from '../../store/selectors';
import { selectIsAuthenticated, selectUser } from '../../store/selectors';
import { logout } from '../../store/slices/authSlice';
import { selectUnreadCount } from '../../store/selectors';
import SearchBar from '../common/SearchBar';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const unreadCount = useSelector(selectUnreadCount);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleProfileMenuClose();
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: { xs: 1, md: 0 },
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 700,
            mr: { xs: 1, md: 4 },
          }}
        >
          🌾 Agrikart
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, gap: 2, mx: 2 }}>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/farmers">
            Farmers
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, maxWidth: 400 }}>
          <SearchBar fullWidth />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: { xs: 'auto', md: 2 } }}>
          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            aria-label="shopping cart"
          >
            <Badge badgeContent={cartQuantity} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <IconButton
                color="inherit"
                onClick={() => navigate('/notifications')}
                aria-label="notifications"
              >
                <Badge badgeContent={unreadCount} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                aria-label="account menu"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {user?.name?.charAt(0)?.toUpperCase() || <Person />}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={() => { navigate('/dashboard'); handleProfileMenuClose(); }}>
                  <Dashboard sx={{ mr: 1 }} /> Dashboard
                </MenuItem>
                <MenuItem onClick={() => { navigate('/account'); handleProfileMenuClose(); }}>
                  <AccountCircle sx={{ mr: 1 }} /> Account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
                sx={{ ml: 1 }}
              >
                Sign Up
              </Button>
            </>
          )}

          <IconButton
            color="inherit"
            onClick={handleMobileMenuOpen}
            sx={{ display: { xs: 'block', md: 'none' } }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={() => { navigate('/products'); handleMobileMenuClose(); }}>
          Products
        </MenuItem>
        <MenuItem onClick={() => { navigate('/farmers'); handleMobileMenuClose(); }}>
          Farmers
        </MenuItem>
        <MenuItem onClick={() => { navigate('/about'); handleMobileMenuClose(); }}>
          About
        </MenuItem>
        {!isAuthenticated && (
          <>
            <Divider />
            <MenuItem onClick={() => { navigate('/login'); handleMobileMenuClose(); }}>
              Login
            </MenuItem>
            <MenuItem onClick={() => { navigate('/register'); handleMobileMenuClose(); }}>
              Sign Up
            </MenuItem>
          </>
        )}
      </Menu>
    </AppBar>
  );
};

export default Navbar;

