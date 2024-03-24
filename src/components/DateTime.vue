<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data'])

console.log(props)
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div class="bg-white grid grid-rows-2 rounded-md">
      <div class="text-black p-4">
        <p class="font-bold">{{ label }}</p>
      </div>
      <div class="bg-gray-100 text-black p-4 rounded-b-md">
        <p>{{ props.data.description }}</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style></style>