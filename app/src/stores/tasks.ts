import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Task {
  id?: number
  title: string
  status: boolean
}

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  function addTask(task: Task) {
    tasks.value.push(task);
  }

  function removeTask(id: number) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  return {
    tasks,
    addTask,
    removeTask
  }
})
