<script setup>
import { VueFlow } from '@vue-flow/core';
import { storeToRefs } from 'pinia';
import SendMessage from './SendMessage.vue';
import { useNodeStore } from '../stores/stores';

const store = useNodeStore();
const { nodes, edges } = storeToRefs(store)

</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
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