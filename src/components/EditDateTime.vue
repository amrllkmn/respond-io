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
const node = getNodeById.value(route.query.nodeId);
const times = node.data.times;
</script>

<template>
  <p class="text-lg">{{ node.label }}</p>
  <p>{{ node.data.description }}</p>
  <div v-for="time in times" class="grid grid-row-2 gap-2 my-4">
    <p class="font-bold">{{ time.day.toUpperCase() }}</p>
    <div>
      <p>{{ time.startTime }} to {{ time.endTime }}</p>
    </div>

  </div>
</template>