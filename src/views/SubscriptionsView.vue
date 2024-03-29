<script setup lang="ts">
  import { ref, defineAsyncComponent } from "vue";
  import { useI18n } from "vue-i18n";
  import { onBeforeMount } from "vue";
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";

  import VideosBlockVue from "@/components/VideosBlock.vue";

  import { getChannelVideos } from "@/utils/invidiousAPI";

  import { useUserData } from "@/stores/userData";

  import type { Ref } from "vue";
  import type { VideoInfo } from "@/utils/invidiousAPI";
  import type { AxiosError } from "axios";

  const TheError = defineAsyncComponent(
    () => import("@/components/TheError.vue"),
  );

  const userData = useUserData();
  const router = useRouter();

  const { subscriptions } = storeToRefs(userData);
  const { t } = useI18n();
  const videos: Ref<VideoInfo[]> = ref([]);
  const requestError: Ref<AxiosError | undefined> = ref();

  async function getEachChannelVideos(): Promise<void> {
    try {
      const channelsVideos = await Promise.all(
        [...subscriptions.value].map(
          (channelId) =>
            new Promise((res) => {
              getChannelVideos(channelId).then((videos) => res(videos));
            }),
        ),
      );

      const flatChannelsVideos = (channelsVideos as VideoInfo[][]).reduce(
        (acc, val) => acc.concat(val),
        [],
      );

      videos.value = flatChannelsVideos;
    } catch (error) {
      requestError.value = error as AxiosError;
    }
  }

  onBeforeMount(() => {
    if (!subscriptions.value.size) {
      router.replace({ name: "home" });
    }

    getEachChannelVideos();
  });
</script>

<template>
  <main>
    <div class="flex flex-col justify-center px-4 lg:px-16">
      <h1
        class="pt-8 font-sans text-2xl font-bold text-gray-900 dark:text-white"
      >
        {{ t("headline") }}
      </h1>
      <VideosBlockVue
        v-if="!requestError"
        :videos="videos"
        :show-per-view="20"
        sort-by-time
        class="py-4"
      />
      <TheError v-else :message="requestError.message" />
    </div>
  </main>
</template>

<i18n lang="json">
{
  "en": {
    "headline": "Sbubscriptions"
  },
  "uk": {
    "headline": "Підписки"
  },
  "ru": {
    "headline": "Подписки"
  }
}
</i18n>
