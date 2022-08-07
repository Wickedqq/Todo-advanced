import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
import {
  Brightness4Outlined as Brightness4OutlinedIcon,
  Brightness4 as Brightness4Icon,
  Star as StarIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { ThemeContext } from '../utils/modeContext';
import { AddTodo, AddTodoSheet } from '../utils/exporter';

export const Sidebar = () => {
  const [addTodoIsOpen, setAddTodoIsOpen] = useState(false);
  const { palette } = useTheme();
  const { mode, setMode } = useContext(ThemeContext);

  const addTodoOpener = (bool) => {
    setAddTodoIsOpen(bool);
  };

  return (
    <Box
      sx={{
        display: { mobile: 'none', tablet: 'block' },
        flexGrow: 1,
        minWidth: '250px',
        width: '20%',
        height: '88vh',
        backgroundColor: palette.secondary.main,
        position: 'relative',
      }}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        sx={{ marginTop: '30px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <IconButton>
            <HomeIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" sx={{ color: palette.AssistanceColor.main }}>
            Home
          </Typography>
        </Link>
        <Link
          to="/favoritetodos"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <IconButton>
            <StarIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" sx={{ color: palette.AssistanceColor.main }}>
            favorite
          </Typography>
        </Link>
        <Link
          to="/deletedtodos"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <IconButton>
            <DeleteIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" sx={{ color: palette.AssistanceColor.main }}>
            deleted
          </Typography>
        </Link>
      </Stack>
      <IconButton
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
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
    </Box>
  );
};
