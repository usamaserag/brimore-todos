import axios from 'axios';

export const getTodosCall = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data;
};

export const addTodoCall = async (newTodo) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
    userId: 1,
    title: newTodo,
    completed: false,
  });
  return response.data;
};

export const deleteTodoCall = async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
};

export const toggleTodoCall = async (id, completed) => {
  const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    completed,
  });

  return response.data;
};

export const editTodoCall = async (id, title) => {
  const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    title,
  });

  return response.data;
};
