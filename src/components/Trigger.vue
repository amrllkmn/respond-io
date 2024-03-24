<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['data'])

</script>

<template>
  <div>
    <div>
      <p>Trigger</p>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style></style>