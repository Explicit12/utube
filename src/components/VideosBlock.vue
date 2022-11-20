<script setup lang="ts">
  import { ref, computed } from "vue";

  import { useOnScrollBottom } from "@/composables/useOnBottomScroll";

  import VideoCompact from "@/components/VideoCompact.vue";
  import VideoCompactSkeleton from "@/components/skeletonLoaders/VideoCompactSkeleton.vue";
  import SpinnerLoader from "@/components/SpinnerLoader.vue";

  import type { VideoInfo } from "@/utils/invidiousAPI";
  import type { Ref } from "vue";

  const props = defineProps<{
    showPerView: number;
    videos: VideoInfo[];
    sortByTime?: boolean;
    horizontalLayout?: boolean;
  }>();

  const isSpinnerVisible: Ref<boolean> = ref(false);
  const toShow: Ref<number> = ref(props.showPerView);

  const sortedByTimeVideos = computed<VideoInfo[]>(() =>
    [...props.videos].sort((a, b) => {
      return b.published - a.published;
    }),
  );

  const videosToShow = computed<VideoInfo[]>(() => {
    return props.sortByTime
      ? sortedByTimeVideos.value.slice(0, toShow.value)
      : props.videos.slice(0, toShow.value);
  });

  useOnScrollBottom(() => {
    if (toShow.value >= props.videos.length) return;
    isSpinnerVisible.value = true;
    setTimeout(() => {
      toShow.value += props.videos.length ? props.showPerView : 0;
      isSpinnerVisible.value = false;
    }, 500);
  });
</script>

<template>
  <div>
    <div
      :class="{
        'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5': !horizontalLayout,
      }"
      class="grid grid-cols-1 gap-4 py-4"
    >
      <template v-if="videos.length">
        <VideoCompact
          v-for="video in videosToShow"
          :key="video.videoId"
          :name="video.title"
          :author="{ name: video.author, id: video.authorId }"
          :views="video.viewCount"
          :date="video.published"
          :image="video.videoThumbnails"
          :video-id="video.videoId"
          :horizontal-layout="horizontalLayout"
        />
      </template>
      <template v-else>
        <VideoCompactSkeleton
          v-for="n in showPerView"
          :key="n"
          :horizontal-layout="horizontalLayout"
        />
      </template>
    </div>
    <SpinnerLoader v-if="isSpinnerVisible" class="my-4" />
  </div>
</template>
