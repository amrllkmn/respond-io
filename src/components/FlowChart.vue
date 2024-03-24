<script setup>
import { VueFlow } from '@vue-flow/core';
import { storeToRefs } from 'pinia';
import { useNodeStore } from '../stores/useNodeStore';

import SendMessage from './SendMessage.vue';
import Trigger from './Trigger.vue';
import DateTimeConnector from './DateTimeConnector.vue';
import DateTime from './DateTime.vue';
import AddComment from './AddComment.vue';

const store = useNodeStore();
const { nodes, edges } = storeToRefs(store)

</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <template #node-trigger="triggerProps">
      <Trigger v-bind="triggerProps" />
    </template>
    <template #node-sendMessage="sendMessageProps">
      <SendMessage v-bind="sendMessageProps" />
    </template>
    <template #node-dateTimeConnector="dateTimeConnectorProps">
      <DateTimeConnector v-bind="dateTimeConnectorProps" />
    </template>

    <template #node-dateTime="dateTimeProps">
      <DateTime v-bind="dateTimeProps" />
    </template>
    <template #node-addComment="addCommentProps">
      <AddComment v-bind="addCommentProps" />
    </template>

  </VueFlow>
</template>

<style>
/* import the required styles */
@import "@vue-flow/core/dist/style.css";

/* import the default theme (optional) */
@import "@vue-flow/core/dist/theme-default.css";
</style>