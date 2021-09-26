<template>
  <div class="todo-item">
    <div>
      <a-checkbox>
        {{ description }}
      </a-checkbox>
      <a-form>
        <a-form-item class="edit-field">
          <a-input
            type="text"
          />
        </a-form-item>
      </a-form>
    </div>
    <div>
      <a-button
        type="primary"
        class="edit-btn"
      >
        <template #icon>
          <EditOutlined />
        </template>
      </a-button>
        <a-button type="danger">
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
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
  },
  props: {
    description: String,
    index: Number,
    id: Number,
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
}
.edit-btn {
  margin-right: 20px;
}
</style>
