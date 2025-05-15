<script setup lang="ts">
import { onMounted } from "vue";
import { useQuasar } from "quasar";

//INSTANCES
const $q = useQuasar();

//FUNCTIONS
onMounted(() => $q.dark.set(true));
</script>

<template>
  <Navbar />
  <RouterView />
</template>
