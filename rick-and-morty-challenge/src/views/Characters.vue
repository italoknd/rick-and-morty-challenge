<template>
  <div class="q-pa-md">
    <Filters class="mb-4" />
    <div class="row q-col-gutter-md ">
      <div
        v-for="(character, index) in _characters"
        :key="index"
        class="col-6 col-sm-4 col-md-3 col-lg-2"
      >
        <q-card
          @click="showCharacterDetails(character)"
          class="hover-card cursor-pointer"
          flat
          bordered
        >
          <img
            :src="character.image"
            :alt="`Character: ${character.name}`"
            class="img-cover h-[200px]"
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
      <div class="mt-[45px]" />
      <Pagination
        class="fixed-bottom row justify-center shadow-2"
        :class="
          $q.dark.isActive
            ? 'bg-black border-gray border-t-1'
            : 'bg-white border-gray-300 border-t-2'
        "
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRNMStore } from "../store";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import { getBadgeColor } from "../utils/getBadgeColors";
import { useRouter } from "vue-router";
import { Character } from "@interfaces/character";

onMounted(() => getCharacters());

//INSTANCES
const store = useRNMStore();
const router = useRouter();
const $q = useQuasar();

//MODELS
const { _characters } = storeToRefs(store);

//REQUESTS
const getCharacters = async () => {
  try {
    await store.getCharacters();
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const showCharacterDetails = (character: Character) => {
  store.getSelectedCharacter(character);
  store.resetParams();
  router.push("/character-detail");
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
