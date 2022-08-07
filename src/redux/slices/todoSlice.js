import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    favoriteTodos: [],
    deletedTodos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id === action.payload);
    },
    setIsFavoriteTodo: (state, action) => {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, favorite: !item.favorite };
        }
        return item;
      });
      state.favoriteTodos = state.todos.filter((item) => item.id === action.payload.id);
    },
  },
});

const todoReducer = todoSlice.reducer;
export { todoReducer };

export const { addTodo, deleteTodo, setIsFavoriteTodo } = todoSlice.actions;
