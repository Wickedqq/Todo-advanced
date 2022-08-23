import { Box, Stack, Typography, Button, useTheme, styled, Container } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/contexts/authContext';
import { SearchContext } from '../utils/contexts/searchContext';
import { TodoSmall, UserSidebar } from '../utils/exporter';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.AssistanceColor.main,
  border: `1px solid ${theme.palette.AssistanceColor.dark}`,
  borderRadius: '10px',
  marginTop: '5px',
  padding: '5px 10px',
  '&:hover': {
    backgroundColor: theme.palette.AssistanceColor.dark,
    color: 'white',
  },
}));

export const UserPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('favorite');
  const { todos } = useSelector((state) => state.todoReducer);
  const { authUser } = useAuth();
  const { searchValue } = useContext(SearchContext);
  const navigate = useNavigate();
  const { palette } = useTheme();
  const filters = [
    { name: 'Favorite Todos', ref: 'favorite' },
    { name: 'Important Todos', ref: 'important' },
  ];

  useEffect(() => {
    !authUser && navigate('/');
  }, [authUser, navigate]);

  return (
    <>
      {authUser && <UserSidebar authUser={authUser} />}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'repeat(10, 1fr)',
          gridRow: '1/-1',
          gridColumn: '3/-1',
          gap: 2,
        }}>
        <Box
          sx={{
            gridRow: '1/3',
            gridColumn: '1/-1',
            backgroundColor: palette.secondary.main,
          }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
            sx={{ height: '100%', color: palette.AssistanceColor.main }}>
            {filters.map(({ name, ref }) => (
              <StyledButton
                sx={{ backgroundColor: selectedFilter === ref && palette.primary.main }}
                onClick={() => setSelectedFilter(ref)}>
                <Typography variant="h5">{name}</Typography>
              </StyledButton>
            ))}
          </Stack>
        </Box>
        <Container
          maxWidth="lg"
          sx={{
            gridRow: '3/-1',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, auto))',
            gridAutoRows: '230px',
            gap: 3,
          }}>
          {todos
            .filter((item) => {
              return selectedFilter === 'favorite' && item.favorite && !item.isDeleted
                ? item.favorite
                : selectedFilter === 'important' &&
                    item.important &&
                    !item.isDeleted &&
                    item.important;
            })
            .map((item, i) => {
              return (
                item.task.includes(searchValue) && (
                  <TodoSmall key={i * (Math.random() * 100)} wholeTodo={item} />
                )
              );
            })}
        </Container>
      </Box>
    </>
  );
};
