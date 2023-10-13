import { reactive } from 'vue';
import { defineStore } from "pinia";

export const useTaskStore = defineStore('task', () => {
  const loaded = reactive({
    taskTable: false,
  });

  return { loaded };
});
