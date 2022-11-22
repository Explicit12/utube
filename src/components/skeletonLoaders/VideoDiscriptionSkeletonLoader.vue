<template>
  <div class="animate-pulse">
    <div class="w-full">
      <div class="h-4 w-4/5 rounded-sm bg-gray-400" />

      <div
        v-for="n in 3"
        :key="n"
        class="mt-2 h-4 w-6/12 rounded-sm bg-gray-200"
      />
    </div>
  </div>
</template>
