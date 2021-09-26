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
