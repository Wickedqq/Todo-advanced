import React, { useContext } from 'react';
import { Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import { Todo } from '../utils/exporter';
import { SearchContext } from '../utils/contexts/searchContext';

export const HomePage = () => {
  const { todos } = useSelector((state) => state.todoReducer);
  const { palette } = useTheme();
  const { searchValue } = useContext(SearchContext);

  return (
    <>
      {todos &&
        todos.map((item, i) => {
          return (
            item.task.includes(searchValue) && (
              <Todo
                key={i * (Math.random() * 100)}
                id={item.id}
                task={item.task}
                important={item.important}
                favorite={item.favorite}
              />
            )
          );
        })}
      {!todos.length && (
        <Typography
          variant="h5"
          sx={{
            gridColumn: '1/-1',
            gridRow: '1/-1',
            alignSelf: 'center',
            justifySelf: 'center',
            color: palette.AssistanceColor.main,
          }}>
          There is no Todos yet
        </Typography>
      )}
    </>
  );
};
