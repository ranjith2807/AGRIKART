import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle,
  LocalShipping,
  Payment,
  Delete,
} from '@mui/icons-material';
import {
  selectNotifications,
} from '../store/selectors';
import {
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
} from '../store/slices/notificationsSlice';
import { Button } from '@mui/material';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return <LocalShipping />;
      case 'payment':
        return <Payment />;
      case 'success':
        return <CheckCircle />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'primary';
    }
  };

  if (notifications.length === 0) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <NotificationsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          No notifications
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You're all caught up!
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Notifications</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => dispatch(markAllAsRead())}
          >
            Mark All Read
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => dispatch(clearAllNotifications())}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      <Paper>
        <List>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                bgcolor: notification.read ? 'background.default' : 'action.hover',
                borderLeft: notification.read ? 'none' : '4px solid',
                borderColor: 'primary.main',
              }}
            >
              <ListItemIcon>
                <Box sx={{ color: getNotificationColor(notification.type) }}>
                  {getNotificationIcon(notification.type)}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">
                      {notification.title || 'Notification'}
                    </Typography>
                    {!notification.read && (
                      <Chip label="New" size="small" color="primary" />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(notification.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                }
              />
              <Box>
                {!notification.read && (
                  <IconButton
                    size="small"
                    onClick={() => dispatch(markAsRead(notification.id))}
                    aria-label="mark as read"
                  >
                    <CheckCircle fontSize="small" />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  onClick={() => dispatch(removeNotification(notification.id))}
                  aria-label="delete notification"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Notifications;

