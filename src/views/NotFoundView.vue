<script setup lang="ts">
  import { useI18n } from "vue-i18n";

  import TheError from "@/components/TheError.vue";

  const { t } = useI18n();
</script>

<template>
  <main>
    <div class="mx-auto max-w-screen-xl px-4 lg:px-16">
      <TheError :message="t('error')" />
    </div>
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
