<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { storeToRefs } from 'pinia';
import { useNodeStore } from '../stores/useNodeStore';
import { useLayout } from '../stores/useLayout';
import { nextTick, ref, onMounted } from 'vue';
import SendMessage from './SendMessage.vue';
import Trigger from './Trigger.vue';
import DateTimeConnector from './DateTimeConnector.vue';
import DateTime from './DateTime.vue';
import AddComment from './AddComment.vue';

const store = useNodeStore();
const { graph, layout } = useLayout();
const { nodes, edges } = storeToRefs(store);
const { updateNodes } = store;
const { fitView, zoomIn, onInit } = useVueFlow();

async function layoutGraph(direction) {
  const newNodes = layout(nodes.value, edges.value, direction);
  updateNodes(newNodes);
  nextTick(() => {
    fitView();
  });
}

const container = ref(null);
const flowChartHeight = ref(0);
const flowChartWidth = ref(0);

onMounted(() => {
  console.log("This is called later")
  if (container.value) {
    flowChartHeight.value = container.value.offsetHeight;
    flowChartWidth.value = container.value.offsetWidth * 0.75;
    fitView()
    zoomIn(); // Zoom in after computing the container size
  }
});

onInit(() => {
  fitView()
})
</script>

<template>
  <div ref="container" class="mx-4 flex justify-center">
    <div :style="{ height: `${flowChartHeight}px`, width: `${flowChartWidth}px` }">
      <VueFlow :nodes="nodes" :edges="edges" @nodes-initialized="layoutGraph('TB')" :default-viewport="{ zoom: 0.5 }"
        :min-zoom="0.2" :max-zoom="4">
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
    </div>
  </div>
</template>

<style>
/* import the required styles */
@import "@vue-flow/core/dist/style.css";
/* import the default theme (optional) */
@import "@vue-flow/core/dist/theme-default.css";
</style>