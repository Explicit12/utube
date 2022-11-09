<script setup lang="ts">
  import { ref, computed, onBeforeMount } from "vue";
  import { onBeforeRouteUpdate } from "vue-router";

  import VideoCompact from "@/components/VideoCompact.vue";
  import VideoCompactSkeleton from "@/components/skeletonLoaders/VideoCompactSkeleton.vue";
  import ChannelCompact from "@/components/ChannelCompact.vue";
  import ChannelCompactSkeleton from "@/components/skeletonLoaders/ChannelCompactSkeleton.vue";

  import { searchVideo, searchChannel } from "@/utils/invidiousAPI";
  import { useOnScrollBottom } from "@/composables/useOnBottomScroll";

  import type { Ref } from "vue";
  import type { ShortVideoInfo, ShortChannelInfo } from "@/utils/invidiousAPI";

  const props = defineProps<{ searchQuery: string }>();

  const isDataLoaded: Ref<boolean> = ref(false);
  const requestError: Ref<string> = ref("");
  const videos: Ref<ShortVideoInfo[]> = ref([]);
  const channels: Ref<ShortChannelInfo[]> = ref([]);
  const channelsToShow: Ref<number> = ref(3);
  const standardVideoToShow: Ref<number> = ref(20);
  const videosToShow: Ref<number> = ref(standardVideoToShow.value);

  const filteredVideos = computed<ShortVideoInfo[]>(() => {
    return videos.value.filter((video) => video.title && video.published);
  });

  const sortedToDownChannels = computed<ShortChannelInfo[]>(() => {
    return [...channels.value].sort((a, b) => {
      if (a.subCount && b.subCount) return b.subCount - a.subCount;
      else return 0;
    });
  });

  const slicedVideos = computed<ShortVideoInfo[]>(() => {
    return filteredVideos.value.slice(0, videosToShow.value);
  });

  const slicedChannels = computed<ShortChannelInfo[]>(() => {
    return sortedToDownChannels.value.slice(0, channelsToShow.value);
  });

  useOnScrollBottom(() =>
    setTimeout(() => {
      videosToShow.value += isDataLoaded.value ? standardVideoToShow.value : 0;
    }, 500),
  );

  onBeforeRouteUpdate((to) => {
    if (typeof to.query.search_query !== "string") return false;
    isDataLoaded.value = false;
    Promise.all([
      searchVideo(to.query.search_query),
      searchChannel(to.query.search_query),
    ])
      .then((searchResult) => {
        videos.value = searchResult[0];
        channels.value = searchResult[1];
        isDataLoaded.value = true;
      })
      .catch((err) => (requestError.value = err.message));
  });

  onBeforeMount(() => {
    Promise.all([
      searchVideo(props.searchQuery),
      searchChannel(props.searchQuery),
    ])
      .then((searchResult) => {
        videos.value = searchResult[0];
        channels.value = searchResult[1];
        isDataLoaded.value = true;
      })
      .catch((err) => (requestError.value = err.message));
  });
</script>

<template>
  <main class="flex max-w-screen-xl flex-col justify-center px-4">
    <div class="grid grid-cols-1 gap-4 py-4 pt-8">
      <template v-if="isDataLoaded">
        <ChannelCompact
          v-for="channel in slicedChannels"
          :key="channel.authorId"
          :name="channel.author"
          :subs="channel.subCount ? channel.subCount : 0"
          :thumbnail="channel.authorThumbnails"
          :channels-id="channel.authorId"
        />
        <hr v-if="slicedChannels.length" />
        <VideoCompact
          v-for="video in slicedVideos"
          :key="video.videoId"
          :name="video.title"
          :author="{ name: video.author, id: video.authorId }"
          :views="video.viewCount"
          :date="video.published"
          :image="video.videoThumbnails"
          :video-id="video.videoId"
          horizontal-layout
        />
      </template>
      <template v-else>
        <ChannelCompactSkeleton v-for="n in channelsToShow" :key="n" />
        <hr />
        <VideoCompactSkeleton
          v-for="n in standardVideoToShow"
          :key="n"
          horizontal-layout
        />
      </template>
    </div>
  </main>
</template>
