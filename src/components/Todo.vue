<template>
  <div class="todo-item">
    <div>
      <a-checkbox
        v-if="!isEditing"
        @change="toggleTodo"
        :checked="completed"
        :class="{ completed }"
      >
        {{ description }}
      </a-checkbox>
      <a-form v-else @submit.prevent="finishEditing()">
        <a-form-item class="edit-field">
          <a-input
            type="text"
            v-model:value="newTodoDescription"
            @blur="finishEditing()"
            ref="newTodo"
          />
        </a-form-item>
      </a-form>
    </div>
    <div>
      <a-button
        type="primary"
        @click="startEditing()"
        class="edit-btn"
      >
        <template #icon>
          <EditOutlined />
        </template>
      </a-button>
      <a-popconfirm
        title="Are you sure delete this todo?"
        ok-text="Yes"
        cancel-text="No"
        cancel="cancel"
        @confirm="deleteTodo"
      >
        <a-button type="danger">
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { reactive } from 'vue';

export default {
  setup(props) {
    const formState = reactive({
      newTodoDescription: props.description,
    });

    return {
      formState,
    };
  },
  data() {
    return {
      isEditing: false,
      newTodoDescription: '',
      cancel: true,
    };
  },
  props: {
    description: String,
    completed: Boolean,
    index: Number,
    id: Number,
  },
  methods: {
    deleteTodo() {
      this.$store.dispatch('deleteTodo', {
        key: this.index,
        id: this.id,
      });
    },
    toggleTodo() {
      this.$store.dispatch('toggleTodo', {
        index: this.index,
        id: this.id,
      });
    },
    startEditing() {
      if (this.isEditing) {
        this.finishEditing();
      } else {
        this.newTodoDescription = this.description;
        this.isEditing = true;
        this.$nextTick(() => this.$refs.newTodo.focus());
      }
    },
    finishEditing() {
      this.$store.dispatch('editTodo', { id: this.id, index: this.index, newTodoDescription: this.newTodoDescription });
      this.isEditing = false;
    },
  },
  components: {
    EditOutlined,
    DeleteOutlined,
  },
};
</script>

<style lang="scss" scoped>
.completed {
  text-decoration: line-through;
}
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .edit-field {
    margin-bottom: 0;
  }
}
.edit-btn {
  margin-right: 20px;
}
</style>
