<script setup>
import { Position, Handle } from '@vue-flow/core'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { faBolt } from '@fortawesome/free-solid-svg-icons'

// props were passed from the slot using `v-bind="customNodeProps"`

</script>

<template>
  <div>
    <div class="bg-white text-black p-4 rounded-md">
      <div class="grid grid-cols-[0fr_1fr] content-center gap-2 text-sm">
        <FontAwesomeIcon :icon="faBolt" size="xl" />
        <p class="font-bold">Trigger</p>
      </div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style></style>