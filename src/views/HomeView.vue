<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import VideosBlock from "@/components/VideosBlock.vue";
  import { getPopular } from "@/utils/invidiousAPI";

  const { t } = useI18n();
</script>

<template>
  <main class="flex flex-col justify-center px-4">
    <h1 class="pt-8 font-sans text-2xl font-bold text-gray-900">
      {{ t("headline") }}
    </h1>
    <VideosBlock :request="getPopular" :show-per-view="20" />
  </main>
</template>

<i18n lang="json">
{
  "en-US": {
    "headline": "Popular"
  },
  "uk-UA": {
    "headline": "Популярне"
  },
  "ru-RU": {
    "headline": "Популярное"
  }
}
</i18n>
