<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import axios from 'axios'
import { LaunchPad } from '@/types/launchpads'
import { useDataStore } from '@/stores'

const store = useDataStore()
const { selectedPad } = storeToRefs(store)
const { setPad } = store

const pads = ref(new Array<LaunchPad>())
onMounted(() => {
  axios.get('https://api.spacexdata.com/v4/launchpads').then((response) => {
    pads.value = response.data
    setPad(pads.value[0])
  })
})
</script>
<template>
  <div>
    <label class="form-label" for="pad-select">Select Launch Pad</label>
    <select id="pad-select" v-model="selectedPad" class="form-select" aria-label="Rocket Selection">
      <option v-for="pad in pads" v-bind:key="pad.name" :value="pad">
        {{ pad.name }}
      </option>
    </select>
  </div>
</template>
<style scoped></style>
