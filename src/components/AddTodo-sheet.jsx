import { ThemeContext } from '../utils/contexts/modeContext';
import {
  Box,
  Button,
  Container,
  IconButton,
  Switch,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  StarOutlined as StarOutlinedIcon,
  StarBorderOutlined as StarBorderOutlinedIcon,
  DoneOutlined as DoneOutlinedIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { nanoid } from 'nanoid';

import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/slices/todoSlice';
import { useAuth } from '../utils/contexts/authContext';
import { addTodos } from '../redux/asyncActions';

export const AddTodoSheet = ({ addTodoOpener }) => {
  const [todoData, setTodoData] = useState({
    task: '',
    important: false,
    favorite: false,
  });
  const [isValid, setIsValid] = useState(true);

  const { mode } = useContext(ThemeContext);
  const { authUser } = useAuth();
  const { palette } = useTheme();
  const dispatch = useDispatch();

  const changeTodoData = (event) => {
    const { name, value, checked } = event.target;

    setTodoData((prevData) => ({
      ...prevData,
      [name]: name === 'important' ? checked : value,
    }));
  };

  const addTodoFunction = () => {
    if (authUser) {
      dispatch(
        addTodos({
          uid: authUser.uid,
          todoData: {
            ...todoData,
            isDeleted: false,
            id: nanoid(),
          },
        }),
      );
    } else {
      if (todoData.task.length > 0) {
        setIsValid(true);
        dispatch(
          addTodo({
            ...todoData,
            id: nanoid(),
          }),
        );
      }
    }
    setIsValid(false);

    addTodoOpener(false);
  };

  useEffect(() => {
    const onEnterFunction = (event) => {
      if (event.code === 'NumpadEnter' || event.code === 'Enter') {
        addTodoFunction();
      }
    };

    document.addEventListener('keypress', onEnterFunction);

    return () => {
      document.removeEventListener('keypress', onEnterFunction);
    };
  }, [todoData]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(10, 1fr)',
        gridTemplateRows: 'repeat(10, 1fr)',
        position: 'fixed',
        top: '20vh',
        left: '20vw',
        width: '50vw',
        height: '350px',
        backgroundColor: [mode === 'light' ? 'white' : 'black'],
        zIndex: 10,
        borderRadius: '5px',
        boxShadow: [
          mode === 'light'
            ? `0px 0px 30px 12px rgba(0,0,0,0.6)`
            : `0px 0px 30px 12px rgba(252,255,252,0.6)`,
        ],
      }}>
      <TextField
        sx={{ gridColumn: '1 / -1', gridRow: '2/3' }}
        placeholder="Write your task here"
        variant="outlined"
        id="outlined-task"
        name="task"
        value={todoData.task}
        onChange={changeTodoData}
      />
      <Box
        sx={{
          gridColumn: '1 / -1',
          gridRow: '4/5',
          display: 'flex',
          width: 'fit-content',
          alignSelf: 'center',
          justifySelf: 'start',
        }}>
        <Switch
          color="primary"
          name="important"
          checked={todoData.important}
          onChange={changeTodoData}
        />
        <Typography variant="h6">Is important</Typography>
      </Box>
      <Box
        sx={{
          gridColumn: '1 / -1',
          gridRow: '5/6',
          display: 'flex',
          width: 'fit-content',
          alignSelf: 'center',
          justifySelf: 'start',
        }}>
        <IconButton
          name="favorite"
          onClick={() =>
            changeTodoData({ target: { name: 'favorite', value: !todoData.favorite } })
          }>
          {todoData.favorite ? (
            <StarOutlinedIcon color="primary" />
          ) : (
            <StarBorderOutlinedIcon color="primary" />
          )}
        </IconButton>
        <Typography variant="h6">Is favorite</Typography>
      </Box>
      {!isValid && (
        <Typography
          sx={{
            gridColumn: '1 / -1',
            gridRow: '7/8',
            color: palette.error.main,
            fontSize: { mobile: '16px', wideTablet: '22px' },
          }}>
          Task should have at least 1 character
        </Typography>
      )}
      <Button
        onClick={addTodoFunction}
        sx={{
          width: '150px',
          gridColumn: '1 / -1',
          gridRow: '10/-1',
          backgroundColor: palette.secondary.main,
          color: palette.AssistanceColor.main,
          marginBottom: '5px',
          alignSelf: 'center',
          justifySelf: 'start',
        }}
        startIcon={<DoneOutlinedIcon />}
        variant="outline">
        Add
      </Button>
      <IconButton
        onClick={() => addTodoOpener(false)}
        sx={{ gridColumn: '10 / -1', gridRow: '1/2', justifySelf: 'end' }}>
        <CloseIcon />
      </IconButton>
    </Container>
  );
};
