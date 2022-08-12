import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  favoriteTodos: [],
  deletedTodos: [],
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
    setIsFavoriteTodo: (state, action) => {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload) {
          return { ...item, favorite: !item.favorite };
        }
        return item;
      });
      state.favoriteTodos = state.todos.filter((item) => item.favorite === true);
    },
    setIsimportantTodo: (state, action) => {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload) {
          return { ...item, important: !item.important };
        }
        return item;
      });
    },
    deleteTodo: (state, action) => {
      const deletedValue = state.deletedTodos.find((item) => item.id === action.payload);
      if (deletedValue) {
        state.deletedTodos = state.deletedTodos.filter((item) => item.id !== deletedValue.id);
      }

      state.deletedTodos = [
        ...state.deletedTodos,
        ...state.todos.filter((item) => item.id === action.payload),
      ];

      state.todos = state.todos.filter((item) => item.id !== action.payload);
      state.favoriteTodos = state.favoriteTodos.filter((item) => item.id !== action.payload);
    },
    deleteAll: (state) => {
      state.deletedTodos = [];
    },
  },
});

const todoReducer = todoSlice.reducer;
export { todoReducer };

export const { addTodo, setIsFavoriteTodo, setIsimportantTodo, deleteTodo, deleteAll } =
  todoSlice.actions;
