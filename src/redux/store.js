import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { todoReducer } from './slices/todoSlice';

const reducer = combineReducers({
  todoReducer,
});

const store = configureStore({ reducer });

export default store;
