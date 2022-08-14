import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validate } from '../utils/authValidate';
import { useAuth } from '../utils/contexts/authContext';

export const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginDataGetter = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitLoginData = async () => {
    const { email, password } = loginData;
    const validMessage = validate(email, password);
    if (!validMessage.isValid) {
      setError(validMessage);
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      let resp = await login(email, password);
      console.log(resp);
      navigate('/');
    } catch (err) {
      window.alert('email or pasword is incorrect ');
      setLoginData({
        email: '',
        password: '',
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Box
        sx={{
          gridColumn: '1/-1',
          gridRow: '1/4',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
        <TextField
          error={error && error.email.length > 0}
          helperText={error && error.email}
          placeholder="email"
          variant="outlined"
          name="email"
          autoFocus={true}
          value={loginData.email}
          onChange={loginDataGetter}
        />
        <TextField
          error={error && error.password.length > 0}
          helperText={error && error.password}
          placeholder="password"
          variant="outlined"
          name="password"
          value={loginData.password}
          onChange={loginDataGetter}
        />
      </Box>
      <Button
        disabled={isLoading}
        onClick={submitLoginData}
        sx={{ width: '100%', fontSize: '30px', gridColumn: '1/-1', gridRow: '10/-1' }}>
        Log in
      </Button>
    </>
  );
};
