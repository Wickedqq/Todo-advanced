import { Route, Routes } from 'react-router-dom';
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
  PageWrapper,
} from './utils/exporter';
import { useInAuthPage } from './utils/inAuthPage';

function App() {
  const inAuthPage = useInAuthPage();

  return (
    <Container maxWidth={false} disableGutters={true} sx={{ height: '100vh' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
        }}>
        {!inAuthPage && <Sidebar />}
        <PageWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favoritetodos" element={<FavoriteTodosPage />} />
            <Route path="/deletedtodos" element={<DeletedTodosPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </PageWrapper>
      </Box>
      <CssBaseline />
    </Container>
  );
}

export default App;
