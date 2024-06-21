import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://todobe-d5fk.onrender.com/api/todos');
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (title) => {
  const response = await axios.post('https://todobe-d5fk.onrender.com/api/todos', { title, completed: false });
  return response.data;
});

export const toggleComplete = createAsyncThunk('todos/toggleComplete', async (id, { getState }) => {
  const state = getState();
  const todo = state.todos.find(todo => todo.id === id);
  const response = await axios.put(`https://todobe-d5fk.onrender.com/api/todos/${id}`, { completed: !todo.completed });
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`https://todobe-d5fk.onrender.com/api/todos/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(toggleComplete.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id);
        state[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return state.filter(todo => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
