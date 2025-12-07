import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ShoppingCart,
  LocalShipping,
  CheckCircle,
  Cancel,
  TrendingUp,
} from '@mui/icons-material';
import { selectOrders, selectIsAuthenticated } from '../store/selectors';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const orders = useSelector(selectOrders);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'shipped':
        return 'info';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle />;
      case 'shipped':
        return <LocalShipping />;
      case 'pending':
        return <ShoppingCart />;
      case 'cancelled':
        return <Cancel />;
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedTab === 0) return true; // All
    if (selectedTab === 1) return order.status === 'pending';
    if (selectedTab === 2) return order.status === 'shipped';
    if (selectedTab === 3) return order.status === 'delivered';
    return true;
  });

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === 'pending').length,
    shippedOrders: orders.filter((o) => o.status === 'shipped').length,
    deliveredOrders: orders.filter((o) => o.status === 'delivered').length,
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4">{stats.totalOrders}</Typography>
            <Typography variant="body2" color="text.secondary">
              Total Orders
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <ShoppingCart sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h4">{stats.pendingOrders}</Typography>
            <Typography variant="body2" color="text.secondary">
              Pending
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <LocalShipping sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
            <Typography variant="h4">{stats.shippedOrders}</Typography>
            <Typography variant="body2" color="text.secondary">
              Shipped
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
            <Typography variant="h4">{stats.deliveredOrders}</Typography>
            <Typography variant="body2" color="text.secondary">
              Delivered
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
        >
          <Tab label="All Orders" />
          <Tab label="Pending" />
          <Tab label="Shipped" />
          <Tab label="Delivered" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {filteredOrders.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No orders found
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate('/products')}
              >
                Start Shopping
              </Button>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {filteredOrders.map((order) => (
                <Grid item xs={12} key={order.id}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          flexWrap: 'wrap',
                          gap: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            Order #{order.id.slice(-8)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            icon={getStatusIcon(order.status)}
                            sx={{ mb: 1 }}
                          />
                          <Typography variant="h6" color="primary">
                            ₹{order.totalAmount.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          View Details
                        </Button>
                        {order.status === 'delivered' && (
                          <Button variant="outlined" size="small" color="success">
                            Rate & Review
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;

