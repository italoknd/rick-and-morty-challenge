<template>
  <div class="row q-col-gutter-md q-pa-md">
    <div
      v-for="(character, index) in _characters"
      :key="index"
      class="col-12 col-sm-6 col-md-4 col-lg-3"
    >
      <q-card class="hover-card cursor-pointer" flat bordered>
        <img
          :src="character.image"
          :alt="`Character: ${character.name}`"
          :height="200"
          class="img-cover"
        />

        <q-card-section>
          <div class="text-h6">{{ character.name }}</div>
          <div class="text-subtitle2">
            <q-badge :color="getBadgeColor(character.status)" class="q-pa-xs">
              {{ character.status }}
            </q-badge>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <Pagination />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRNMStore } from "../store/index";
import { storeToRefs } from "pinia";

onMounted(() => getCharacters());

//INSTANCES
const RNMStore = useRNMStore();

//MODELS
const { _characters } = storeToRefs(RNMStore);

//FUNCTIONS
const getCharacters = async () => {
  try {
    await RNMStore.getCharacters();
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const getBadgeColor = (status: string): string => {
  if (status.includes("Alive")) return "green-7";
  if (status.includes("unknown")) return "grey-9";
  else return "red-9";
};
</script>
<style scoped>
.hover-card {
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.img-cover img {
  object-fit: cover;
}
</style>
