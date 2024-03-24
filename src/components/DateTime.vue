<script setup>
import { Position, Handle } from '@vue-flow/core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data'])

console.log(props)
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div class="bg-white grid grid-rows-2 rounded-md">
      <div class="text-black p-4 grid grid-cols-[0fr_1fr] content-center gap-2 text-sm">
        <FontAwesomeIcon :icon="faCalendar" size="xl" />
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