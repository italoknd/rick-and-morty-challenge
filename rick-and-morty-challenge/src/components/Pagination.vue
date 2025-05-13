<template>
  <q-pagination
    v-model="current"
    :max="_infos.pages ?? 0"
    input
    input-class="text-blue-10"
  />
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRNMStore } from "../store";
import { storeToRefs } from "pinia";

//INSTANCES
const store = useRNMStore();
const { _infos } = storeToRefs(store);

//MODELS
let current = ref<number>(1);

//EMITS
const emit = defineEmits<{
  (e: "changePage", page: string): void;
}>();

//WATCHERS
watch(
  () => current.value,
  (val) => changePage(val)
);

//FUNCTIONS
const changePage = (page: number) => emit("changePage", String(page));
</script>
