<script setup>
import { Position, Handle } from '@vue-flow/core'

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps(['label', 'data'])
const connectorType = props.data.connectorType;
</script>

<template>
  <div>
    <Handle type="target" :position="Position.Top" />
    <div>
      <p :class="connectorType === 'success' ? 'success' : 'failure'"> {{ label }}</p>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style>
.success {
  color: green;
  /* Add any other styles for success here */
}

.failure {
  color: red;
  /* Add any other styles for failure here */
}
</style>