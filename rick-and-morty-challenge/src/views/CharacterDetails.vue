<template>
  <div class="my-5 px-5 flex items-center justify-center">
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
    let URLEps: string[] = [];
    _selectedCharacter.value.episode.forEach((episode) => {
      const epNumber = episode.substring(episode.lastIndexOf("/") + 1);
      URLEps.push(epNumber);
    });

    await store.getEpisodes(URLEps.join(","));
  } catch (error) {}
};
</script>
