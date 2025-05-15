<template>
  <q-list bordered class="rounded-borders w-[500px]">
    <div class="px-2">
      <h5 class="mt-3">Episodes with</h5>
      <p>{{ _selectedCharacter.name }}</p>
    </div>
    <div class="border border-gray-500" />
    <q-card
      class="overflow-y-auto h-[calc(100vh-295px)]"
    >
      <q-card-section v-for="episode in _episodes">
        <p><strong>EP Name:</strong> {{ episode.name }}</p>
        <p><strong>Release Date:</strong> {{ episode.air_date }}</p>
        <p><strong>Season:</strong> {{ episode.episode }}</p>
        <div class="border border-gray-500" />
      </q-card-section>
    </q-card>
  </q-list>
</template>
<script setup lang="ts">
import { useRNMStore } from "../store";
import { storeToRefs } from "pinia";

//INSTANCES
const store = useRNMStore();
const { _selectedCharacter, _episodes } = storeToRefs(store);
</script>
