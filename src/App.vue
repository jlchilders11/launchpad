<script setup lang="ts">
import { ref } from 'vue'

import RocketSelect from '@/components/RocketSelect.vue'
import LaunchPadSelect from '@/components/LaunchPadSelect.vue'
import TimeSelect from '@/components/TimeSelect.vue'
import LaunchStatus from './components/LaunchStatus.vue'
import LaunchConsole from './components/LaunchConsole.vue'

const onSubmit = () => {
  showConsole.value = true
}
const showConsole = ref(false)
</script>

<template>
  <div v-if="!showConsole">
    <form @submit.prevent="onSubmit()">
      <div class="container mt-5">
        <div class="row mb-3">
          <div class="col"><LaunchPadSelect /></div>
          <div class="col"><RocketSelect /></div>
          <div class="col"><TimeSelect /></div>
        </div>
        <div class="row">
          <div class="col">
            <button class="btn btn-primary">Confirm Launch</button>
          </div>
        </div>
        <hr />
      </div>
    </form>
    <div class="container">
      <h3>Launch Info:</h3>
      <LaunchStatus />
    </div>
  </div>
  <div v-if="showConsole">
    <LaunchConsole />
  </div>
</template>

<style scoped></style>
