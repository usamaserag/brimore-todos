<template>
  <CreateTodo />
</template>

<script>
import CreateTodo from './components/CreateTodo.vue';

export default {
  name: 'App',
  components: {
    CreateTodo,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 800px;
  margin: 20px auto 0;
}
</style>
