<script setup lang="ts">
  import {
    onBeforeMount,
    ref,
    computed,
    watch,
    defineAsyncComponent,
  } from "vue";

  import { useOnScrollBottom } from "@/composables/useOnBottomScroll";

  import VideoCompact from "@/components/VideoCompact.vue";
  import VideoCompactSkeleton from "@/components/skeletonLoaders/VideoCompactSkeleton.vue";
  import SpinnerLoader from "@/components/SpinnerLoader.vue";

  import type { ChannelsId, ShortVideoInfo } from "@/utils/invidiousAPI";
  import type { Ref } from "vue";

  type GetFunction = () => Promise<ShortVideoInfo[]>;
  type SearchFunction = (query: ChannelsId) => Promise<ShortVideoInfo[]>;

  const TheError = defineAsyncComponent(
    () => import("@/components/TheError.vue"),
  );

  function isSearchFunction(
    func: GetFunction | SearchFunction,
  ): func is SearchFunction {
    if ((func as SearchFunction).length) return true;
    else return false;
  }

  const props = defineProps<{
    showPerView: number;
    query?: string;
    request: GetFunction | SearchFunction;
    sortByTime?: boolean;
    horizontalLayout?: boolean;
  }>();

  const requestError: Ref<string> = ref("");
  const isVideosLoaded: Ref<boolean> = ref(false);
  const isSpinnerVisible: Ref<boolean> = ref(false);
  const videos: Ref<ShortVideoInfo[]> = ref([]);
  const toShow: Ref<number> = ref(props.showPerView);

  const sortedByTimeVideos = computed<ShortVideoInfo[]>(() =>
    [...videos.value].sort((a, b) => {
      return b.published - a.published;
    }),
  );

  const videosToShow = computed<ShortVideoInfo[]>(() => {
    return props.sortByTime
      ? sortedByTimeVideos.value.slice(0, toShow.value)
      : videos.value.slice(0, toShow.value);
  });

  async function getVideos(): Promise<void> {
    let response: ShortVideoInfo[] = [];
    if (isSearchFunction(props.request) && props.query) {
      response = await props.request(props.query);
    } else if (isSearchFunction(props.request) && !props.query) {
      throw new Error("Request function require query property.");
    } else {
      response = await (props.request as GetFunction)();
    }

    // sometimes we may get video without title and published time, it's api issue
    videos.value = response.filter((video) => video.title && video.published);
  }

  useOnScrollBottom(() => {
    if (toShow.value >= videos.value.length) return;
    isSpinnerVisible.value = true;
    setTimeout(() => {
      toShow.value += isVideosLoaded.value ? props.showPerView : 0;
      isSpinnerVisible.value = false;
    }, 500);
  });

  watch(
    () => props.query,
    () => {
      isVideosLoaded.value = false;
      getVideos()
        .then(() => (isVideosLoaded.value = true))
        .catch((err) => (requestError.value = err.message));
    },
  );

  onBeforeMount(() => {
    isVideosLoaded.value = false;
    getVideos()
      .then(() => (isVideosLoaded.value = true))
      .catch((err) => (requestError.value = err.message));
  });
</script>

<template>
  <div>
    <template v-if="!requestError">
      <div
        :class="{
          'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5': !horizontalLayout,
        }"
        class="grid grid-cols-1 gap-4 py-4"
      >
        <template v-if="isVideosLoaded">
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
    </template>
    <TheError
      v-else
      :message="requestError"
      class="h-[calc(100vh_-_138px)] items-center"
    />
  </div>
</template>
