import { Box, Container, IconButton } from '@mui/material';
import {
  StarOutlined as StarOutlinedIcon,
  StarBorderOutlined as StarBorderOutlinedIcon,
  LabelImportantOutlined as LabelImportantOutlinedIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import React from 'react';
import { useDispatch } from 'react-redux';

export const Todo = ({ task, important, favorite }) => {
  const dispatch = useDispatch();

  return (
    <Container
      sx={{
        maxHeight: '300px',
        display: 'grid',
        gridTemplate: 'repeat(10, 1fr) / repeat(10, 1fr)',
      }}>
      <Box sx={{ gridColumn: '1/8', gridRow: '1/-1', overflowY: 'auto' }}>{task}</Box>
      <Box sx={{ gridColumn: '8/-1', gridRow: '1/3', justifySelf: 'end' }}>
        <IconButton>{favorite ? <StarOutlinedIcon /> : <StarBorderOutlinedIcon />}</IconButton>
      </Box>
      <Box sx={{ gridColumn: '8/-1', gridRow: '3/5', justifySelf: 'end' }}>
        <IconButton>{important && <LabelImportantOutlinedIcon />}</IconButton>
      </Box>
      <Box sx={{ gridColumn: '8/-1', gridRow: '8/-1', alignSelf: 'end', justifySelf: 'end' }}>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Container>
  );
};
