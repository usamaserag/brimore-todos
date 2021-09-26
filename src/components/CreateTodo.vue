<template>
  <a-form class="todo-input" @keypress.enter="addTodo">
    <a-form-item class="input-container">
      <a-input
        class="input-field"
        placeholder="Add a new todo..."
        size="large"
        v-model:value="formState.newTodo"
      />
    </a-form-item>
    <a-form-item>
      <a-button size="large" type="primary" @click.prevent="addTodo">
        ADD
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { useStore } from 'vuex';
import { reactive } from 'vue';

export default {
  setup() {
    const store = useStore();

    const formState = reactive({
      newTodo: '',
    });

    function addTodo() {
      store.dispatch('addTodo', formState.newTodo);
      formState.newTodo = '';
    }

    return {
      addTodo,
      formState,
    };
  },
};
</script>

<style lang="scss" scoped>
.todo-input {
  display: flex;
}
.input-container {
  width: 100%;
}
.input-field {
  width: 700px;
}
</style>
