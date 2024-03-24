<script setup>
import { Position, Handle } from '@vue-flow/core'
// props were passed from the slot using `v-bind="customNodeProps"`
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faComments } from '@fortawesome/free-regular-svg-icons'
import { truncateString } from '../utils';
const props = defineProps(['id', 'label', 'data'])

const emitNodeClick = defineEmits(['node-clicked']);  // Define custom event (already defined in FlowChart.vue)

const handleClick = () => {
  // Emit the `node-clicked` event with the node ID (or data)
  emitNodeClick('node-clicked', props.id); // Pass relevant data (e.g., id)
}

</script>

<template>
  <div @click="handleClick">
    <Handle type="target" :position="Position.Top" />
    <div class="bg-white grid grid-rows-2 rounded-md">
      <div class="text-black p-4 grid grid-cols-[0fr_1fr] content-center gap-2 text-sm">
        <FontAwesomeIcon :icon="faComments" size="xl" />
        <p class="font-bold">{{ label }}</p>
      </div>
      <div class="bg-gray-100 text-black p-4 rounded-b-md">
        <p class="text-xs">{{ truncateString(props.data.description) }}</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style></style>