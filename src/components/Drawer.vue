<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';
import { useNodeStore } from '../stores/useNodeStore';
const route = useRoute();
const store = useNodeStore();

import EditSendMessage from './EditSendMessage.vue';

const { getNodeById } = storeToRefs(store);
// onMounted(() => {
//   hasNodeId.value = !!route.query.nodeId;
// })
const nodeData = getNodeById.value(route.query.nodeId);
console.log(nodeData.type)
</script>

<template>
  <div class="p-4">
    <p class="font-bold">Edit Node {{ route.query.nodeId }}</p>
    <div v-if="nodeData.type === 'sendMessage'">
      <EditSendMessage />
    </div>
  </div>

</template>