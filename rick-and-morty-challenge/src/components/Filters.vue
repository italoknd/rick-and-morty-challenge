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
import { ref } from "vue";
import { getBadgeColor } from "../utils/getBadgeColors";

//MODELS
let filter = ref<string>("");
let statuses = ref<string[]>(["Alive", "unknown", "Dead"]);
</script>
