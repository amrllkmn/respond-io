<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

import Main from './Main.vue'

const route = useRoute();
const hasNodeId = ref(false);

onMounted(() => {
  hasNodeId.value = !!route.query.nodeId;
})
</script>

<template>
  <div v-if="hasNodeId" class="grid grid-cols-[4fr_2fr]">
    <Main />
    <div>
      <p>{{ route.query.nodeId }}</p>
    </div>
  </div>
  <dive v-else class="grid grid-cols-1">
    <Main />
  </dive>
</template>
