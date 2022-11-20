<script setup lang="ts">
  import { ref, computed, onBeforeMount } from "vue";
  import { onBeforeRouteUpdate } from "vue-router";

  import ChannelCompact from "@/components/ChannelCompact.vue";
  import ChannelCompactSkeleton from "@/components/skeletonLoaders/ChannelCompactSkeleton.vue";
  import VideosBlock from "@/components/VideosBlock.vue";

  import { searchVideo, searchChannel } from "@/utils/invidiousAPI";

  import type { Ref } from "vue";
  import type { ChannelInfo } from "@/utils/invidiousAPI";

  const props = defineProps<{ searchQuery: string }>();

  const requestError: Ref<Error | undefined> = ref();
  const channels: Ref<ChannelInfo[]> = ref([]);
  const toShow: Ref<number> = ref(3);

  const sortedBySubsChannels = computed<ChannelInfo[]>(() => {
    return [...channels.value].sort((a, b) => {
      if (a.subCount && b.subCount) return b.subCount - a.subCount;
      else return 0;
    });
  });

  const channelsToShow = computed<ChannelInfo[]>(() => {
    return sortedBySubsChannels.value.slice(0, toShow.value);
  });

  onBeforeRouteUpdate((to) => {
    console.log(to);
    if (typeof to.query.search_query !== "string") return false;
    channels.value = [];
    searchChannel(to.query.search_query)
      .then((result) => {
        channels.value = result;
      })
      .catch((err) => (requestError.value = err));
  });

  onBeforeMount(() => {
    searchChannel(props.searchQuery)
      .then((result) => {
        channels.value = result;
      })
      .catch((err) => (requestError.value = err));
  });
</script>

<template>
  <main class="flex max-w-screen-xl flex-col justify-center px-4">
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
      <ChannelCompactSkeleton v-for="n in toShow" :key="n" />
      <hr />
    </div>
    <VideosBlock
      :query="searchQuery"
      :request="searchVideo"
      :show-per-view="10"
      :horizontal-layout="true"
    />
  </main>
</template>
