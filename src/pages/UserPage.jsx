import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/contexts/authContext';
import { UserSidebar } from '../utils/exporter';

export const UserPage = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !authUser && navigate('/');
  }, [authUser, navigate]);

  return (
    <>
      {authUser && <UserSidebar authUser={authUser} />}
      <Box>
        <Stack>
          <Typography>your todos</Typography>
          <Typography>important todos</Typography>
          <Typography>important todos</Typography>
        </Stack>
      </Box>
    </>
  );
};
