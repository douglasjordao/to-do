<template>
  <q-card v-if="formVisible" class="q-mt-md full-width">
    <q-card-section>
      <q-input v-model="form.name" label="Nome da tarefa" />
      <q-input v-model="form.description" label="Descrição" />
      <div class="row item-center justify-end q-mt-lg">
        <q-btn flat color="primary" label="Cancelar" class="q-mr-sm" @click="toggleForm"></q-btn>
        <q-btn outline color="primary" label="Criar" @click="createTask"></q-btn>
      </div>
    </q-card-section>
  </q-card>
  <q-btn
    v-else
    flat
    rounded
    color="primary"
    icon="add_task"
    label="Adicionar Tarefa"
    @click="toggleForm"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useTaskService } from '@/services/taskService';
import { useQuasar } from 'quasar';
import { useLoadingScreenStore } from '@/stores/loading';
import { useTaskStore } from '@/stores/tasks';

/* Composables */
const service = useTaskService();
const quasar = useQuasar();
const loading = useLoadingScreenStore();
const tasks = useTaskStore();

/* Data */
const formVisible = ref(false);
const form = reactive({
  name: '',
  description: '',
});

/* Methods */
const toggleForm = () => {
  formVisible.value = !formVisible.value;
};
const createTask = async () => {
  toggleForm();

  loading.status = true;

  if (await service.createTask(form)) {
    quasar.notify({
      type: 'positive',
      color: 'green',
      message: 'Tarefa criada com sucesso!',
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

  loading.status = false;
};
</script>
