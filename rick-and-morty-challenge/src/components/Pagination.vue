<template>
  <q-pagination
    v-model="current"
    :max="_infos.pages ?? 0"
    input
    :input-class="$q.dark.isActive ? 'text-green' : 'text-blue'"
    :color="$q.dark.isActive ? 'green' : 'blue'"
    icon-first="skip_previous"
    icon-last="skip_next"
    icon-prev="fast_rewind"
    icon-next="fast_forward"
  />
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useRNMStore } from "../store";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";

//INSTANCES
const store = useRNMStore();
const { _infos } = storeToRefs(store);
const $q = useQuasar();

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
