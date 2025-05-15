<template>
  <div class="flex justify-between items-center">
    <q-input
      v-model="filter"
      dense
      color="green-4"
      label="Filter by character"
    />
    <div class="flex gap-2 items-center mt-4 md:mt-0">
      <q-badge
        :color="getBadgeColor(status)"
        @click="filterByStatus(status)"
        v-for="(status, index) in statuses"
        :key="index"
        class="cursor-pointer q-pa-xs"
        :class="
          selectedStatus.includes(status)
            ? `border ${$q.dark.isActive ? 'border-white' : 'border-gray-500'}`
            : ''
        "
      >
        {{ status }}
      </q-badge>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { getBadgeColor } from "../utils/getBadgeColors";
import { useRNMStore } from "../store";
import { storeToRefs } from "pinia";
import { IQueryParams } from "@interfaces/character";
import { useQuasar } from "quasar";
import notifier from "../utils/quasarNotifier";

//INSTANCES
const $q = useQuasar();
const store = useRNMStore();
const { _fullQuery } = storeToRefs(store);

//MODELS
let filter = ref<string>("");
let statuses = ref<string[]>(["All Characters", "Alive", "unknown", "Dead"]);
let selectedStatus = ref<string>("");

//WATCHERS
watch(
  () => filter.value,
  (val) => filterCharacters(val)
);

//REQUESTS
const filterCharacters = async (character: string) => {
  try {
    const params = {
      status: _fullQuery.value.status,
      name: character.toLowerCase(),
      page: 1,
    } as IQueryParams;

    await store.updateQueryParams(params);
  } catch (error) {
    filter.value = "";
    notifier.methods.showErrorNotification(
      "Oops... Parece que não existe nenhum personagem com esse nome"
    );
    console.error("Error filtering characters:", error);
  } finally {
  }
};

const filterByStatus = async (status: string) => {
  try {
    selectedStatus.value = status;
    const statusValidated: string = getAllCharacters(status)
      ? ""
      : status.toLowerCase();

    const params = {
      status: statusValidated,
      name: getAllCharacters(status) ? "" : _fullQuery.value.name,
      page: 1,
    } as IQueryParams;

    await store.updateQueryParams(params);
    notifier.methods.showSuccessNotification(
      "Successo ao listar personagens por status"
    );

    if (getAllCharacters(status)) {
      filter.value = "";
    }
  } catch (error) {
    filter.value = "";
    console.error("Error while filtering characters by status:", error);
  }
};

//OTHER FUNCTIONS
const getAllCharacters = (status: string): boolean => {
  return status.includes("All Characters");
};
</script>
