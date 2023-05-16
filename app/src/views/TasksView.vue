<template>
  <div class="container p-3">
    <h1>
      Tasks
      <small class="text-secondary">({{store.tasks.length}})</small>
    </h1>
    <form @submit.prevent="addTask">
      <div class="input-group my-1">
        <input
          v-model="title"
          type="text"
          class="form-control"
          placeholder="New Task"
          aria-label="New Task"
          aria-describedby="search-addon"
        />
        <button
          class="btn btn-outline-primary"
          type="button"
          id="search-addon"
          :disabled="saving"
        >
          + Add
        </button>
      </div>
    </form>

    {{ tasks }}
    <ul v-if="store.tasks.length" class="list-group mt-5">
      <li
        v-for="task in store.tasks"
        :key="task.id"
        class="list-group-item d-flex justify-content-between align-items-center"
        :class="{'list-group-item-success': task.status}"
      >
        <span class="title w-100" :class="{'text-decoration-line-through': task.status}" @click="toggleStatus(task)">
          {{ task.title }}
        </span>
        <button @click="removeTask(task.id)" class="btn btn-sm btn-danger">
          X
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Task, useTasksStore } from "../stores/tasks";

export default defineComponent({
  name: "TasksView",
  setup() {
    const saving = ref(false);
    const title = ref('');
    const store = useTasksStore();

    onMounted(() => {
      store.getTasks();
    });

    async function addTask() {
      saving.value = true;
      try {
        await store.addTask({
          title: title.value,
          status: false,
        })
        title.value = ''
      } finally {
        saving.value = false;
      }
    }
    async function toggleStatus({id, status}: Task) {
      // change task status
      store.updateTask({id, status: !status})
    }
    async function removeTask(id: number) {
      saving.value = true;
      try {
        await store.removeTask(id)
      } finally {
        saving.value = false;
      }
    }
    return { saving, store, title, addTask, toggleStatus, removeTask };
  },
});
</script>


<style scoped>
.title {
  cursor: pointer;
}
</style>