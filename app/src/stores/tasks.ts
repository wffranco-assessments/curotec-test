import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export interface Task {
  id: number
  title: string
  status: boolean,
  created_at: string;
  updated_at: string;
}

interface CreateTask {
  title: string
  status: boolean
}

interface UpdateTask {
  id: number
  status: boolean
}

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  async function getTasks() {
    const { data } = await axios.get<Task[]>('http://localhost/api/tasks')
    tasks.value = data
  }

  async function addTask(task: CreateTask) {
    await axios.post<Task>('http://localhost/api/tasks', task)
    getTasks();
  }

  async function updateTask({id, status}: UpdateTask) {
    console.log('update', {id, status})
    await axios.put<Task>(`http://localhost/api/tasks/${id}`, {status})
    getTasks();
  }

  async function removeTask(id: number) {
    await axios.delete(`http://localhost/api/tasks/${id}`)
    getTasks();
  }

  return {
    tasks,
    addTask,
    getTasks,
    updateTask,
    removeTask
  }
})
