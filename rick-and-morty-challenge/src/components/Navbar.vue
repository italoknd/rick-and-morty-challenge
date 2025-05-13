<template>
  <q-layout view="lHh lpr lFf" container style="height: 100px" class="shadow-2">
    <q-header elevated class="bg-black">
      <q-toolbar class="row justify-between">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/19643055883023.5996f8afa3a8f.gif"
          height="100"
          width="300"
          style="object-fit: contain"
        />
        <q-toggle v-model="isDarkMode" color="green" />
      </q-toolbar>
    </q-header>
  </q-layout>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useQuasar } from "quasar";

//INSTANCES
const $q = useQuasar();

//MODELS
let isDarkMode = ref<boolean>(false);

//WATCHERS
watch(
  () => isDarkMode.value,
  () => $q.dark.toggle()
);
</script>
