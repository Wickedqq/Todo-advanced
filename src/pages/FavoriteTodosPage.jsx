import React, { useContext } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import { SkeletonLoader, Todo } from '../utils/exporter';
import { SearchContext } from '../utils/contexts/searchContext';

export const FavoriteTodosPage = () => {
  const { favoriteTodos, loading } = useSelector((state) => state.todoReducer);
  const { palette } = useTheme();
  const { searchValue } = useContext(SearchContext);
  const runArray = Array(10).fill(null);

  return (
    <>
      {!loading
        ? favoriteTodos &&
          favoriteTodos.map((item, i) => {
            return (
              item.task.includes(searchValue) && (
                <Todo
                  key={i * (Math.random() * 100)}
                  id={item.id}
                  docId={item.docId}
                  task={item.task}
                  important={item.important}
                  favorite={item.favorite}
                  isDeleted={item.isDeleted}
                />
              )
            );
          })
        : runArray.map((item) => {
            return (
              <Box
                key={Math.random()}
                sx={{
                  width: '280px',
                  height: '180px',
                }}>
                <SkeletonLoader />
              </Box>
            );
          })}
      {!loading && !favoriteTodos.length && (
        <Typography
          variant="h5"
          sx={{
            gridColumn: '1/-1',
            gridRow: '1/-1',
            alignSelf: 'center',
            justifySelf: 'center',
            color: palette.AssistanceColor.main,
          }}>
          There is no favorites here yet
        </Typography>
      )}
    </>
  );
};
