<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data'])
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <p>{{ label }}</p>
    </div>
    <p>{{ props.data.description }}</p>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style></style>