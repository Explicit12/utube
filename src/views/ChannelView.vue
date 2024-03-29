<script setup lang="ts">
  import { onBeforeMount, ref, defineAsyncComponent } from "vue";
  import { onBeforeRouteUpdate } from "vue-router";
  import { IconImageArea } from "@iconify-prerendered/vue-mdi";
  import { useRouter } from "vue-router";

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
  import type { AxiosError } from "axios";

  const TheError = defineAsyncComponent(
    () => import("@/components/TheError.vue"),
  );

  const props = defineProps<{ id: ChannelId }>();

  const channel: Ref<ChannelInfo | undefined> = ref();
  const dataRequestError: Ref<AxiosError | undefined> = ref();
  const videos: Ref<VideoInfo[]> = ref([]);
  const imageNotFound: Ref<Error | undefined> = ref();
  const router = useRouter();

  async function getData(id: ChannelId): Promise<void> {
    try {
      const channelInfo = await getChannelInfo(id);
      if (!channelInfo.authorBanners.length) {
        imageNotFound.value = new Error("No banner image");
      } else {
        pingImage(channelInfo.authorBanners[0].url).catch(
          (err) => (imageNotFound.value = err),
        );
      }

      channel.value = channelInfo;

      const channelVideos = await getChannelVideos(id);
      videos.value = channelVideos;
    } catch (error) {
      console.error((error as Error).message);
      dataRequestError.value = error as AxiosError;
    }
  }

  onBeforeRouteUpdate((to) => {
    if (typeof to.params.id !== "string") return false;
    dataRequestError.value = undefined;
    channel.value = undefined;
    videos.value = [];

    getData(to.params.id).then(() => {
      if (
        dataRequestError.value &&
        dataRequestError.value.response?.status === 404
      ) {
        router.replace({ name: "notFound" });
      }
    });
  });

  onBeforeMount(() => {
    getData(props.id).then(() => {
      if (
        dataRequestError.value &&
        dataRequestError.value.response?.status === 404
      ) {
        router.replace({ name: "notFound" });
      }
    });
  });
</script>

<template>
  <main>
    <div class="flex flex-col justify-center gap-4 px-4 lg:px-16">
      <template v-if="channel && !dataRequestError">
        <div v-if="!imageNotFound" class="relative">
          <img
            :src="channel.authorBanners[0].url"
            alt="ChannelThumbnail"
            :width="channel.authorBanners[0].width"
            :height="channel.authorBanners[0].height"
            class="mt-8 rounded-lg object-cover"
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
          class="mt-8 flex h-screen max-h-[170px] w-full items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800"
        >
          <IconImageArea
            class="text-gray-400 dark:text-gray-300"
            width="32"
            height="32"
          />
        </div>
        <h1>
          <ChannelCompact
            :name="channel.author"
            :channels-id="channel.authorId"
            :subs="channel.subCount"
            :thumbnail="channel.authorThumbnails"
            class="pt-8"
          />
        </h1>
      </template>
      <template v-else-if="!channel && !dataRequestError">
        <div
          class="mt-8 h-screen max-h-[170px] w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
        />
        <ChannelCompactSkeletonVue class="pt-8" />
      </template>
      <TheError
        v-else-if="dataRequestError"
        :message="dataRequestError.message"
        class="items-center"
      />
      <hr class="border-t-2 dark:border-gray-400" />
      <VideosBlock
        v-if="!dataRequestError"
        :videos="videos"
        :query="id"
        :show-per-view="20"
        class="py-4"
      />
      <TheError v-else :message="dataRequestError.message" />
    </div>
  </main>
</template>
