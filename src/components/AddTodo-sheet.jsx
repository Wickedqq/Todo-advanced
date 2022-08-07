import { ThemeContext } from '../utils/modeContext';
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
} from '@mui/icons-material';

import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/slices/todoSlice';

export const AddTodoSheet = ({ addTodoOpener }) => {
  const [todoData, setTodoData] = useState({
    task: '',
    important: false,
    favorite: false,
  });
  const dispatch = useDispatch();
  const { mode } = useContext(ThemeContext);
  const { palette } = useTheme();

  const changeTodoData = (event) => {
    const { name, value, checked } = event.target;

    setTodoData((prevData) => ({
      ...prevData,
      [name]: name === 'important' ? checked : value,
    }));
  };

  const addTodoFunction = () => {
    dispatch(addTodo(todoData));
    addTodoOpener(false);
  };

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
          gridColumn: '1 / 6',
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
          gridColumn: '1 / 6',
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
      <Button
        onClick={addTodoFunction}
        sx={{
          gridColumn: '1 / 3',
          gridRow: '10/-1',
          backgroundColor: palette.secondary.main,
          color: palette.AssistanceColor.main,
          marginBottom: '5px',
          alignSelf: 'center',
        }}
        startIcon={<DoneOutlinedIcon />}
        variant="outline">
        Add
      </Button>
    </Container>
  );
};