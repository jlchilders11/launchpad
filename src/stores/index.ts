import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Rocket } from '@/types/rockets'
import { LaunchPad } from '@/types/launchpads'

export const useDataStore = defineStore('data', () => {
  const selectedRocket = ref<Rocket | null>(null)
  const selectedPad = ref<LaunchPad | null>(null)
  const selectedTime = ref<Date>(new Date(Date.now() + 5 * 60))

  function setRocket(rocket: Rocket) {
    selectedRocket.value = rocket
  }
  function setPad(pad: LaunchPad) {
    selectedPad.value = pad
  }
  function setTime(dateTime: Date) {
    selectedTime.value = dateTime
  }

  return { selectedRocket, selectedPad, selectedTime, setRocket, setPad, setTime }
})
