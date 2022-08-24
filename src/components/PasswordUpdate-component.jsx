import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Box,
  Alert,
  ClickAwayListener,
} from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../utils/contexts/authContext';
import { validate } from '../utils/authValidate';

export const PasswordUpdateComponent = ({ setEditPassword }) => {
  const [newPassword, setNewPassword] = useState('');
  const [passwordIsChanged, setPasswordIsChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { resetPassword } = useAuth();

  const updatePassword = async () => {
    const { password } = validate(undefined, newPassword);
    if (password) {
      setErrorMessage(password);
      return;
    }

    setErrorMessage('');
    resetPassword(newPassword)
      .then(() => {
        setPasswordIsChanged(true);
        setEditPassword(false);
      })
      .catch((err) => {
        console.warn(err.code);
        if (err.code === 'auth/requires-recent-login') {
          setErrorMessage('you should relogin to your account to update your password');
        } else {
          setErrorMessage('unable to change password');
        }
      });
  };

  return (
    <ClickAwayListener onClickAway={() => setEditPassword(false)}>
      <Card sx={{ width: '90%', marginTop: '20px', borderRadius: '10px' }}>
        <CardContent sx={{ padding: '2px' }}>
          <TextField
            size="small"
            fullWidth
            sx={{ marginBottom: '10px' }}
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {passwordIsChanged && <Box>Your Password has been changed</Box>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </CardContent>
        <CardActions>
          <Button onClick={updatePassword} variant="outlined">
            Submit new Password
          </Button>
        </CardActions>
      </Card>
    </ClickAwayListener>
  );
};
