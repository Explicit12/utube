<script setup lang="ts">
  import { ref, computed, onMounted } from "vue";
  import { useI18n } from "vue-i18n";

  import VideoCompact from "@/components/VideoCompact.vue";
  import VideoCompactSkeleton from "@/components/skeletonLoaders/VideoCompactSkeleton.vue";
  import TheError from "@/components/TheError.vue";

  import { getPopular } from "@/utils/invidiousAPI";
  import { useOnScrollBottom } from "@/composables/useOnBottomScroll";

  import type { Ref } from "vue";
  import type { ShortVideoInfo } from "@/utils/invidiousAPI";

  const isVideosLoaded: Ref<boolean> = ref(false);
  const requestError: Ref<string> = ref("");
  const videos: Ref<ShortVideoInfo[]> = ref([]);
  const standardToShow: Ref<number> = ref(20);
  const videosToShow: Ref<number> = ref(standardToShow.value);

  const { t } = useI18n();

  const slicedVideos = computed<ShortVideoInfo[]>(() => {
    return videos.value.slice(0, videosToShow.value);
  });

  useOnScrollBottom(() =>
    setTimeout(() => {
      videosToShow.value += isVideosLoaded.value ? standardToShow.value : 0;
    }, 500),
  );

  onMounted(() => {
    getPopular()
      .then((result) => {
        videos.value = result;
        isVideosLoaded.value = true;
      })
      .catch((err) => (requestError.value = err.message));
  });
</script>

<template>
  <main class="flex flex-col justify-center px-4">
    <template v-if="!requestError">
      <h1 class="pt-8 font-sans text-2xl font-bold text-gray-900">
        {{ t("headline") }}
      </h1>
      <div
        class="grid grid-cols-1 gap-4 py-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <template v-if="isVideosLoaded">
          <VideoCompact
            v-for="video in slicedVideos"
            :key="video.videoId"
            :name="video.title"
            :author="{ name: video.author, id: video.authorId }"
            :views="video.viewCount"
            :date="video.published"
            :image="video.videoThumbnails"
            :video-id="video.videoId"
          />
        </template>
        <template v-else>
          <VideoCompactSkeleton v-for="n in standardToShow" :key="n" />
        </template>
      </div>
    </template>
    <TheError
      v-else
      :message="requestError"
      class="h-[calc(100vh_-_138px)] items-center"
    />
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
