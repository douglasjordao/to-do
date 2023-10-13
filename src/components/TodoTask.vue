<template>
  <div class="row items-center">
    <q-btn flat rounded icon="check_circle" />
    <span class="q-ml-md">{{ props.value.name }}</span>
  </div>
</template>

<script setup>
/* Props */
const props = defineProps({
  value: {
    type: Object,
    default: () => null,
  },
});
</script>

<style lang="scss" scoped></style>
