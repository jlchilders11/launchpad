<script setup lang="ts">
import { watch, ref } from 'vue'
import axios from 'axios'
import { storeToRefs } from 'pinia'

import { useDataStore } from '@/stores'

const store = useDataStore()
const { selectedPad, selectedRocket } = storeToRefs(store)
const currentWeather = ref([])

watch([selectedPad], async () => {
  if (!selectedPad.value) return {}
  else {
    const response = await axios.get(
      `https://api.weather.gov/points/${selectedPad.value.latitude},${selectedPad.value.longitude}`
    )
    const forecastResponse = await axios.get(response.data.properties.forecast)
    currentWeather.value = forecastResponse.data.properties.periods[0]
  }
})
</script>
<template>
  <div>
    <div class="row">
      <div class="col">
        <h4>Selected Launch Pad Info:</h4>
        <table class="table">
          <tbody>
            <tr>
              <td>Full Name:</td>
              <td>{{ selectedPad?.full_name }}</td>
            </tr>
            <tr>
              <td>Location:</td>
              <td>{{ selectedPad?.locality }}</td>
            </tr>
            <tr>
              <td>Region:</td>
              <td>{{ selectedPad?.region }}</td>
            </tr>
            <tr>
              <td>Timezone:</td>
              <td>{{ selectedPad?.timezone }}</td>
            </tr>
            <tr>
              <td>Current Weather:</td>
              <td>{{ (currentWeather as any)?.detailedForecast }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <h4>Rocket Info:</h4>
        <table class="table">
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{{ selectedRocket?.name }}</td>
            </tr>
            <tr>
              <td>Company:</td>
              <td>{{ selectedRocket?.company }}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{{ selectedRocket?.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
