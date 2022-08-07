import { Route, Routes, useLocation } from 'react-router-dom';
import { Container, Box, CssBaseline } from '@mui/material';
import {
  // pages
  HomePage,
  LoginPage,
  RegisterPage,
  FavoriteTodosPage,
  DeletedTodosPage,
  // components
  Header,
  Sidebar,
} from './utils/exporter';

function App() {
  const location = useLocation();

  return (
    <Container maxWidth={false} disableGutters={true} sx={{ height: '100vh' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          height: 'fit-content',
        }}>
        {location.pathname !== '/login' && location.pathname !== '/register' && <Sidebar />}
        <Box
          sx={{
            width: { mobile: '100%', tablet: '80%' },
            height: '88vh',
          }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favoritetodos" element={<FavoriteTodosPage />} />
            <Route path="/deletedtodos" element={<DeletedTodosPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Box>
      </Box>
      <CssBaseline />
    </Container>
  );
}

export default App;
