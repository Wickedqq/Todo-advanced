import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Box,
  Alert,
  ClickAwayListener,
} from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../utils/contexts/authContext';
import { validate } from '../utils/authValidate';

export const EmailUpdateComponent = ({ setEditEmail }) => {
  const [newEmail, setNewEmail] = useState('');
  const [emailIsChanged, setEmailIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { resetEmail, verifyEmail } = useAuth();

  const updateEmail = async () => {
    const { email } = validate(newEmail);
    if (email) {
      setErrorMessage(email);
      return;
    }

    setErrorMessage('');
    setLoading(true);
    resetEmail(newEmail)
      .then(async () => {
        setEmailIsChanged(true);
        await verifyEmail();
        setEditEmail(false);
      })
      .catch(async (err) => {
        console.warn(err);
        if (err.code === 'auth/requires-recent-login') {
          setErrorMessage('before changing your email please relogin to your account');
        } else {
          setErrorMessage('unable to change your email');
        }
      })
      .finally(setLoading(false));
  };

  return (
    <ClickAwayListener onClickAway={() => setEditEmail(false)}>
      <Card sx={{ width: 300, marginTop: '20px', borderRadius: '10px' }}>
        <CardContent>
          <TextField
            sx={{ marginBottom: '10px' }}
            variant="outlined"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          {emailIsChanged && (
            <Box>Your email is changed to verify your new email check your inbox</Box>
          )}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </CardContent>
        <CardActions>
          <Button onClick={updateEmail} variant="outlined">
            Submit new email
          </Button>
        </CardActions>
        {loading && <Typography>submiting...</Typography>}
      </Card>
    </ClickAwayListener>
  );
};
