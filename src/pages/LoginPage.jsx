import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

export const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const loginDataGetter = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          placeholder="email"
          variant="outlined"
          name="email"
          value={loginData.email}
          onChange={loginDataGetter}
        />
        <TextField
          placeholder="password"
          variant="outlined"
          name="password"
          value={loginData.password}
          onChange={loginDataGetter}
        />
      </Box>

      <Button sx={{ width: '100%', fontSize: '20px', gridColumn: '1/-1', gridRow: '9/-1' }}>
        Submit
      </Button>
    </>
  );
};
