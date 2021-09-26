<template>
  <div class="todo">
    <h2>{{ title }}</h2>
    <create-todo />
    <a-list bordered :data-source="filteredTodos" class="list-container">
      <template #renderItem="{ item, index }">
        <a-list-item>
          <todo
            :key="index + (current - 1) * pageSize"
            :index="index + (current - 1) * pageSize"
            :id="item.id"
            :description="item.title"
            :completed="item.completed"
          />
        </a-list-item>
      </template>
    </a-list>
    <a-pagination
      class="pagination-box"
      v-model:current="current"
      :pageSize="pageSize"
      :total="todos.length"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import Todo from './Todo.vue';
import CreateTodo from './CreateTodo.vue';

export default {
  setup() {
    return {
      current: ref(1),
    };
  },
  data() {
    return {
      pageSize: 7,
    };
  },
  props: {
    title: String,
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    filteredTodos() {
      return this.$store.getters.getFilteredTodos(this.current, this.pageSize);
    },
  },
  mounted() {
    this.$store.dispatch('getTodos');
  },
  components: { Todo, CreateTodo },
};
</script>

<style scoped lang="scss">
.todo {
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.ant-list-item > div {
  width: 100%;
}
.pagination-box {
  margin: 10px auto;
}
.list-container {
  min-height: 400px;
}
</style>
