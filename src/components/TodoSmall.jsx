import { Box, Button, TextField, Typography, useTheme, ClickAwayListener } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodos } from '../redux/asyncActions';
import { useAuth } from '../utils/contexts/authContext';

export const TodoSmall = ({ wholeTodo }) => {
  const [editing, setEditing] = useState(false);
  const [comments, setComments] = useState(wholeTodo.comment || '');
  const { palette } = useTheme();
  const { authUser } = useAuth();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        height: '200px',
        boxShadow: '0px 0px 15px 3px rgba(0,0,0,0.53)',
      }}>
      <Box
        sx={{
          height: '170px',
          padding: '5px 15px',
          overflowY: 'auto',
        }}>
        {wholeTodo.task}
      </Box>
      <ClickAwayListener onClickAway={() => setEditing(false)}>
        <Box
          sx={{
            height: '30px',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={() => setEditing(true)}>
          {editing ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <TextField
                size="small"
                variant="outlined"
                autoFocus={true}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    editTodos({
                      todoData: { ...wholeTodo, comment: comments },
                      uid: authUser.uid,
                      docId: wholeTodo.docId,
                    }),
                  );
                  setEditing(false);
                }}
                variant="filled">
                done
              </Button>
            </Box>
          ) : (
            <Typography sx={{ fontSize: '12px', color: 'grey' }}>
              {comments.length > 0 ? comments : 'click to add a comment'}
            </Typography>
          )}
        </Box>
      </ClickAwayListener>
      <Box
        sx={{
          width: '100%',
          height: '10px',
        }}>
        {wholeTodo.important && (
          <Box
            sx={{
              backgroundColor: palette.error.main,
              height: wholeTodo.favorite ? '5px' : '10px',
            }}></Box>
        )}
        {wholeTodo.favorite && (
          <Box
            sx={{
              backgroundColor: palette.primary.main,
              height: wholeTodo.important ? '5px' : '10px',
            }}></Box>
        )}
      </Box>
    </Box>
  );
};
