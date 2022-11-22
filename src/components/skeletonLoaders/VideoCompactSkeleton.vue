<script setup lang="ts">
  import { IconPlay } from "@iconify-prerendered/vue-mdi";

  defineProps<{ horizontalLayout?: boolean }>();
</script>

<template>
  <div :class="{ 'sm:flex md:gap-4': horizontalLayout }" class="animate-pulse">
    <div
      :class="{ 'sm:min-w-[12rem] sm:max-w-sm': horizontalLayout }"
      class="flex aspect-video items-center justify-center rounded-lg bg-gray-200"
    >
      <IconPlay width="32" height="32" class="rounded-sm text-gray-400" />
    </div>

    <div class="w-full">
      <div
        :class="{ 'mt-4': !horizontalLayout, 'max-md:mt-4': horizontalLayout }"
        class="h-4 w-4/5 rounded-sm bg-gray-400"
      />

      <div class="mt-2 h-4 w-6/12 rounded-sm bg-gray-200" />
      <div class="flex gap-2">
        <div class="mt-1 h-2 w-8 rounded-sm bg-gray-200" />
        <div class="mt-1 h-2 w-8 rounded-sm bg-gray-200" />
      </div>
    </div>
  </div>
</template>
