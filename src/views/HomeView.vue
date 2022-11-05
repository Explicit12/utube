<script setup lang="ts">
  import { watch, ref, computed, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useWindowScroll } from "@vueuse/core";

  import VideoCompact from "@/components/videoCompact/VideoCompact.vue";
  import VideoCompactSkeleton from "@/components/skeletonLoaders/VideoCompactSkeleton.vue";

  import { getPopular } from "@/utils/invidiousAPI";

  import type { Ref } from "vue";
  import type { PopularVideos } from "@/utils/invidiousAPI";

  const isVideosLoaded: Ref<boolean> = ref(false);
  const requestError: Ref<string> = ref("");
  const videos: Ref<PopularVideos | []> = ref([]);
  const standardToShow: Ref<number> = ref(20);
  const videosToShow: Ref<number> = ref(standardToShow.value);

  const { y: scrollY } = useWindowScroll();
  const { t } = useI18n();

  const slicedVideos = computed(() => {
    return videos.value.slice(0, videosToShow.value);
  });

  watch(scrollY, (newValue) => {
    if (
      newValue === document.body.scrollHeight - window.innerHeight &&
      isVideosLoaded
    ) {
      setTimeout(() => (videosToShow.value += standardToShow.value), 500);
    }
  });

  onMounted(() => {
    getPopular()
      .then((popular) => {
        videos.value = popular;
        isVideosLoaded.value = true;
      })
      .catch((err) => (requestError.value = err.message));
  });
</script>

<template>
  <main class="flex flex-col justify-center px-4">
    <h1 class="pt-8 font-sans text-2xl font-bold text-gray-900">
      {{ t("headline") }}
    </h1>
    <div
      class="grid grid-cols-1 gap-4 py-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <template v-if="isVideosLoaded">
        <VideoCompact
          v-for="video in slicedVideos"
          :key="video.title"
          :name="video.title"
          :author="{ name: video.author, id: video.authorId }"
          :views="video.viewCount"
          :date="video.published"
          :image="video.videoThumbnails"
        />
      </template>
      <template v-else>
        <VideoCompactSkeleton v-for="n in standardToShow" :key="n" />
      </template>
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
