<script setup>

const props = defineProps({
  dialogElement: Object
});
const showDialog = () => {
  props.dialogElement.showModal();
}
</script>
<template>
  <div class="mx-4 flex justify-center">
    <button type="button" class="bg-white rounded-sm text-black p-4 h-1/2 hover:bg-gray-100" @click="showDialog"> Create
      New Node </button>
  </div>
</template>