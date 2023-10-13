<template>
  <div></div>
</template>

<script setup>
import { watch } from 'vue';
import { useQuasar } from 'quasar';
import { useLoadingScreenStore } from '@/stores/loading';

/* Composables */
const quasar = useQuasar();
const store = useLoadingScreenStore();

/* Watchers */
watch(
  () => store.status,
  (newVal) => {
    store.status = newVal;

    if (newVal) {
      quasar.loading.show({ message: store.message });
    } else {
      quasar.loading.hide();
    }
  },
);
</script>
