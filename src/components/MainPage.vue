<script setup>
import FlowChart from './FlowChart.vue';
import CreateNewNode from './CreateNewNode.vue';
import { ref } from 'vue';
import { useNodeStore } from '../stores/useNodeStore';

const dialogElement = ref(null);

const closeDialog = () => {
  dialogElement.value.close();
}

const store = useNodeStore()
const { addNode } = store;

const createNewNode = () => {
  // get form data
  addNode(data)
}
</script>
<template>
  <div class="grid grid-rows-[5fr_1fr]">
    <FlowChart />
    <CreateNewNode :dialogElement="dialogElement" />
    <dialog ref="dialogElement" class="w-1/2 h-1/2 rounded-md p-4">
      <div class="grid grid-rows-[1fr_3fr] h-full">
        <h2>Create New Node</h2>
        <form class="grid grid-rows gap-2">
          <div class="grid grid-cols-2 gap-2">

            <input placeholder="Title" class="h-1/2 p-4" name="title" />
            <select class="h-1/2 p-4" name="type">
              <option value="sendMessage">sendMessage</option>
              <option value="addComment">addComment</option>
              <option value="businessHours">businessHours</option>
            </select>
          </div>
          <textarea placeholder="Description" class="p-4" name="description" />
          <div class=" grid grid-cols-2 gap-2">
            <button type="submit" @click="createNewNode">Create</button>
            <button type="button" @click="closeDialog">Close</button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>
