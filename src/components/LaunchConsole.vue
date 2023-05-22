<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useDataStore } from '@/stores'
import axios from 'axios'

const fullScreenDiv = ref<HTMLElement | null>(null)
const store = useDataStore()
const { selectedPad, selectedRocket, selectedTime } = storeToRefs(store)

const currentWeather = ref('')
onMounted(async () => {
  if (fullScreenDiv.value) fullScreenDiv.value.requestFullscreen()
  if (!selectedPad.value) return {}
  else {
    const response = await axios.get(
      `https://api.weather.gov/points/${selectedPad.value.latitude},${selectedPad.value.longitude}`
    )
    const forecastResponse = await axios.get(response.data.properties.forecast + '/hourly')
    const selectedDateTime = new Date(selectedTime.value)
    currentWeather.value = forecastResponse.data.properties.periods.find((e: any) => {
      return new Date(e.startTime) <= selectedDateTime && new Date(e.endTime) > selectedDateTime
    })

    calcDistanceToLaunchpad()
    timeToLaunch()
  }
})

const currentDistance = ref<null | number | string>(null)
const distance = (lon1: number, lat1: number, lon2: number, lat2: number) => {
  const R = 6371 //radius of earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.floor(R * c)
}

const calcDistanceToLaunchpad = () => {
  if (!('geolocation' in navigator)) {
    currentDistance.value = 'Location Unavailable'
  } else {
    navigator.geolocation.getCurrentPosition((p) => {
      currentDistance.value = distance(
        p.coords.longitude,
        p.coords.latitude,
        Number(selectedPad.value?.longitude),
        Number(selectedPad.value?.latitude)
      )
    })
  }
}

const displayTime = ref<null | string | number>(null)
const timeFunc = ref(0)
const timeToLaunch = () => {
  timeFunc.value = setInterval(() => {
    const t = (Number(new Date(selectedTime.value)) - Number(new Date())) / 60000
    if (t > 5) displayTime.value = 'More than 5 minutes till launch'
    else if (t < 0) {
      displayTime.value = 'LAUNCH!'
      clearInterval(timeFunc.value)
      setInterval(launchRocket, 1000)
    } else displayTime.value = `${Math.floor(t)}M ${Math.floor((t - Math.floor(t)) * 60)}S`
  }, 1000)
}

const currentVelocity = ref(0)
const currentAltitude = ref(0)
const launchRocket = () => {
  currentVelocity.value += 20
  currentAltitude.value += currentVelocity.value
}
</script>
<template>
  <div class="bg-white" style="height: 100vh; padding: 10vh" ref="fullScreenDiv">
    <div class="container h-50">
      <div class="row align-items-center h-100">
        <div class="col h-100">
          <h3>Selected Rocket</h3>
          <div class="bg-dark p-3 h-75" style="width: fit-content">
            <div class="bg-white position-relative h-100" style="width: fit-content">
              <img class="object-fit-cover h-100" :src="selectedRocket?.flickr_images[0]" />
            </div>
          </div>
        </div>
        <div class="col h-100">
          <h3>Selected Launch Pad</h3>
          <div class="bg-dark p-3 h-75" style="width: fit-content">
            <div class="bg-white position-relative h-100" style="width: fit-content">
              <img class="object-fit-cover h-100" :src="selectedPad?.images.large[0]" />
            </div>
          </div>
        </div>
        <div class="col h-100">
          <h3>Selected Launch Time</h3>
          <div class="bg-dark p-3 h-75">
            <div class="bg-white position-relative h-100">
              <h2 class="text-center">
                {{ new Date(selectedTime).toLocaleString() }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container h-50">
      <div class="row align-items-center h-100">
        <div class="col">
          <table class="table">
            <tbody>
              <tr>
                <td>Time to Launch</td>
                <td>{{ displayTime }}</td>
              </tr>
              <tr>
                <td>Weather at Launchpad</td>
                <td>{{ (currentWeather as any).shortForecast }}</td>
              </tr>
              <tr>
                <td>Distance From Launchpad</td>
                <td>{{ currentDistance }} KM</td>
              </tr>
              <tr>
                <td>Current Velocity</td>
                <td>{{ currentVelocity }} m/s</td>
              </tr>
              <tr>
                <td>Current Altitude</td>
                <td>{{ currentAltitude / 1000 }} km</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
