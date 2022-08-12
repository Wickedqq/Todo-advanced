import { Box, Container, IconButton, useTheme } from '@mui/material';
import {
  StarOutlined as StarOutlinedIcon,
  StarBorderOutlined as StarBorderOutlinedIcon,
  LabelImportantOutlined as LabelImportantOutlinedIcon,
  LabelImportantTwoTone as LabelImportantTwoToneIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, setIsFavoriteTodo, setIsimportantTodo } from '../redux/slices/todoSlice';
import { useLocation } from 'react-router-dom';

export const Todo = ({ id, task, important, favorite }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const deleteTodoFunction = () => {
    if (
      location.pathname === '/deletedtodos' &&
      window.confirm('are you sure than you want to completely delete this todo?')
    ) {
      dispatch(deleteTodo(id));
    }
    if (location.pathname !== '/deletedtodos') {
      dispatch(deleteTodo(id));
    }
  };

  return (
    <Container
      sx={{
        maxHeight: '200px',
        display: 'grid',
        gridTemplate: 'repeat(10, 1fr) / repeat(10, 1fr)',
      }}>
      <Box sx={{ gridColumn: '1/8', gridRow: '1/-1', overflowY: 'auto' }}>{task}</Box>
      <Box sx={{ gridColumn: '8/-1', gridRow: '1/3', justifySelf: 'end' }}>
        <IconButton onClick={() => dispatch(setIsFavoriteTodo(id))}>
          {favorite ? <StarOutlinedIcon color="primary" /> : <StarBorderOutlinedIcon />}
        </IconButton>
      </Box>
      <Box sx={{ gridColumn: '8/-1', gridRow: '3/5', justifySelf: 'end' }}>
        <IconButton onClick={() => dispatch(setIsimportantTodo(id))}>
          {important ? (
            <LabelImportantOutlinedIcon sx={{ color: palette.error.main }} />
          ) : (
            <LabelImportantTwoToneIcon />
          )}
        </IconButton>
      </Box>
      <Box sx={{ gridColumn: '8/-1', gridRow: '8/-1', alignSelf: 'end', justifySelf: 'end' }}>
        <IconButton onClick={deleteTodoFunction}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Container>
  );
};
