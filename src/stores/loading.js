import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoadingScreenStore = defineStore('loadingScreen', () => {
  const status = ref(false);
  const message = ref('');

  return { status, message };
});
