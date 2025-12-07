import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { Payment, LocalShipping, CheckCircle } from '@mui/icons-material';
import {
  selectCartItems,
  selectCartTotalAmount,
} from '../store/selectors';
import { clearCart } from '../store/slices/cartSlice';
import { addOrder } from '../store/slices/ordersSlice';
import { addNotification } from '../store/slices/notificationsSlice';

const steps = ['Shipping Details', 'Payment', 'Confirmation'];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const deliveryCharge = totalAmount > 500 ? 0 : 50;
  const finalTotal = totalAmount + deliveryCharge;

  const handleShippingChange = (field, value) => {
    setShippingDetails({ ...shippingDetails, [field]: value });
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate shipping details
      if (
        !shippingDetails.fullName ||
        !shippingDetails.email ||
        !shippingDetails.phone ||
        !shippingDetails.address ||
        !shippingDetails.city ||
        !shippingDetails.state ||
        !shippingDetails.pincode
      ) {
        alert('Please fill all shipping details');
        return;
      }
    }
    if (activeStep === steps.length - 1) {
      handlePlaceOrder();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePlaceOrder = () => {
    const order = {
      id: Date.now().toString(),
      items: cartItems,
      shippingDetails,
      paymentMethod,
      totalAmount: finalTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    dispatch(addOrder(order));
    dispatch(clearCart());
    dispatch(
      addNotification({
        type: 'success',
        message: 'Order placed successfully!',
        title: 'Order Confirmed',
      })
    );
    navigate('/dashboard');
  };

  if (cartItems.length === 0 && activeStep < 2) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/products')}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {activeStep === 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Details
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={shippingDetails.fullName}
                    onChange={(e) => handleShippingChange('fullName', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={shippingDetails.email}
                    onChange={(e) => handleShippingChange('email', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={shippingDetails.phone}
                    onChange={(e) => handleShippingChange('phone', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    value={shippingDetails.address}
                    onChange={(e) => handleShippingChange('address', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="City"
                    value={shippingDetails.city}
                    onChange={(e) => handleShippingChange('city', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="State"
                    value={shippingDetails.state}
                    onChange={(e) => handleShippingChange('state', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={shippingDetails.pincode}
                    onChange={(e) => handleShippingChange('pincode', e.target.value)}
                    required
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          {activeStep === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                sx={{ mt: 2 }}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit/Debit Card"
                />
                <FormControlLabel
                  value="upi"
                  control={<Radio />}
                  label="UPI"
                />
                <FormControlLabel
                  value="netbanking"
                  control={<Radio />}
                  label="Net Banking"
                />
              </RadioGroup>
            </Paper>
          )}

          {activeStep === 2 && (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Order Placed Successfully!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Your order has been confirmed and will be delivered soon.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/dashboard')}
              >
                View Orders
              </Button>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            {cartItems.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Typography variant="body2">
                  {item.name} x {item.quantity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ₹{item.price * item.quantity}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">₹{totalAmount.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Delivery</Typography>
              <Typography variant="body2">
                {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ₹{finalTotal.toFixed(2)}
              </Typography>
            </Box>
            {activeStep < 2 && (
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                {activeStep > 0 && (
                  <Button variant="outlined" fullWidth onClick={handleBack}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleNext}
                  startIcon={activeStep === 1 ? <Payment /> : <LocalShipping />}
                >
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;

