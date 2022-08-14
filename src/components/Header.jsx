import React, { useContext, useRef } from 'react';
import {
  Box,
  AppBar,
  IconButton,
  Toolbar,
  TextField,
  useTheme,
  Button,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, Home as HomeIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { SearchContext } from '../utils/contexts/searchContext';
import { useAuth } from '../utils/contexts/authContext';

export const Header = () => {
  const { authUser, logout } = useAuth();
  const { setSearchValue } = useContext(SearchContext);
  const searchRef = useRef(null);
  const { palette } = useTheme();

  const userLogout = async () => {
    try {
      if (window.confirm('Are you sure that you want to logout?')) {
        await logout();
      }
    } catch (err) {
      alert(err);
    }
  };

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
              <Link to="/" style={{ textDecoration: 'none' }}>
                <HomeIcon
                  sx={{
                    color: palette.AssistanceColor.main,
                    fontSize: 35,
                  }}
                />
              </Link>
            </IconButton>
            <IconButton color="inherit" aria-label="menu">
              <MenuIcon
                sx={{
                  display: { mobile: 'block', tablet: 'none' },
                  color: palette.AssistanceColor.main,
                  fontSize: 35,
                }}
              />
            </IconButton>
            <IconButton onClick={() => searchRef.current.focus()} color="inherit">
              <SearchIcon sx={{ color: palette.AssistanceColor.main, fontSize: 30 }} />
            </IconButton>
            <TextField
              placeholder="Search your todo"
              variant="standard"
              color="secondary"
              type="text"
              inputRef={searchRef}
              sx={{
                display: { mobile: 'none', tablet: 'block' },
              }}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            fontSize: '25px',
            alignItems: 'center',
          }}>
          {authUser && (
            <Typography variant="h5" sx={{ color: palette.AssistanceColor.main }}>
              {authUser.displayName}
            </Typography>
          )}
          {authUser && (
            <Button
              onClick={userLogout}
              size="large"
              sx={{
                fontSize: '20px',
                color: palette.AssistanceColor.main,
              }}>
              Logout
            </Button>
          )}
          {!authUser && (
            <>
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
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
