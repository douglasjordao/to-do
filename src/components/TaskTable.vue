<template>
  <div class="column vertical-middle todo-container q-pt-lg">
    <div class="row items-center">
      <h6 class="q-my-none q-mr-sm">Hoje</h6>
      <span class="text-caption">{{
        new Date().toLocaleDateString('pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })
      }}</span>
    </div>

    <div class="column q-mt-md todo-container__table">
      <TaskComponent v-for="item in data.items" :value="item" :key="item.id" class="q-mb-md" />
      <TaskForm />
    </div>

    <q-pagination
      v-if="maxPage > 1"
      v-model="data.page"
      :max="maxPage"
      direction-links
      boundary-links
      class="q-mx-auto"
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
    />
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, watch } from 'vue';
import { useTaskService } from '@/services/taskService';
import { useLoadingScreenStore } from '@/stores/loading';
import { useTaskStore } from '@/stores/tasks';

import TaskComponent from '@/components/TaskComponent.vue';
import TaskForm from '@/components/TaskForm.vue';

/* Composables */
const service = useTaskService();
const loading = useLoadingScreenStore();
const tasks = useTaskStore();

/* Data */
const data = reactive({
  page: 1,
  pageSize: 10,
  totalItems: 0,
  items: [],
});

/* Computed */
const maxPage = computed(() => Math.ceil(data.totalItems / data.pageSize));

/* Methods */
const getTasks = async () => {
  loading.status = true;

  const res = await service.getTasks(data.page, data.pageSize);

  Object.assign(data, res.data);

  loading.status = false;
  tasks.loaded.taskTable = true;
};

/* Watcher */
watch(
  () => tasks.loaded.taskTable,
  async (isLoaded) => {
    if (!isLoaded) {
      await getTasks();
    }
  },
);

watch(
  () => data.page,
  async () => {
    await getTasks();
  },
);

/* Lifecycle Hooks */
onMounted(async () => {
  await getTasks();
});
</script>

<style lang="scss" scoped>
.todo-container {
  width: 650px;

  &__table {
    min-height: calc(100vh - 380px);
  }
}
</style>
@/services/taskService
