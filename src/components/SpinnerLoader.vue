<script setup lang="ts">
  import { IconLoading } from "@iconify-prerendered/vue-mdi";
</script>
<template>
  <div
    class="flex h-fit w-full items-center justify-center rounded-lg bg-gray-200 p-4 dark:bg-gray-800"
  >
    <IconLoading
      class="animate-spin text-blue-600 dark:text-gray-500"
      width="32"
      height="32"
    />
  </div>
</template>
