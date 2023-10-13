<template>
  <div class="column full-width q-pa-lg">
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

    <div>
      <q-card v-if="formVisible" class="q-mt-md">
        <q-card-section>
          <q-input v-model="form.name" borderless label="Nome da tarefa" />
          <q-input v-model="form.description" borderless dense label="Descrição" />
          <q-separator class="q-my-md" />
          <div class="row item-center justify-end">
            <q-btn flat color="primary" label="Cancelar" class="q-mr-sm"></q-btn>
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
    </div>

    <div class="column">
      <TodoTask v-for="item in data.items" :value="item" :key="item.id" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useTodoService } from '@/services/todoService';

import TodoTask from '@/components/TodoTask.vue';

/* Composables */
const service = useTodoService();
const quasar = useQuasar();

/* Data */
const data = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
  items: [],
});
const formVisible = ref(false);
const form = reactive({
  name: '',
  description: '',
});

/* Methods */
const getTodos = async () => {
  quasar.loading.show({
    message: 'Carregando tarefas',
  });

  const res = await service.getTodos(data.page, data.pageSize);

  Object.assign(data, res.data);

  quasar.loading.hide();
};
const toggleForm = () => {
  formVisible.value = !formVisible.value;
};
const createTask = () => {
  toggleForm();
};

/* Lifecycle Hooks */
onMounted(async () => {
  await getTodos();
});
</script>

<style lang="scss" scoped>
.todo-markup-table {
  width: 550px;
}
</style>
