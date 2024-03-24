<script setup>
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router';
import { useNodeStore } from '../stores/useNodeStore';
import { computed, watch } from 'vue';
const route = useRoute();
const router = useRouter();
const store = useNodeStore();

const { getNodeById } = storeToRefs(store);
const { updateNode } = store;

let node = computed(() => {
  return getNodeById.value(route.query.nodeId);
});

const editNode = () => {
  const updatedNode = { ...node.value }; // Create a shallow copy of the node
  // Modify the properties of the copied node

  console.log(updatedNode)
  // Update the node using the store
  updateNode(updatedNode);
  router.push('/')
}

watch(() => route.query.nodeId, () => {
  nodeData = getNodeById.value(route.query.nodeId);
})
</script>

<template>
  <form class="grid grid-rows gap-2 my-4" @submit.prevent="editNode">
    <label for="title"> Title</label>
    <input v-model="node.label" name="title" class="p-2" />
    <label for="description"> Description</label>
    <input v-model="node.data.description" name="description" class="p-2" />
    <label for="comment"> Comment</label>
    <textarea v-model="node.data.comment" name="comment" class="p-2" />
    <button type="submit" class="bg-white rounded-sm text-black p-2 hover:bg-gray-100">Save</button>
  </form>
</template>