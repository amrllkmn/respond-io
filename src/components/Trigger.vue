<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['data'])

</script>

<template>
  <div>
    <div class="bg-white text-black p-4 rounded-md">
      <p class="font-bold">Trigger</p>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style></style>