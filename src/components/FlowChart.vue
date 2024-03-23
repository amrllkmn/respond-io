<script setup>
import { VueFlow } from '@vue-flow/core';
import { ref } from 'vue';
import SendMessage from './SendMessage.vue';

const nodes = ref([
  {
    label: "Away Message",
    id: "b6a0c1",
    type: "sendMessage",
    position: { x: 100, y: 100 },
    data: {
      payload: [
        {
          type: "text",
          text: "Sorry, we are currently away. We will respond as soon as possible.",
        },
      ],
    }
  },
])

</script>

<template>
  <VueFlow :nodes="nodes">
    <template #node-sendMessage="sendMessageProps">
      <SendMessage v-bind="sendMessageProps" />
    </template>
    <!-- 
          <template #node-dateTime="dateTimeProps">
      <DateTime v-bind="dateTimeProps" />
    </template>
     -->
  </VueFlow>
</template>

<style>
/* import the required styles */
@import "@vue-flow/core/dist/style.css";

/* import the default theme (optional) */
@import "@vue-flow/core/dist/theme-default.css";
</style>