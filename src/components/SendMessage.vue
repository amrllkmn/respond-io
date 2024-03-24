<script setup>
import { Position, Handle } from '@vue-flow/core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faMessage } from '@fortawesome/free-regular-svg-icons'
// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data'])
const description = props.data.description;
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div class="bg-white grid grid-rows-2 rounded-md">
      <div class="text-black p-4 grid grid-cols-[0fr_1fr] content-center gap-2 text-sm">
        <FontAwesomeIcon :icon="faMessage" size="xl" />
        <p class="font-bold">{{ label }}</p>
      </div>
      <div class="bg-gray-100 text-black p-4 rounded-b-md">
        <p>{{ description }}</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style></style>