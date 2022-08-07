import React from 'react';
import { Box, AppBar, IconButton, Toolbar, TextField, useTheme, Button } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { palette } = useTheme();

  return (
    <AppBar
      position="sticky"
      sx={{
        height: '12vh',
        zIndex: 9,
      }}>
      <Toolbar
        variant="dense"
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: palette.primary.main,
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="menu">
              <MenuIcon
                sx={{
                  display: { mobile: 'block', tablet: 'none' },
                  color: palette.AssistanceColor.main,
                  fontSize: 35,
                }}
              />
            </IconButton>
            <IconButton color="inherit">
              <SearchIcon sx={{ color: palette.AssistanceColor.main, fontSize: 30 }} />
            </IconButton>
            <TextField
              placeholder="Search your todo"
              variant="standard"
              color="secondary"
              sx={{
                display: { mobile: 'none', tablet: 'block' },
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            fontSize: '25px',
          }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button
              size="large"
              sx={{
                fontSize: '20px',
                color: palette.AssistanceColor.main,
              }}>
              Login
            </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Button
              size="large"
              sx={{
                fontSize: '20px',
                color: palette.AssistanceColor.main,
              }}>
              Register
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
