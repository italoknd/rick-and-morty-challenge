<template>
  <q-card
    class="my-card"
    v-for="(character, index) in _characters.results"
    :key="index"
  >
    <q-parallax :src="character.image" :height="150" />

    <q-card-section>
      <div class="text-h6">{{ character.name }}</div>
      <div class="text-subtitle2">{{ character.status }}</div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRNMStore } from "../store/index";
import { storeToRefs } from "pinia";

onMounted(() => {
  getCharacters();
});
//MODELS
const RNMStore = useRNMStore();
const { _characters } = storeToRefs(RNMStore);
//FUNCTIONS
const getCharacters = async () => {
  try {
    await RNMStore.getCharacters();
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};
</script>
