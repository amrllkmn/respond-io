<script setup>
import { VueFlow, useVueFlow } from '@vue-flow/core';
import { storeToRefs } from 'pinia';
import { useNodeStore } from '../stores/useNodeStore';
import { useLayout } from '../stores/useLayout';
import { nextTick, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SendMessage from './SendMessage.vue';
import Trigger from './Trigger.vue';
import DateTimeConnector from './DateTimeConnector.vue';
import DateTime from './DateTime.vue';
import AddComment from './AddComment.vue';

const store = useNodeStore();
const router = useRouter();
const { layout } = useLayout();
const { nodes, edges } = storeToRefs(store);
const { updateNodes } = store;
const { fitView, onInit } = useVueFlow();

const emitNodeClick = defineEmits(['node-clicked']);  // Define custom event

const handleNodeClick = (data) => {
  // Your function to handle the click with the data from the node
  console.log('Node clicked:', data);
  // You can perform actions based on the data (e.g., open modal, update store)
  router.push({ path: '/', query: { nodeId: data } })
}

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
          <SendMessage v-bind="sendMessageProps" @node-clicked="handleNodeClick" />
        </template>
        <template #node-dateTimeConnector="dateTimeConnectorProps">
          <DateTimeConnector v-bind="dateTimeConnectorProps" />
        </template>
        <template #node-dateTime="dateTimeProps">
          <DateTime v-bind="dateTimeProps" @node-clicked="handleNodeClick" />
        </template>
        <template #node-addComment="addCommentProps">
          <AddComment v-bind="addCommentProps" @node-clicked="handleNodeClick" />
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