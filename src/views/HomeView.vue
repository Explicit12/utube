<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { ref, onBeforeMount, defineAsyncComponent } from "vue";

  import VideosBlock from "@/components/VideosBlock.vue";

  import { getPopularVideos } from "@/utils/invidiousAPI";

  import type { Ref } from "vue";
  import type { VideoInfo } from "@/utils/invidiousAPI";

  const TheError = defineAsyncComponent(
    () => import("@/components/TheError.vue"),
  );

  const { t } = useI18n();

  const requestError: Ref<Error | undefined> = ref();
  const videos: Ref<VideoInfo[]> = ref([]);

  onBeforeMount(() => {
    getPopularVideos()
      .then((result) => {
        videos.value = result;
      })
      .catch((err) => (requestError.value = err));
  });
</script>

<template>
  <main class="flex flex-col justify-center px-4 lg:px-16">
    <template v-if="!requestError">
      <h1
        class="pt-8 font-sans text-2xl font-bold text-gray-900 dark:text-white"
      >
        {{ t("headline") }}
      </h1>
      <VideosBlock :videos="videos" :show-per-view="20" class="py-4" />
    </template>
    <TheError v-else :message="requestError.message" />
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
