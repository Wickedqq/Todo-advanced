import { Button, Card, CardActions, CardContent, TextField, Box, Alert } from '@mui/material';
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
    <Card sx={{ width: 300, marginTop: '20px', borderRadius: '10px' }}>
      <CardContent>
        <TextField
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
  );
};
