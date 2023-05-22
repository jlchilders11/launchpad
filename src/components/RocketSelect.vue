<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import axios from 'axios'
import { Rocket } from '@/types/rockets'
import { useDataStore } from '@/stores'

const store = useDataStore()
const { setRocket } = store
const { selectedRocket } = storeToRefs(store)
const rockets = ref(new Array<Rocket>())
onMounted(() => {
  axios.get('https://api.spacexdata.com/v4/rockets').then((response) => {
    rockets.value = response.data
    setRocket(rockets.value[0])
  })
})
</script>
<template>
  <div>
    <label class="form-label" for="rocket-select">Select Rocket</label>
    <select
      v-model="selectedRocket"
      id="rocket-select"
      class="form-select"
      aria-label="Rocket Selection"
    >
      <option v-for="rocket in rockets" v-bind:key="rocket.name" :value="rocket">
        {{ rocket.name }}
      </option>
    </select>
  </div>
</template>
<style scoped></style>
