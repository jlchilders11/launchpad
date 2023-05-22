<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'

const store = useDataStore()
const { selectedTime } = storeToRefs(store)

const toFormattedString = (d: Date) => {
  const year = d.getFullYear()
  const month = d.getMonth()
  const day = d.getDate()
  const hour = d.getHours()
  const minute = d.getMinutes()
  return `${year}-${month}-${day}T${hour}:${minute}`
}

const getCurrentDateTime = () => {
  const d = new Date()
  return toFormattedString(d)
}
const get8HoursFromNow = () => {
  const d = new Date(Date.now() + 8 * 3600)
  return toFormattedString(d)
}
</script>
<template>
  <div>
    <label for="launch-time" class="form-label">Launch Time</label>
    <input
      v-model="selectedTime"
      type="datetime-local"
      class="form-control"
      id="launch-time"
      :min="getCurrentDateTime()"
      :max="get8HoursFromNow()"
      required
    />
  </div>
</template>
<style scoped></style>
