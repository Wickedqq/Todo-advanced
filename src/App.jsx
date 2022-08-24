import { Route, Routes } from 'react-router-dom';
import { Container, Box, CssBaseline, useTheme } from '@mui/material';
import {
  // pages
  HomePage,
  LoginPage,
  RegisterPage,
  FavoriteTodosPage,
  DeletedTodosPage,
  UserPage,
  // components
  Header,
  Sidebar,
  PageWrapper,
} from './utils/exporter';
import { useInSpecificPage } from './utils/inSpecificPage';
import { useDispatch } from 'react-redux';
import { useAuth } from './utils/contexts/authContext';
import { getTodos } from './redux/asyncActions';
import { useEffect } from 'react';

function App() {
  const { authUser } = useAuth();
  const { palette } = useTheme();
  const { inAuthPage, inUserPage } = useInSpecificPage();
  const dispatch = useDispatch();

  useEffect(() => {
    authUser && dispatch(getTodos(authUser.uid));
  }, [authUser]);

  return (
    <Container maxWidth={false} disableGutters={true} sx={{ height: '100vh' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
        }}>
        {!inAuthPage && !inUserPage && (
          <Box
            sx={{
              display: { mobile: 'none', tablet: 'block' },
              flexGrow: 1,
              minWidth: '250px',
              width: { mobile: '100vw', tablet: '20%' },
              height: { mobile: '250px', tablet: '88vh' },
              backgroundColor: palette.secondary.main,
              position: 'relative',
            }}>
            <Sidebar />
          </Box>
        )}
        <PageWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favoritetodos" element={<FavoriteTodosPage />} />
            <Route path="/deletedtodos" element={<DeletedTodosPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/me" element={<UserPage />} />
          </Routes>
        </PageWrapper>
      </Box>
      <CssBaseline />
    </Container>
  );
}

export default App;
