import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { Todo } from '../utils/exporter';

export const HomePage = () => {
  const { todos } = useSelector((state) => state.todoReducer);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: {
          mobile: 'repeat(1, 1fr)',
          tablet: 'repeat(1, 1fr)',
          wideTablet: 'repeat(2, 1fr)',
          laptop: 'repeat(3, 1fr)',
        },
        gap: 2,
        overflow: 'auto',
      }}>
      {todos &&
        todos.map((item, i) => {
          return (
            <Todo
              key={i * (Math.random() * 100)}
              task={item.task}
              important={item.important}
              favorite={item.favorite}
            />
          );
        })}
    </Box>
  );
};
