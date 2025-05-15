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
import { IQueryParams } from "../interfaces/character";

//INSTANCES
const store = useRNMStore();
const { _infos, _fullQuery } = storeToRefs(store);
const $q = useQuasar();

//MODELS
let current = ref<number>(1);

//WATCHERS
watch(
  () => current.value,
  (val) => {
    const params = {
      status: _fullQuery.value.status,
      name: _fullQuery.value.name,
      page: val,
    } as IQueryParams;

    store.updateQueryParams(params);
    store.getCharacters();
  }
);
</script>
