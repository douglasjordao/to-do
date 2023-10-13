<template>
  <div class="row items-center">
    <q-btn flat rounded icon="check_circle" @click="completeTask(props.value.id)" />
    <div class="column q-ml-md">
      <span>{{ props.value.name }}</span>
      <small class="text-secondary">{{ props.value.description }}</small>
    </div>
  </div>
</template>

<script setup>
import { useTaskService } from '@/services/taskService';
import { useLoadingScreenStore } from '@/stores/loading';
import { useTaskStore } from '@/stores/tasks';
import { useQuasar } from 'quasar';

/* Props */
const props = defineProps({
  value: {
    type: Object,
    default: () => null,
  },
});

/* Composables */
const loading = useLoadingScreenStore();
const quasar = useQuasar();
const service = useTaskService();
const tasks = useTaskStore();

/* Methods */
const completeTask = async (id) => {
  loading.status = true;

  if (await service.completeTask(id)) {
    quasar.notify({
      type: 'positive',
      color: 'green',
      message: 'Tarefa concluída com sucesso!',
      position: 'top-right',
      timeout: 3000,
    });

    tasks.loaded.taskTable = false;
  } else {
    quasar.notify({
      type: 'negative',
      color: 'red',
      message: 'Algo deu errado!',
      position: 'top-right',
      timeout: 3000,
    });
  }
};
</script>
