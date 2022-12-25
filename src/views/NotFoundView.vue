<script setup lang="ts">
  import { useI18n } from "vue-i18n";

  import TheError from "@/components/TheError.vue";

  const { t } = useI18n();
</script>

<template>
  <main class="flex h-screen flex-col justify-center px-4 lg:px-16">
    <TheError :message="t('error')" />
  </main>
</template>

<i18n lang="json">
{
  "en": {
    "error": "Page not found"
  },
  "uk": {
    "error": "Сторінка не знайдена"
  },
  "ru": {
    "error": "Страница не найдена"
  }
}
</i18n>
