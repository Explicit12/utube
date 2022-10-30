<script setup lang="ts">
  import { onMounted } from "vue";
  import { RouterView } from "vue-router";
  import { useI18n } from "vue-i18n";

  const { locale } = useI18n();

  onMounted(() => {
    setTimeout(() => {
      locale.value = "en-US";
    }, 500);
  });
</script>

<template>
  <RouterView />
</template>
