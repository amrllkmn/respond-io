<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';
import { useNodeStore } from '../stores/useNodeStore';
const route = useRoute();
const store = useNodeStore();

const { getNodeById } = storeToRefs(store);
// onMounted(() => {
//   hasNodeId.value = !!route.query.nodeId;
// })
const data = getNodeById.value(route.query.nodeId);
console.log(data)
</script>

<template>
  <p>{{ data.label }}</p>
  <p>{{ data.data.description }}</p>
</template>