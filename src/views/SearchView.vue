<script setup lang="ts">
  import { ref, computed, onBeforeMount } from "vue";
  import { onBeforeRouteUpdate } from "vue-router";

  import ChannelCompact from "@/components/ChannelCompact.vue";
  import ChannelCompactSkeleton from "@/components/skeletonLoaders/ChannelCompactSkeleton.vue";
  import VideosBlock from "@/components/VideosBlock.vue";

  import { searchVideo, searchChannel } from "@/utils/invidiousAPI";

  import type { Ref } from "vue";
  import type { ShortChannelInfo } from "@/utils/invidiousAPI";

  const props = defineProps<{ searchQuery: string }>();

  const isChannelsLoaded: Ref<boolean> = ref(false);
  const requestError: Ref<string> = ref("");
  const channels: Ref<ShortChannelInfo[]> = ref([]);
  const toShow: Ref<number> = ref(3);

  const sortedBySubsChannels = computed<ShortChannelInfo[]>(() => {
    return [...channels.value].sort((a, b) => {
      if (a.subCount && b.subCount) return b.subCount - a.subCount;
      else return 0;
    });
  });

  const channelsToShow = computed<ShortChannelInfo[]>(() => {
    return sortedBySubsChannels.value.slice(0, toShow.value);
  });

  onBeforeRouteUpdate((to) => {
    console.log(to);
    if (typeof to.query.search_query !== "string") return false;
    isChannelsLoaded.value = false;
    searchChannel(to.query.search_query)
      .then((result) => {
        channels.value = result;
        isChannelsLoaded.value = true;
      })
      .catch((err) => (requestError.value = err));
  });

  onBeforeMount(() => {
    searchChannel(props.searchQuery)
      .then((result) => {
        channels.value = result;
        isChannelsLoaded.value = true;
      })
      .catch((err) => (requestError.value = err));
  });
</script>

<template>
  <main class="flex max-w-screen-xl flex-col justify-center px-4">
    <div v-if="isChannelsLoaded" class="flex flex-col gap-4 pt-8">
      <ChannelCompact
        v-for="channel in channelsToShow"
        :key="channel.authorId"
        :name="channel.author"
        :subs="channel.subCount ? channel.subCount : 0"
        :thumbnail="channel.authorThumbnails"
        :channels-id="channel.authorId"
      />
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
