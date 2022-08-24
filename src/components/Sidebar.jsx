import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
import {
  Brightness4Outlined as Brightness4OutlinedIcon,
  Brightness4 as Brightness4Icon,
  Star as StarIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { ThemeContext } from '../utils/contexts/modeContext';
import { AddTodo, AddTodoSheet } from '../utils/exporter';
import { useInSpecificPage } from '../utils/inSpecificPage';

export const Sidebar = ({ setOpenBurger }) => {
  const [addTodoIsOpen, setAddTodoIsOpen] = useState(false);
  const { palette } = useTheme();
  const { mode, saveCurrentMode } = useContext(ThemeContext);
  const { currentPage } = useInSpecificPage();
  const navigation = [
    {
      name: 'Home',
      icon: (
        <HomeIcon fontSize="large" sx={{ color: currentPage === '/' && palette.primary.main }} />
      ),
    },
    {
      name: 'Favorite',
      icon: (
        <StarIcon
          fontSize="large"
          sx={{ color: currentPage === '/favoritetodos' && palette.primary.main }}
        />
      ),
    },
    {
      name: 'Deleted',
      icon: (
        <DeleteIcon
          fontSize="large"
          sx={{ color: currentPage === '/deletedtodos' && palette.primary.main }}
        />
      ),
    },
  ];

  const addTodoOpener = (bool) => {
    setAddTodoIsOpen(bool);
  };

  const closeBurger = () => {
    if (setOpenBurger) setOpenBurger(false);
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        sx={{ marginTop: '20px' }}>
        {navigation.map((item, i) => {
          const to = item.name === 'Home' ? '/' : item.name.toLowerCase() + 'todos';
          return (
            <Link
              key={i * Math.random()}
              to={to}
              onClick={closeBurger}
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <IconButton>{item.icon}</IconButton>
              <Typography variant="h5" sx={{ color: palette.AssistanceColor.main }}>
                {item.name}
              </Typography>
            </Link>
          );
        })}
      </Stack>
      <IconButton
        onClick={() => saveCurrentMode(mode === 'light' ? 'dark' : 'light')}
        sx={{ position: 'absolute', bottom: 10, left: 10 }}>
        {mode === 'light' ? (
          <Brightness4Icon fontSize="large" />
        ) : (
          <Brightness4OutlinedIcon fontSize="large" />
        )}
      </IconButton>
      <Button
        onClick={() => setAddTodoIsOpen(!addTodoIsOpen)}
        sx={{ position: 'absolute', bottom: 10, right: 10 }}>
        <AddTodo />
      </Button>
      {addTodoIsOpen && <AddTodoSheet addTodoOpener={addTodoOpener} />}
    </>
  );
};
