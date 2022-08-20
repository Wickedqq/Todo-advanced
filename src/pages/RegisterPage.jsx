import { Box, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validate } from '../utils/authValidate';
import { useAuth } from '../utils/contexts/authContext';

export const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signup, setUserName, authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    authUser && navigate('/');
  }, [authUser, navigate]);

  const registerDataGetter = (e) => {
    const { name, value } = e.target;

    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitRegisterData = async () => {
    const { name, email, password } = registerData;
    const valideMessage = validate(email, password, name);

    if (!valideMessage.isValid) {
      setError(valideMessage);
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      await signup(email, password);
      await setUserName(name);
      navigate('/');
    } catch (err) {
      console.log(err);
      window.alert('email is already taken');
      setRegisterData({
        name: '',
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
          gridRow: '1/6',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
        <TextField
          error={error && error.name.length > 0}
          helperText={error && error.name}
          placeholder="name"
          variant="outlined"
          name="name"
          autoFocus={true}
          value={registerData.name}
          onChange={registerDataGetter}
        />
        <TextField
          error={error && error.email.length > 0}
          helperText={error && error.email}
          placeholder="email"
          variant="outlined"
          name="email"
          value={registerData.email}
          onChange={registerDataGetter}
        />
        <TextField
          error={error && error.password.length > 0}
          helperText={error && error.password}
          placeholder="password"
          variant="outlined"
          name="password"
          value={registerData.password}
          onChange={registerDataGetter}
        />
      </Box>
      <Button
        disabled={isLoading}
        onClick={submitRegisterData}
        sx={{ width: '100%', fontSize: '30px', gridColumn: '1/-1', gridRow: '10/-1' }}>
        Register
      </Button>
    </>
  );
};
