<script setup lang="ts">
  defineProps<{ type: "primary" | "secondary" }>();
</script>

<template>
  <button
    :class="{
      'bg-blue-600 text-white transition-colors hover:bg-blue-700 focus:border-blue-700':
        type === 'primary',
      'bg-blue-50 text-gray-600 transition-colors hover:bg-blue-100 focus:border-blue-200':
        type === 'secondary',
    }"
    class="rounded-lg border-2 border-transparent py-2 px-4 text-center font-sans text-base font-normal focus:border-2"
  >
    <slot />
  </button>
</template>
