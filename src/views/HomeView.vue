<script setup lang="ts">
  import { watch, ref, computed, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useWindowScroll } from "@vueuse/core";

  import VideoCompact from "@/components/videoCompact/VideoCompact.vue";

  import { getPopular } from "@/utils/invidiousAPI";

  import type { Ref } from "vue";
  import type { PopularVideos } from "@/utils/invidiousAPI";

  onMounted(() => {
    getPopular()
      .then((popular) => (videos.value = popular))
      .catch((err) => (requestError.value = err.message));
  });

  const requestError: Ref<string> = ref("");
  const videos: Ref<PopularVideos | []> = ref([]);
  const standardToShow: Ref<number> = ref(16);
  const videosToShow: Ref<number> = ref(standardToShow.value);

  const { y: scrollY } = useWindowScroll();

  const slicedVideos = computed(() => {
    return videos.value.slice(0, videosToShow.value);
  });

  watch(scrollY, (newValue) => {
    if (newValue === document.body.scrollHeight - window.innerHeight) {
      setTimeout(() => (videosToShow.value += standardToShow.value), 500);
    }
  });

  const { t } = useI18n();
</script>

<template>
  <main class="flex flex-col justify-center px-4">
    <h1 class="pt-8 font-sans text-2xl font-bold text-gray-900">
      {{ t("headline") }}
    </h1>
    <div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-3 lg:grid-cols-4">
      <VideoCompact
        v-for="video in slicedVideos"
        :key="video.title"
        :name="video.title"
        :author="{ name: video.author, id: video.authorId }"
        :views="video.viewCount"
        :date="video.published"
        :image="video.videoThumbnails"
      />
    </div>
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
