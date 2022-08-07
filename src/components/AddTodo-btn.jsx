import { Box, Typography, useTheme } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React from 'react';

export const AddTodo = () => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 1, color: palette.AssistanceColor.main }}>
      <AddOutlinedIcon fontSize="large" />
      <Typography variant="h6">Add todo</Typography>
    </Box>
  );
};
