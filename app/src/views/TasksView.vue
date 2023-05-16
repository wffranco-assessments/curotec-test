<template>
  <div class="container p-3">
    <h1>Testing bootstrap --- input with button</h1>
    <form @submit.prevent="add">
      <div class="input-group">
        <input
          v-model="title"
          type="text"
          class="form-control"
          placeholder="New Task"
          aria-label="New Task"
          aria-describedby="search-addon"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="search-addon"
        >
          + Add
        </button>
      </div>
    </form>

    <ul v-if="tasks.length" class="list-group">
      <li
        v-for="(task, index) in tasks"
        :key="index"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        {{ task.title }}
        <button @click="removeTask(index)" class="btn btn-sm btn-danger">
          X
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTasksStore } from "../stores/tasks";

export default defineComponent({
  name: "TasksView",
  setup() {
    const id = ref(1);
    const title = ref('');
    const { tasks, addTask, removeTask } = useTasksStore();
    function add() {
      addTask({
        id: id.value,
        title: title.value,
      })
      id.value++;
    }
    return { tasks, title, add, removeTask };
  },
});
</script>


<style>
</style>