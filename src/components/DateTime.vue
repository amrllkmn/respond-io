<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data'])
console.log(props.data)
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <p>{{ label }}</p>
    </div>
    <p> Business Hours - {{ props.data.timezone }}</p>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style></style>