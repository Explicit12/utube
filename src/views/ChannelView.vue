<script setup lang="ts">
  import { onBeforeMount, ref, defineAsyncComponent } from "vue";
  import { onBeforeRouteUpdate } from "vue-router";
  import { IconImageArea } from "@iconify-prerendered/vue-mdi";

  import ChannelCompact from "@/components/ChannelCompact.vue";
  import VideosBlock from "@/components/VideosBlock.vue";
  import ChannelCompactSkeletonVue from "@/components/skeletonLoaders/ChannelCompactSkeleton.vue";

  import {
    getChannelVideos,
    getChannelInfo,
    pingImage,
  } from "@/utils/invidiousAPI";

  import type { Ref } from "vue";
  import type { ChannelInfo, ChannelId, VideoInfo } from "@/utils/invidiousAPI";

  const TheError = defineAsyncComponent(
    () => import("@/components/TheError.vue"),
  );

  const props = defineProps<{ id: ChannelId }>();

  const channel: Ref<ChannelInfo | undefined> = ref();
  const channelRequestError: Ref<Error | undefined> = ref();
  const videoRequestError: Ref<Error | undefined> = ref();
  const videos: Ref<VideoInfo[]> = ref([]);
  const imageError: Ref<Error | undefined> = ref();

  async function requestChannel(id: ChannelId) {
    try {
      const channelInfo = await getChannelInfo(id);
      if (!channelInfo.authorBanners.length) {
        imageError.value = new Error("No banner image");
      } else {
        pingImage(channelInfo.authorBanners[0].url).catch(
          (err) => (imageError.value = err),
        );
      }

      channel.value = channelInfo;
    } catch (error) {
      console.error((error as Error).message);
      channelRequestError.value = error as Error;
    }
  }

  onBeforeRouteUpdate((to) => {
    if (typeof to.params.id !== "string") return false;
    channelRequestError.value = undefined;
    videoRequestError.value = undefined;
    channel.value = undefined;
    requestChannel(to.params.id);
    getChannelVideos(to.params.id)
      .then((result) => {
        videos.value = result;
      })
      .catch((err) => (videoRequestError.value = err));
  });

  onBeforeMount(() => {
    requestChannel(props.id);
    getChannelVideos(props.id)
      .then((result) => {
        videos.value = result;
      })
      .catch((err) => (videoRequestError.value = err));
  });
</script>

<template>
  <main class="flex flex-col justify-center gap-4 px-4">
    <template v-if="channel && !channelRequestError">
      <div v-if="!imageError" class="relative">
        <img
          :src="channel.authorBanners[0].url"
          alt="ChannelThumbnail"
          :width="channel.authorBanners[0].width"
          :height="channel.authorBanners[0].height"
          class="mt-8 rounded-lg"
        />
        <img
          :src="channel.authorBanners[0].url"
          alt="ChannelThumbnail"
          :width="channel.authorBanners[0].width"
          :height="channel.authorBanners[0].height"
          class="absolute top-8 -z-10 max-h-[249px] w-full max-w-screen-2xl animate-pulse rounded-lg opacity-75 blur-2xl"
        />
      </div>
      <div
        v-else
        class="mt-8 flex h-screen max-h-[170px] w-full items-center justify-center rounded-lg bg-gray-200"
      >
        <IconImageArea class="text-gray-400" width="32" height="32" />
      </div>
      <ChannelCompact
        :name="channel.author"
        :channels-id="channel.authorId"
        :subs="channel.subCount"
        :thumbnail="channel.authorThumbnails"
        class="pt-8"
      />
    </template>
    <template v-else-if="!channel && !channelRequestError">
      <div
        class="mt-8 h-screen max-h-[170px] w-full animate-pulse rounded-lg bg-gray-200"
      />
      <ChannelCompactSkeletonVue class="pt-8" />
    </template>
    <TheError
      v-else-if="channelRequestError"
      :message="channelRequestError.message"
      class="items-center"
    />
    <hr />
    <VideosBlock
      v-if="!videoRequestError"
      :videos="videos"
      :query="id"
      :show-per-view="20"
      class="py-4"
    />
    <TheError v-else :message="videoRequestError.message" />
  </main>
</template>
