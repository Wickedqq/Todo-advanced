import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Typography, Button, useTheme, styled, Container } from '@mui/material';
import { nanoid } from 'nanoid';

import { SkeletonLoaderSmall, TodoSmall, UserSidebar } from '../utils/exporter';
import { useAuth } from '../utils/contexts/authContext';
import { SearchContext } from '../utils/contexts/searchContext';

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

  const { todos, loading } = useSelector((state) => state.todoReducer);
  const { searchValue } = useContext(SearchContext);
  const { authUser } = useAuth();
  const { palette } = useTheme();
  const navigate = useNavigate();

  const filters = [
    { name: 'Favorite Todos', ref: 'favorite' },
    { name: 'Important Todos', ref: 'important' },
  ];
  const runArray = Array(10).fill(null);

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
          gridColumn: { mobile: '1/-1', tablet: '3/-1' },
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
            spacing={3}
            sx={{ height: '100%', color: palette.AssistanceColor.main }}>
            {filters.map(({ name, ref }) => (
              <StyledButton
                key={nanoid()}
                sx={{ backgroundColor: selectedFilter === ref && palette.primary.main }}
                onClick={() => setSelectedFilter(ref)}>
                <Typography variant="h6">{name}</Typography>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, auto))',
            gridAutoRows: '230px',
            gap: 3,
          }}>
          {!loading
            ? todos
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
                    item.task.includes(searchValue) && <TodoSmall key={nanoid()} wholeTodo={item} />
                  );
                })
            : runArray.map((item, i) => {
                return <SkeletonLoaderSmall key={nanoid()} />;
              })}
        </Container>
      </Box>
    </>
  );
};
