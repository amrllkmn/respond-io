<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';
import { useNodeStore } from '../stores/useNodeStore';
const route = useRoute();
const store = useNodeStore();

import EditSendMessage from './EditSendMessage.vue';
import EditDateTime from './EditDateTime.vue';
import EditAddComment from './EditAddComment.vue';
import { watch } from 'vue';

const { getNodeById } = storeToRefs(store);
// onMounted(() => {
//   hasNodeId.value = !!route.query.nodeId;
// })
let nodeData = getNodeById.value(route.query.nodeId);
watch(() => route.query.nodeId, () => {
  nodeData = getNodeById.value(route.query.nodeId);
})
</script>

<template>
  <div class="p-4">
    <p class="font-bold text-xl">Edit Node {{ route.query.nodeId }}</p>
    <div v-if="nodeData.type === 'sendMessage'">
      <EditSendMessage />
    </div>
    <div v-else-if="nodeData.type === 'dateTime'">
      <EditDateTime />
    </div>
    <div v-else-if="nodeData.type === 'addComment'">
      <EditAddComment />
    </div>
  </div>

</template>