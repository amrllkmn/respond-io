<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data'])
const comment = props.data.comment
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <p>{{ label }}</p>
    </div>
    <p>{{ comment }}</p>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style></style>