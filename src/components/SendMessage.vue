<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data'])
const nodeName = props.label
const description = props.data.description;
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <p>{{ nodeName }}</p>
    </div>
    <div>
      <p style="font-style: italic;">{{ description }}</p>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style></style>