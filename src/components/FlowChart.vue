<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { storeToRefs } from 'pinia';
import { useNodeStore } from '../stores/useNodeStore';
import { useLayout } from '../stores/useLayout';
import { nextTick } from 'vue';

import SendMessage from './SendMessage.vue';
import Trigger from './Trigger.vue';
import DateTimeConnector from './DateTimeConnector.vue';
import DateTime from './DateTime.vue';
import AddComment from './AddComment.vue';

const store = useNodeStore();
const { graph, layout } = useLayout();
const { nodes, edges } = storeToRefs(store)
const { updateNodes } = store;
const { fitView } = useVueFlow();


async function layoutGraph(direction) {
  const newNodes = layout(nodes.value, edges.value, direction)
  updateNodes(newNodes)

  nextTick(() => {
    fitView()
  })


}

</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" @nodes-initialized="layoutGraph('TB')">
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