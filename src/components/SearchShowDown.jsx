import { Box, TextField, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { SearchContext } from '../utils/contexts/searchContext';

export const SearchShowDown = () => {
  const { setSearchValue } = useContext(SearchContext);
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '80px',
        width: '100vw',
        backgroundColor: palette.secondary.main,
        opacity: 0.85,
      }}>
      <TextField
        sx={{
          padding: '5px',
        }}
        fullWidth
        placeholder="Search your todo"
        variant="standard"
        color="secondary"
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </Box>
  );
};
