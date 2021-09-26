import { createStore } from 'vuex';
import {
  getTodosCall, addTodoCall, deleteTodoCall, toggleTodoCall, editTodoCall,
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
    DELETE_TODO(state, id) {
      state.todos = state.todos.filter((_, index) => index !== id);
    },
    TOGGLE_TODO(state, index) {
      state.todos[index].completed = !state.todos[index].completed;
    },
    EDIT_TODO(state, payload) {
      state.todos[payload.index].title = payload.newTodoDescription;
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
    async deleteTodo({ commit }, { key, id }) {
      await deleteTodoCall(id);

      commit('DELETE_TODO', key);
    },
    async toggleTodo({ commit, state }, { index, id }) {
      await toggleTodoCall(id, !state.todos[index].completed);

      commit('TOGGLE_TODO', index);
    },
    async editTodo({ commit }, payload) {
      await editTodoCall(payload.id, payload.newTodoDescription);

      commit('EDIT_TODO', payload);
    },
  },
  getters: {
    newTodo: (state) => state.newTodo,
    getFilteredTodos: (state) => (current, pageSize) => state.todos.filter(
      (e, index) => index >= (current - 1) * pageSize && index < current * pageSize,
    ),
  },
});
