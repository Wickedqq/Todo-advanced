import React, { useContext } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { SkeletonLoader, Todo } from '../utils/exporter';
import { SearchContext } from '../utils/contexts/searchContext';
import { deleteAll } from '../redux/slices/todoSlice';
import { deleteTodos } from '../redux/asyncActions';
import { useAuth } from '../utils/contexts/authContext';

export const DeletedTodosPage = () => {
  const { deletedTodos, loading } = useSelector((state) => state.todoReducer);
  const { palette } = useTheme();
  const { searchValue } = useContext(SearchContext);
  const dispatch = useDispatch();
  const { authUser } = useAuth();

  const runArray = Array(10).fill(null);

  const removeDeletedTodos = () => {
    if (window.confirm('are you sure you want to remove all deleted todos?')) {
      if (authUser) {
        dispatch(
          deleteTodos({
            uid: authUser.uid,
            deleteDocIds: deletedTodos.map((item) => `${item.docId}`),
            amount: deletedTodos.length,
          }),
        );
      } else {
        dispatch(deleteAll());
      }
    }
  };

  return (
    <>
      {!loading
        ? deletedTodos &&
          deletedTodos.map((item, i) => {
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
      {!loading && !deletedTodos.length && (
        <Typography
          variant="h5"
          sx={{
            gridColumn: '1/-1',
            gridRow: '1/-1',
            alignSelf: 'center',
            justifySelf: 'center',
            color: palette.AssistanceColor.main,
          }}>
          There is no deleted Todos yet
        </Typography>
      )}
      {!!deletedTodos.length && (
        <Button
          onClick={removeDeletedTodos}
          sx={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translate(-50%)',
            fontSize: '25px',
            color: palette.AssistanceColor.main,
          }}>
          Delete all
        </Button>
      )}
    </>
  );
};
