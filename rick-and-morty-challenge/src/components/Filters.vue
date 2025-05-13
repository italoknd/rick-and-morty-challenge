<template>
  <div class="flex justify-between items-center">
    <q-input
      v-model="filter"
      dense
      color="green-4"
      label="Filtrar por personagem"
    >
      <template v-slot:append>
        <q-avatar>
          <img
            src="https://i.pinimg.com/originals/98/29/21/9829215db6f9210c0ae4e318e854cb1f.png"
          />
        </q-avatar>
      </template>
    </q-input>
    <div class="flex gap-2 items-center">
      <q-badge
        :color="getBadgeColor(status)"
        @click="filterByStatus(status)"
        v-for="(status, index) in statuses"
        :key="index"
        class="q-pa-xs cursor-pointer"
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
import notifier from "../utils/quasarNotifier";

//INSTANCES
const store = useRNMStore();

//MODELS
let filter = ref<string>("");
let statuses = ref<string[]>(["All Characters", "Alive", "unknown", "Dead"]);

//WATCHERS
watch(
  () => filter.value,
  (val) => filterCharacters(val)
);

//REQUESTS
const filterCharacters = async (character: string) => {
  try {
    await store.filterCharacters(character);
  } catch (error) {
    filter.value = "";

    notifier.methods.showErrorNotification(
      "Oops... Parece que não existe nenhum personagem com esse nome"
    );
    console.error("Error filtering characters:", error);
  }
};

const filterByStatus = async (character: string) => {
  try {
    await store.filterCharactersByStatus(character.toLowerCase());
    notifier.methods.showSuccessNotification(
      "Successo ao listar personagens por status"
    );
  } catch (error) {
    filter.value = "";
    console.error("Error while filtering characters by status:", error);
  }
};
</script>
