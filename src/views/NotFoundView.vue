<script setup lang="ts">
  import { useI18n } from "vue-i18n";

  import TheError from "@/components/TheError.vue";

  const { t } = useI18n();
</script>

<template>
  <main class="flex flex-col justify-center px-4">
    <TheError :message="t('error')" />
  </main>
</template>

<i18n lang="json">
{
  "en-US": {
    "error": "Page not found"
  },
  "uk-UA": {
    "error": "Сторінка не знайдена"
  },
  "ru-RU": {
    "error": "Страница не найдена"
  }
}
</i18n>
