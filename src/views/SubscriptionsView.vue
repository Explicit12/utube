<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { onBeforeMount, ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";

  import VideoCompact from "@/components/VideoCompact.vue";
  import VideoCompactSkeleton from "@/components/skeletonLoaders/VideoCompactSkeleton.vue";
  import TheError from "@/components/TheError.vue";
  import SpinnerLoader from "@/components/SpinnerLoader.vue";

  import { useOnScrollBottom } from "@/composables/useOnBottomScroll";
  import { getChannelsVideos } from "@/utils/invidiousAPI";

  import { useUserData } from "@/stores/userData";

  import type { ShortVideoInfo } from "@/utils/invidiousAPI";
  import type { Ref } from "vue";

  const userData = useUserData();
  const router = useRouter();

  const newVideos: Ref<ShortVideoInfo[]> = ref([]);
  const requestError: Ref<string> = ref("");
  const isSpinnerVisible: Ref<boolean> = ref(false);
  const isVideosLoaded: Ref<boolean> = ref(false);
  const standardToShow: Ref<number> = ref(20);
  const videosToShow: Ref<number> = ref(standardToShow.value);
  const { subscriptions } = storeToRefs(userData);

  const { t } = useI18n();

  const newestVidoes = computed<ShortVideoInfo[]>(() => {
    return [...newVideos.value].slice().sort((a, b) => {
      return b.published - a.published;
    });
  });

  const slicedVideos = computed<ShortVideoInfo[]>(() => {
    return newestVidoes.value.slice(0, videosToShow.value);
  });

  useOnScrollBottom(() => {
    if (videosToShow.value >= newVideos.value.length) return;
    isSpinnerVisible.value = true;
    setTimeout(() => {
      videosToShow.value += isVideosLoaded.value ? standardToShow.value : 0;
      isSpinnerVisible.value = false;
    }, 500);
  });

  onBeforeMount(() => {
    if (subscriptions.value.size) {
      Promise.all(
        [...subscriptions.value].map((channelId) => {
          return new Promise((res) => {
            getChannelsVideos(channelId).then((videos) => res(videos));
          });
        }),
      )
        .then((videos) => {
          const arrVideos = videos as ShortVideoInfo[][];
          newVideos.value = arrVideos.reduce((acc, val) => acc.concat(val), []);
          isVideosLoaded.value = true;
        })
        .catch((err) => (requestError.value = err.message));
    } else {
      router.replace({ name: "home" });
    }
  });
</script>

<template>
  <main class="flex flex-col justify-center px-4">
    <template v-if="!requestError">
      <h1 class="pt-8 font-sans text-2xl font-bold text-gray-900">
        {{ t("headline") }}
      </h1>
      <div
        class="grid grid-cols-1 gap-4 py-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <template v-if="isVideosLoaded">
          <VideoCompact
            v-for="video in slicedVideos"
            :key="video.videoId"
            :name="video.title"
            :author="{ name: video.author, id: video.authorId }"
            :views="video.viewCount"
            :date="video.published"
            :image="video.videoThumbnails"
            :video-id="video.videoId"
          />
        </template>
        <template v-else>
          <VideoCompactSkeleton v-for="n in standardToShow" :key="n" />
        </template>
      </div>
    </template>
    <TheError
      v-else
      :message="requestError"
      class="h-[calc(100vh_-_138px)] items-center"
    />
    <SpinnerLoader v-if="isSpinnerVisible" class="my-4" />
  </main>
</template>

<i18n lang="json">
{
  "en-US": {
    "headline": "Sbubscriptions"
  },
  "uk-UA": {
    "headline": "Підписки"
  },
  "ru-RU": {
    "headline": "Подписки"
  }
}
</i18n>
