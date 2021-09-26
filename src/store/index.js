import { createStore } from 'vuex';
import {
  getTodosCall,
  addTodoCall,
} from '@/core';

export default createStore({
  state: {
    todos: [],
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    ADD_TODO(state, newTodo) {
      state.todos.push({
        title: newTodo,
        completed: false,
      });
    },
  },
  actions: {
    async getTodos({ commit }) {
      commit('SET_TODOS', await getTodosCall());
    },
    async addTodo({ commit }, newTodo) {
      await addTodoCall(newTodo);

      commit('ADD_TODO', newTodo);
    },
  },
  getters: {
    newTodo: (state) => state.newTodo,
    getFilteredTodos: (state) => (current, pageSize) => state.todos.filter(
      (e, index) => index >= (current - 1) * pageSize
          && index < current * pageSize,
    ),
  },
});
