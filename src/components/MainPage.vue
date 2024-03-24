<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, onUpdated } from 'vue';

import Main from './Main.vue';
import Drawer from './Drawer.vue';

const route = useRoute();
const hasNodeId = ref(false);

onMounted(() => {
  hasNodeId.value = !!route.query.nodeId;
})

onUpdated(() => {
  hasNodeId.value = !!route.query.nodeId;
})
console.log(hasNodeId)
</script>

<template>
  <div v-if="hasNodeId" class="grid grid-cols-[4fr_2fr]">
    <Main />
    <Drawer />
  </div>
  <div v-else class="grid grid-cols-1">
    <Main />
  </div>
</template>
