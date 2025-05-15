<template>
  <div class="my-5 px-5 flex items-center justify-center lg:gap-4">
    <CharacterPresentation class="lg:mb-0 mb-4" />
    <EpisodesList />
  </div>
</template>
<script setup lang="ts">
import { useRNMStore } from "../store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

//INSTANCES
const store = useRNMStore();
const { _selectedCharacter } = storeToRefs(store);

//FUNCTIONS
onMounted(() => getEpisodes());

const getEpisodes = async () => {
  try {
    let URLEps: number[] = [];
    _selectedCharacter.value.episode.forEach((episode) => {
      URLEps.push(Number(episode.id));
    });
    await store.getEpisodes(URLEps);
  } catch (error) {
    console.error("error while listing episodes", error);
  }
};
</script>
