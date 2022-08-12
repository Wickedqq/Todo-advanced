import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';

export const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const registerDataGetter = (e) => {
    const { name, value } = e.target;

    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          placeholder="name"
          variant="outlined"
          name="name"
          value={registerData.name}
          onChange={registerDataGetter}
        />
        <TextField
          placeholder="email"
          variant="outlined"
          name="email"
          value={registerData.email}
          onChange={registerDataGetter}
        />
        <TextField
          placeholder="password"
          variant="outlined"
          name="password"
          value={registerData.password}
          onChange={registerDataGetter}
        />
      </Box>

      <Button sx={{ width: '100%', fontSize: '20px', gridColumn: '1/-1', gridRow: '9/-1' }}>
        Submit
      </Button>
    </>
  );
};
