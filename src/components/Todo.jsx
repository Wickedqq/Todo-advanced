import { Box, Container, IconButton, TextField, Typography, useTheme } from '@mui/material';
import {
  StarOutlined as StarOutlinedIcon,
  StarBorderOutlined as StarBorderOutlinedIcon,
  LabelImportantOutlined as LabelImportantOutlinedIcon,
  LabelImportantTwoTone as LabelImportantTwoToneIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Restore as RestoreIcon,
} from '@mui/icons-material';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo, restoreTodo } from '../redux/slices/todoSlice';
import { useAuth } from '../utils/contexts/authContext';
import { deleteTodos, editTodos } from '../redux/asyncActions';

export const Todo = ({ id, docId, task, important, favorite, isDeleted }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [taskValue, setTaskValue] = useState(task);
  const [favoriteValue, setFavoriteValue] = useState(favorite);
  const [importantValue, setImportantValue] = useState(important);
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const { authUser } = useAuth();

  const switchFavorite = () => {
    setFavoriteValue((value) => !value);
    const editedTask = {
      id,
      docId,
      task: taskValue,
      important: importantValue,
      favorite: !favoriteValue,
      isDeleted: isDeleted,
    };
    if (authUser) {
      dispatch(editTodos({ todoData: { ...editedTask }, uid: authUser.uid, docId }));
    }
    dispatch(editTodo(editedTask));
  };

  const switchImportant = () => {
    setImportantValue((value) => !value);
    const editedTask = {
      id,
      docId,
      task: taskValue,
      important: !importantValue,
      favorite: favoriteValue,
      isDeleted: isDeleted,
    };
    if (authUser) {
      dispatch(editTodos({ todoData: { ...editedTask }, uid: authUser.uid, docId }));
    }
    dispatch(editTodo(editedTask));
  };

  const editTodoFunction = (e) => {
    setOpenEdit((value) => !value);
    const editedTask = {
      id,
      docId,
      task: taskValue,
      important: importantValue,
      favorite: favoriteValue,
      isDeleted: isDeleted,
    };
    if (task !== taskValue) {
      if (authUser) {
        dispatch(editTodos({ todoData: { ...editedTask }, uid: authUser.uid, docId }));
      }
      dispatch(editTodo(editedTask));
    }
  };

  const deleteTodoFunction = () => {
    if (isDeleted && window.confirm('are you sure than you want to completely delete this todo?')) {
      if (authUser) {
        dispatch(
          deleteTodos({
            uid: authUser.uid,
            deleteDocIds: [docId],
            amount: 1,
          }),
        );
      } else {
        dispatch(deleteTodo(id));
      }
    }
    if (!isDeleted) {
      if (authUser) {
        const editedTask = {
          id,
          docId,
          task: taskValue,
          important: importantValue,
          favorite: favoriteValue,
          isDeleted: true,
        };
        dispatch(editTodos({ todoData: { ...editedTask }, uid: authUser.uid, docId }));
      } else {
      }
      dispatch(deleteTodo(id));
    }
  };

  const restoreTodoFunction = () => {
    if (authUser) {
      const editedTask = {
        id,
        docId,
        task: taskValue,
        important: importantValue,
        favorite: favoriteValue,
        isDeleted: false,
      };
      dispatch(editTodos({ todoData: { ...editedTask }, uid: authUser.uid, docId }));
    }
    dispatch(restoreTodo(id));
  };

  return (
    <Container
      sx={{
        maxHeight: '200px',
        display: 'grid',
        gridTemplate: 'repeat(10, 1fr) / repeat(10, 1fr)',
        boxShadow: '0px 0px 15px 3px rgba(0,0,0,0.53)',
      }}>
      <Box sx={{ gridColumn: '1/8', gridRow: '1/-1', overflowY: 'auto' }}>
        {openEdit ? (
          <TextField
            variant="outlined"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
          />
        ) : (
          taskValue
        )}
      </Box>
      <Box sx={{ gridColumn: '8/-1', gridRow: '1/3', justifySelf: 'end' }}>
        <IconButton onClick={switchFavorite}>
          {favoriteValue ? <StarOutlinedIcon color="primary" /> : <StarBorderOutlinedIcon />}
        </IconButton>
      </Box>
      <Box sx={{ gridColumn: '8/-1', gridRow: '3/5', justifySelf: 'end' }}>
        <IconButton onClick={switchImportant}>
          {importantValue ? (
            <LabelImportantOutlinedIcon sx={{ color: palette.error.main }} />
          ) : (
            <LabelImportantTwoToneIcon />
          )}
        </IconButton>
      </Box>
      <Box sx={{ display: 'grid', gridColumn: '8/-1', gridRow: '7/-2' }}>
        <IconButton sx={{ alignSelf: 'start', justifySelf: 'end' }} onClick={editTodoFunction}>
          <EditIcon />
        </IconButton>
        <IconButton sx={{ alignSelf: 'start', justifySelf: 'end' }} onClick={deleteTodoFunction}>
          <DeleteIcon />
        </IconButton>
      </Box>
      {isDeleted && (
        <IconButton
          sx={{ width: 'fit-content', gridColumn: '1/8', gridRow: '9/-1', alignSelf: 'start' }}
          onClick={restoreTodoFunction}>
          <RestoreIcon />
          <br />
          <Typography element="span" sx={{ marginLeft: '5px' }}>
            restore todo
          </Typography>
        </IconButton>
      )}
    </Container>
  );
};
