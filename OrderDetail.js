import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import {
  CheckCircle,
  LocalShipping,
  ShoppingCart,
  Cancel,
} from '@mui/icons-material';
import { selectOrders } from '../store/selectors';
import LoadingSpinner from '../components/common/LoadingSpinner';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const orders = useSelector(selectOrders);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const foundOrder = orders.find((o) => o.id === id);
    setOrder(foundOrder);
  }, [id, orders]);

  if (!order) {
    return <LoadingSpinner />;
  }

  const getStatusSteps = () => {
    const statusOrder = ['pending', 'confirmed', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);
    return statusOrder.map((status, index) => ({
      label: status.charAt(0).toUpperCase() + status.slice(1),
      completed: index <= currentIndex,
    }));
  };

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

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Order Details</Typography>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order #{order.id.slice(-8)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                icon={getStatusIcon(order.status)}
              />
              <Typography variant="body2" color="text.secondary">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Stepper activeStep={getStatusSteps().findIndex((s) => !s.completed) - 1} sx={{ mb: 3 }}>
              {getStatusSteps().map((step, index) => (
                <Step key={index} completed={step.completed}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            {order.items.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <Box
                        component="img"
                        src={item.image || '/placeholder-crop.jpg'}
                        alt={item.name}
                        sx={{
                          width: '100%',
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: 1,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity} x ₹{item.price}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ textAlign: 'right' }}>
                      <Typography variant="h6">
                        ₹{item.price * item.quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Paper>

          {order.shippingDetails && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Typography variant="body1">
                {order.shippingDetails.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.shippingDetails.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.pincode}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Phone: {order.shippingDetails.phone}
              </Typography>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">
                ₹{(order.totalAmount - (order.totalAmount > 500 ? 0 : 50)).toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Delivery</Typography>
              <Typography variant="body2">
                {order.totalAmount > 500 ? 'FREE' : '₹50'}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ₹{order.totalAmount.toFixed(2)}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body1">
              {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod?.toUpperCase()}
            </Typography>
            {order.status === 'delivered' && (
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
                color="success"
              >
                Rate & Review
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetail;

