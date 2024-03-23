<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data'])
const nodeName = props.label
const text = props.data.payload[0].text

console.log(props)
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <p>{{ nodeName }}</p>
    </div>
    <p>{{ text }}</p>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style></style>