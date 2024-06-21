import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, toggleComplete, deleteTodo } from './store/todoSlice';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Todo List</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <TextField
          label="New Todo"
          variant="outlined"
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddTodo}>
          Add Todo
        </Button>
        <List>
          {todos.map(todo => (
            <ListItem key={todo.id} dense button>
              <Checkbox
                edge="start"
                checked={todo.completed}
                onClick={() => dispatch(toggleComplete(todo.id))}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText
                primary={todo.title}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteTodo(todo.id))}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default App;
