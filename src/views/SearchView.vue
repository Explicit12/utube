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

  const requestError: Ref<AxiosError | undefined> = ref();
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

  async function getData(query: string): Promise<void> {
    try {
      const channelsSearchResult = await searchChannel(query);
      channels.value = channelsSearchResult;

      const channelsSubs = await Promise.all(
        channels.value.map((channel) => getChannelSubs(channel.authorId)),
      );
      channels.value = channels.value.map((channel, index) => {
        channel.subCount = channelsSubs[index];
        return channel;
      });

      const videosSearchResult = await searchVideo(query);
      videos.value = videosSearchResult;
    } catch (error) {
      requestError.value = error as AxiosError;
    }
  }

  onBeforeRouteUpdate((to) => {
    if (typeof to.query.search_query !== "string") return false;
    channels.value = [];
    videos.value = [];

    getData(to.query.search_query);
  });

  onBeforeMount(() => getData(props.searchQuery));
</script>

<template>
  <main class="px-4 lg:px-16">
    <div
      v-if="!requestError"
      class="mx-auto flex max-w-screen-xl flex-col justify-center"
    >
      <div v-if="channels.length" class="flex flex-col gap-4 pt-8">
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
        :videos="fullInfoVideos"
        :show-per-view="10"
        :horizontal-layout="true"
        class="py-4"
      />
    </div>
    <TheError v-else :message="requestError.message" />
  </main>
</template>
