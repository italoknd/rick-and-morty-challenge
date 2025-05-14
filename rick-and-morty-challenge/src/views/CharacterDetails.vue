<template>
  <div class="mt-5 flex items-center justify-center">
    <q-card
      class="my-card w-[500px] h-[calc(100vh-130px)] h-[calc(100vh-100px)]:md"
      flat
      bordered
    >
      <q-img :src="_selectedCharacter.image" />

      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ _selectedCharacter.name }}</div>
        <div class="text-caption">
          <p>
            {{ _selectedCharacter.name }} is one of the
            {{ _infos.count }} characters from Rick and Morty.
          </p>
          <ul class="list-disc px-4">
            <li><strong>Gender</strong>: {{ _selectedCharacter.gender }}</li>
            <li>
              <strong>Origin</strong>: {{ _selectedCharacter.origin.name }}
            </li>
            <li><strong>Species</strong>: {{ _selectedCharacter.species }}</li>
            <li><strong>Status</strong>: {{ _selectedCharacter.status }}</li>
          </ul>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn
          color="green-5"
          label="Back to Main Menu"
          @click="router.push('/characters')"
        />
      </q-card-actions>
    </q-card>

    <!--EPISODES LIST-->
    <q-list
      bordered
      class="rounded-borders w-[500px] h-[calc(100vh-130px)] h-[calc(100vh-100px)]:md mt-0 mt-5:md"
    >
      <div class="px-2">
        <h5 class="mt-3">Episodes with</h5>
        <p>{{ _selectedCharacter.name }}</p>
      </div>
      <div class="border border-gray-500" />
      <q-card class="overflow-y-auto h-[calc(100vh-215px)]">
        <q-card-section v-for="episode in _episodes">
          <p><strong>EP Name:</strong> {{ episode.name }}</p>
          <p><strong>Release Date:</strong> {{ episode.air_date }}</p>
          <p><strong>Season:</strong> {{ episode.episode }}</p>
          <div class="border border-gray-500" />
        </q-card-section>
      </q-card>
    </q-list>
  </div>
</template>
<script setup lang="ts">
import { useRNMStore } from "../store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

//INSTANCES
const store = useRNMStore();
const router = useRouter();
const { _selectedCharacter, _infos, _episodes } = storeToRefs(store);

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
