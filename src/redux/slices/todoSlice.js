import { createSlice } from '@reduxjs/toolkit';

import { getTodos, addTodos, deleteTodos } from '../asyncActions';

const initialState = {
  todos: [],
  favoriteTodos: [],
  deletedTodos: [],
  loading: false,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
      state.favoriteTodos = action.payload.favorite
        ? [...state.favoriteTodos, action.payload]
        : [...state.favoriteTodos];
    },
    editTodo: (state, action) => {
      state.todos = state.todos.map((item) => {
        if (action.payload.id === item.id) {
          return action.payload;
        }
        return item;
      });

      state.favoriteTodos = state.todos.filter((item) => item.favorite);
    },
    deleteTodo: (state, action) => {
      const deletedValue = state.deletedTodos.find((item) => item.id === action.payload);
      if (deletedValue) {
        state.deletedTodos = state.deletedTodos.filter((item) => item.id !== deletedValue.id);
      }

      state.deletedTodos = [
        ...state.deletedTodos,
        ...state.todos
          .filter((item) => item.id === action.payload)
          .map((item) => ({ ...item, isDeleted: true })),
      ];

      state.todos = state.todos.filter((item) => item.id !== action.payload);
      state.favoriteTodos = state.favoriteTodos.filter((item) => item.id !== action.payload);
    },
    restoreTodo: (state, action) => {
      const restoredTodo = state.deletedTodos
        .filter((item) => item.id === action.payload)
        .map((item) => ({ ...item, isDeleted: false }));
      state.todos = [...state.todos, ...restoredTodo];

      state.favoriteTodos = restoredTodo[0].favorite
        ? [...state.favoriteTodos, ...restoredTodo]
        : [...state.favoriteTodos];
      state.deletedTodos = state.deletedTodos.filter((item) => item.id !== action.payload);
    },
    deleteAll: (state) => {
      state.deletedTodos = [];
    },
    clearAllTodos: (state) => {
      state.todos = [];
      state.favoriteTodos = [];
      state.deletedTodos = [];
    },
  },
  extraReducers: {
    [getTodos.pending]: (state) => {
      state.loading = true;
    },
    [getTodos.fulfilled]: (state, action) => {
      state.loading = false;
      const sortedTodos = action.payload.sort((a, b) => Number(b.important) - Number(a.important));
      state.todos = sortedTodos.filter((item) => item.isDeleted !== true);
      state.favoriteTodos = sortedTodos.filter((item) => !item.isDeleted && item.favorite);
      state.deletedTodos = sortedTodos.filter((item) => item.isDeleted);
    },
    [getTodos.rejected]: (state) => {
      state.loading = false;
    },
    [addTodos.fulfilled]: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    [deleteTodos.fulfilled]: (state, action) => {
      state.deletedTodos = state.deletedTodos.filter(
        (item) => !action.payload.find((docId) => docId === item.docId),
      );
    },
  },
});

const todoReducer = todoSlice.reducer;
export { todoReducer };

export const { addTodo, editTodo, deleteTodo, restoreTodo, deleteAll, clearAllTodos } =
  todoSlice.actions;
