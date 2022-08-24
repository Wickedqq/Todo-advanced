import React, { useContext, useRef, useState, useEffect } from 'react';
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
import { clearAllTodos } from '../redux/slices/todoSlice';
import { useDispatch } from 'react-redux';
import { Sidebar } from './Sidebar';
import { useWindowWidth } from '../utils/useWindowWidth';
import { useInSpecificPage } from '../utils/inSpecificPage';
import { UserShowDown, SearchShowDown } from '../utils/exporter';

export const Header = () => {
  const windowWidth = useWindowWidth();
  const [openBurger, setOpenBurger] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { inUserPage } = useInSpecificPage();
  const { authUser, logout } = useAuth();
  const { setSearchValue } = useContext(SearchContext);
  const searchRef = useRef(null);
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const userLogout = async () => {
    try {
      if (window.confirm('Are you sure that you want to logout?')) {
        dispatch(clearAllTodos());
        await logout();
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (windowWidth > 640) {
      setOpenBurger(false);
      setOpenSearch(false);
    }
  }, [windowWidth]);

  return (
    <AppBar
      position="sticky"
      sx={{
        height: '12vh',
        minHeight: '80px',
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
            <IconButton
              onClick={() => {
                setOpenSearch(false);
                setOpenBurger((value) => !value);
              }}
              sx={{
                display: { mobile: 'block', tablet: 'none' },
              }}
              color="inherit"
              aria-label="menu">
              <MenuIcon
                sx={{
                  color: palette.AssistanceColor.main,
                  fontSize: 35,
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => {
                searchRef.current.focus();
                if (windowWidth < 640) {
                  setOpenBurger(false);
                  setOpenSearch((value) => !value);
                }
              }}
              color="inherit">
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
            flexDirection: { mobile: 'column', tablet: 'row' },
            gap: { mobile: 0, tablet: 1 },
            fontSize: '25px',
            alignItems: 'center',
          }}>
          {authUser && (
            <Link to="/me" style={{ textDecoration: 'none' }}>
              <Typography variant="h5" sx={{ color: palette.AssistanceColor.main }}>
                {authUser.displayName}
              </Typography>
            </Link>
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
      {openBurger && (
        <Box
          sx={{
            width: '100vw',
            height: '400px',
            backgroundColor: palette.secondary.main,
            position: 'absolute',
            top: '80px',
          }}>
          {inUserPage ? (
            <UserShowDown authUser={authUser} />
          ) : (
            <Sidebar setOpenBurger={setOpenBurger} />
          )}
        </Box>
      )}
      {openSearch && <SearchShowDown />}
    </AppBar>
  );
};
