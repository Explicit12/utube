<script setup lang="ts">
  import { ref, computed, onBeforeMount, defineAsyncComponent } from "vue";
  import { onBeforeRouteUpdate } from "vue-router";

  import ChannelCompact from "@/components/ChannelCompact.vue";
  import ChannelCompactSkeleton from "@/components/skeletonLoaders/ChannelCompactSkeleton.vue";
  import VideosBlock from "@/components/VideosBlock.vue";

  import {
    searchVideo,
    searchChannel,
    getChannelSubs,
  } from "@/utils/invidiousAPI";

  import type { Ref } from "vue";
  import type { ChannelInfo, VideoInfo } from "@/utils/invidiousAPI";
  import type { AxiosError } from "axios";

  const TheError = defineAsyncComponent(
    () => import("@/components/TheError.vue"),
  );

  const props = defineProps<{ searchQuery: string }>();

  const channelRequestError: Ref<AxiosError | undefined> = ref();
  const videoRequestError: Ref<AxiosError | undefined> = ref();
  const channels: Ref<ChannelInfo[]> = ref([]);
  const videos: Ref<VideoInfo[]> = ref([]);
  const AmoutChannelstoShow = ref(3);

  const sortedBySubsChannels = computed<ChannelInfo[]>(() => {
    return [...channels.value].sort((a, b) => {
      if (a.subCount && b.subCount) return b.subCount - a.subCount;
      else return 0;
    });
  });

  const channelsToShow = computed<ChannelInfo[]>(() => {
    return sortedBySubsChannels.value.slice(0, AmoutChannelstoShow.value);
  });

  const fullInfoVideos = computed<VideoInfo[]>(() =>
    videos.value.filter((video) => video.published && video.viewCount),
  );

  onBeforeRouteUpdate((to) => {
    if (typeof to.query.search_query !== "string") return false;
    channels.value = [];
    videos.value = [];
    searchChannel(to.query.search_query)
      .then((result) => {
        channels.value = result;
      })
      .then(() => {
        return Promise.all(
          channels.value.map((channel) => getChannelSubs(channel.authorId)),
        );
      })
      .then((channelSubs) => {
        channels.value = channels.value.map((channel, index) => {
          channel.subCount = channelSubs[index];
          return channel;
        });
      })
      .catch((err) => (channelRequestError.value = err));

    searchVideo(to.query.search_query)
      .then((result) => {
        videos.value = result;
      })
      .catch((err) => (videoRequestError.value = err));
  });

  onBeforeMount(() => {
    searchChannel(props.searchQuery)
      .then((result) => {
        channels.value = result;
      })
      .then(() => {
        return Promise.all(
          channels.value.map((channel) => getChannelSubs(channel.authorId)),
        );
      })
      .then((channelSubs) => {
        channels.value = channels.value.map((channel, index) => {
          channel.subCount = channelSubs[index];
          return channel;
        });
      })
      .catch((err) => (channelRequestError.value = err));

    searchVideo(props.searchQuery)
      .then((result) => {
        videos.value = result;
      })
      .catch((err) => (videoRequestError.value = err));
  });
</script>

<template>
  <main class="px-4 lg:px-6">
    <div class="mx-auto flex max-w-screen-xl flex-col justify-center">
      <div
        v-if="channels.length && !channelRequestError"
        class="flex flex-col gap-4 pt-8"
      >
        <RouterLink
          v-for="channel in channelsToShow"
          :key="channel.authorId"
          :to="{ name: 'channel', params: { id: channel.authorId } }"
        >
          <ChannelCompact
            :name="channel.author"
            :subs="channel.subCount ? channel.subCount : 0"
            :thumbnail="channel.authorThumbnails"
            :channels-id="channel.authorId"
          />
        </RouterLink>
        <hr />
      </div>
      <div v-else class="flex flex-col gap-4 pt-8">
        <ChannelCompactSkeleton v-for="n in AmoutChannelstoShow" :key="n" />
        <hr />
      </div>
      <VideosBlock
        v-if="!videoRequestError"
        :videos="fullInfoVideos"
        :show-per-view="10"
        :horizontal-layout="true"
        class="py-4"
      />
      <TheError v-else :message="videoRequestError.message" />
    </div>
  </main>
</template>
