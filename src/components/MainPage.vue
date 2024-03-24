<script setup>
import FlowChart from './FlowChart.vue';
import CreateNewNode from './CreateNewNode.vue';
import { ref } from 'vue';
import { useNodeStore } from '../stores/useNodeStore';

const dialogElement = ref(null);
const formData = ref({
  title: '',
  type: '',
  description: ''
});

const closeDialog = () => {
  dialogElement.value.close();
}

const store = useNodeStore()
const { addNode } = store;

const createNewNode = () => {
  // Access form data
  const data = { ...formData.value };
  // Add the node using the store
  addNode(data);
  // Close the dialog
  closeDialog();
  formData.value = {
    title: '',
    description: '',
    type: ''
  }
}
</script>

<template>
  <div class="grid grid-rows-[5fr_1fr]">
    <FlowChart />
    <CreateNewNode :dialogElement="dialogElement" />
    <dialog ref="dialogElement" class="w-1/2 h-1/2 rounded-md p-4">
      <div class="grid grid-rows-[1fr_3fr] h-full">
        <h2>Create New Node</h2>
        <form @submit.prevent="createNewNode" class="grid grid-rows gap-2">
          <div class="grid grid-cols-2 gap-2">
            <input v-model="formData.title" placeholder="Title" class="h-1/2 p-4" name="title" required />
            <select v-model="formData.type" class="h-1/2 p-4" name="type" required value="Select node type">
              <option value="sendMessage">sendMessage</option>
              <option value="addComment">addComment</option>
              <option value="businessHours">businessHours</option>
            </select>
          </div>
          <textarea v-model="formData.description" placeholder="Description" class="p-4" name="description" required />
          <div class=" grid grid-cols-2 gap-2">
            <button type="submit">Create</button>
            <button type="button" @click="closeDialog">Close</button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>