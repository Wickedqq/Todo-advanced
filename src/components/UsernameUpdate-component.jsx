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

export const UsernameUpdateComponent = ({ setEditUsername }) => {
  const [newUsername, setNewUsername] = useState('');
  const [usernameIsChanged, setUsernameIsChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserName } = useAuth();

  const updateUsername = async () => {
    const { name } = validate(undefined, undefined, newUsername);
    if (name) {
      setErrorMessage(name);
      return;
    }

    setErrorMessage('');
    setUserName(newUsername)
      .then(() => {
        setUsernameIsChanged(true);
        setEditUsername(false);
      })
      .catch(async (err) => {
        console.warn(err);
        setErrorMessage('unable to change username');
      });
  };

  return (
    <ClickAwayListener onClickAway={() => setEditUsername(false)}>
      <Card sx={{ width: '90%', marginTop: '20px', borderRadius: '10px' }}>
        <CardContent sx={{ padding: '2px' }}>
          <TextField
            size="small"
            fullWidth
            sx={{ marginBottom: '10px' }}
            variant="outlined"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          {usernameIsChanged && <Box>Your username has been changed</Box>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </CardContent>
        <CardActions>
          <Button onClick={updateUsername} variant="outlined">
            Submit new username
          </Button>
        </CardActions>
      </Card>
    </ClickAwayListener>
  );
};
