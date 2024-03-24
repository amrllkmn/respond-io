<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';
import { useNodeStore } from '../stores/useNodeStore';
import { watch } from 'vue';
const route = useRoute();
const store = useNodeStore();

const { getNodeById } = storeToRefs(store);
// onMounted(() => {
//   hasNodeId.value = !!route.query.nodeId;
// })
let node = getNodeById.value(route.query.nodeId);
const textItems = node.data.payload.filter((item) => item.type === "text");
const attachmentItems = node.data.payload.filter((item) => item.type === "attachment");

watch(() => route.query.nodeId, () => {
  node = getNodeById.value(route.query.nodeId);
})
</script>

<template>
  <p class="text-lg">{{ node.label }}</p>
  <p>{{ node.data.description }}</p>
  <p v-for="item in textItems">

    {{ item.text }}
  </p>
  <p v-for="item in attachmentItems">

    {{ item.attachment }}
  </p>
</template>