<template>
  <div class="p-4 flex">
    <q-card class="my-card" flat bordered>
      <q-img :src="_selectedCharacter.image" />

      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ _selectedCharacter.name }}</div>
        <div class="text-caption text-grey">
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
        <q-btn flat color="primary" label="See Episodes Participations" />
        <q-btn flat color="secondary" label="Back to Main Menu" />

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subtitle2"> </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRNMStore } from "../store";
import { storeToRefs } from "pinia";

//INSTANCES
const store = useRNMStore();
const { _selectedCharacter, _infos } = storeToRefs(store);

//MODELS
let expanded = ref<boolean>(false);
</script>
