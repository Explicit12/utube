<script setup lang="ts">
  import { ref, onBeforeMount, computed, defineAsyncComponent } from "vue";
  import { useRouter } from "vue-router";
  import { useI18n } from "vue-i18n";
  import { storeToRefs } from "pinia";
  import { IconThumbDown } from "@iconify-prerendered/vue-mdi";
  import { onBeforeRouteUpdate, useRoute } from "vue-router";

  import VideosBlock from "@/components/VideosBlock.vue";
  import ChannelCompact from "@/components/ChannelCompact.vue";
  import ChannelCompactSkeleton from "@/components/skeletonLoaders/ChannelCompactSkeleton.vue";
  import VideoDiscriptionSkeletonLoader from "@/components/skeletonLoaders/VideoDiscriptionSkeletonLoader.vue";

  import formatNumbers from "@/helpers/formatNumbers";

  import {
    getChannelInfo,
    getRecommendedVideos,
    getVideo,
    getVideoDiscription,
    getVideoFormatStreams,
    getComments,
  } from "@/utils/invidiousAPI";
  import { useUserSettings } from "@/stores/userSettings";

  import type {
    VideoId,
    VideoInfo,
    ChannelId,
    ChannelInfo,
    FormatStream,
    Comment,
  } from "@/utils/invidiousAPI";
  import type { Ref } from "vue";
  import type { AxiosError } from "axios";

  const TheError = defineAsyncComponent(
    () => import("@/components/TheError.vue"),
  );

  const TheCommment = defineAsyncComponent(
    () => import("@/components/TheCommment.vue"),
  );

  const VideoDiscription = defineAsyncComponent(
    () => import("@/components/VideoDiscription.vue"),
  );

  const props = defineProps<{ watch: VideoId; authorId: ChannelId }>();

  const recommendedVideos: Ref<VideoInfo[]> = ref([]);
  const videoFormatStreams: Ref<FormatStream[]> = ref([]);
  const videoComments: Ref<Comment[]> = ref([]);
  const watchVideo: Ref<VideoInfo | undefined> = ref();
  const authorInfo: Ref<ChannelInfo | undefined> = ref();
  const videoDiscription: Ref<string> = ref("");
  const requestError: Ref<AxiosError | undefined> = ref();
  const userSettings = useUserSettings();
  const { isMenuOpen } = storeToRefs(userSettings);
  const { t } = useI18n();
  const route = useRoute();
  const router = useRouter();

  const videoPlayerOptions = ref({
    autoplay: true,
    ratio: "16:9",
    i18n: {},
  });

  const formatedLikes = computed<string>(() => {
    if (watchVideo.value) return formatNumbers(watchVideo.value.likeCount);
    else return "";
  });

  const formatedViews = computed<string>(() => {
    if (watchVideo.value) return formatNumbers(watchVideo.value.viewCount);
    else return "";
  });

  // used like a key attribute for player container
  const watchQuery = computed<string>(() => {
    if (typeof route.query.watch === "string") {
      return route.query.watch;
    } else {
      return "";
    }
  });

  async function getData(videoId: VideoId, authorId: ChannelId) {
    try {
      const formatStreams = await getVideoFormatStreams(videoId);
      videoFormatStreams.value = formatStreams;

      const video = await getVideo(videoId);
      watchVideo.value = video;

      const author = await getChannelInfo(authorId);
      authorInfo.value = author;

      const discription = await getVideoDiscription(videoId);
      videoDiscription.value = discription;

      const recommended = await getRecommendedVideos(videoId);
      const recommendedVideosInfo = await Promise.all(
        recommended.slice(0, 20).map((video) => getVideo(video.videoId)),
      );
      recommendedVideos.value = recommendedVideosInfo;

      const comments = await getComments(videoId);
      videoComments.value = comments;
    } catch (error) {
      console.error(error);
      requestError.value = error as AxiosError;
    }
  }

  onBeforeRouteUpdate((to) => {
    if (
      typeof to.query.watch !== "string" ||
      typeof to.params.authorId !== "string"
    ) {
      return false;
    }

    watchVideo.value = undefined;
    authorInfo.value = undefined;
    videoDiscription.value = "";
    videoFormatStreams.value = [];
    recommendedVideos.value = [];
    videoComments.value = [];

    getData(to.query.watch, to.params.authorId).then(() => {
      if (requestError.value && requestError.value.response?.status === 404) {
        router.replace({ name: "notFound" });
      }
    });

    window.scrollTo({ top: 0 });
  });

  onBeforeMount(() => {
    getData(props.watch, props.authorId).then(() => {
      if (requestError.value && requestError.value.response?.status === 404) {
        router.replace({ name: "notFound" });
      }
    });
  });
</script>

<template>
  <main
    class="grid-col-1 grid gap-6 px-4"
    :class="{ 'xl:grid-cols-3': !isMenuOpen, '2xl:grid-cols-3': isMenuOpen }"
  >
    <template v-if="!requestError">
      <div
        :class="{ 'xl:col-span-2': !isMenuOpen, '2xl:col-span-2': isMenuOpen }"
        class="flex flex-col gap-4"
      >
        <div :key="watchQuery" class="mt-8">
          <vue-plyr
            v-if="videoFormatStreams.length"
            :options="videoPlayerOptions"
          >
            <video controls playsinline style="--plyr-color-main: #2563eb">
              <source
                size="720"
                :src="videoFormatStreams[1].url"
                type="video/mp4"
              />
              <source
                size="1080"
                :src="videoFormatStreams[2].url"
                type="video/mp4"
              />
            </video>
          </vue-plyr>
          <div
            v-else
            class="aspect-video animate-pulse rounded-lg bg-gray-200"
          />
        </div>
        <div v-if="watchVideo">
          <h2 class="font-sans text-lg font-bold text-gray-900 line-clamp-1">
            {{ watchVideo.title }}
          </h2>
          <div class="flex justify-between pt-2">
            <span class="font-sans text-base font-normal text-gray-400">
              {{ formatedViews }} {{ t("views") }}
            </span>
            <div class="flex gap-4">
              <span
                class="flex items-center gap-2 font-sans text-base font-normal text-gray-400"
              >
                {{ formatedLikes }}
                <span class="rotate-180">
                  <IconThumbDown width="24" height="24" clss="text-gray-400" />
                </span>
              </span>
              <span
                class="flex items-center gap-2 font-sans text-base font-normal text-gray-400"
              >
                <IconThumbDown width="24" height="24" clss="text-gray-900" />
              </span>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="h-4 w-4/5 rounded-sm bg-gray-400" />
        </div>
        <hr />
        <RouterLink
          v-if="authorInfo"
          :to="{ name: 'channel', params: { id: authorInfo.authorId } }"
        >
          <ChannelCompact
            :name="authorInfo.author"
            :subs="authorInfo.subCount"
            :channels-id="authorInfo.authorId"
            :thumbnail="authorInfo.authorThumbnails"
          />
        </RouterLink>
        <ChannelCompactSkeleton v-else />
        <hr />
        <template v-if="videoDiscription !== '<p></p>'">
          <VideoDiscription
            v-if="videoDiscription"
            :discription-html="videoDiscription"
          />
          <VideoDiscriptionSkeletonLoader v-else />
          <hr />
        </template>
        <div v-if="videoComments.length" class="flex flex-col gap-4 pb-8">
          <h3
            class="pt-8 font-sans text-xl font-normal uppercase text-gray-400"
          >
            {{ t("comments.headline") }}
          </h3>
          <TheCommment
            v-for="comment in videoComments"
            :key="comment.commentId"
            :author="{
              name: comment.author,
              authorId: comment.authorId,
              thumbnails: comment.authorThumbnails,
            }"
            :content="comment.content"
            :published="comment.published"
          />
        </div>
      </div>
      <div>
        <h3 class="pt-8 font-sans text-xl font-normal uppercase text-gray-400">
          {{ t("recommendations.headline") }}
        </h3>
        <VideosBlock
          class="py-2"
          :show-per-view="10"
          :videos="recommendedVideos"
          :horizontal-layout="true"
        />
      </div>
    </template>
    <TheError
      v-else
      :message="requestError.message"
      class="col-span-full row-span-full"
    />
  </main>
</template>

<i18n lang="json">
{
  "en-US": {
    "views": "views",
    "recommendations": {
      "headline": "Recommended"
    },
    "comments": {
      "headline": "Comments"
    }
  },
  "uk-UA": {
    "views": "переглядів",
    "recommendations": {
      "headline": "Рекомендації"
    },
    "comments": {
      "headline": "Коментарі"
    }
  },
  "ru-RU": {
    "views": "просмотров",
    "recommendations": {
      "headline": "Рекомендации"
    },
    "comments": {
      "headline": "Коментарии"
    }
  }
}
</i18n>