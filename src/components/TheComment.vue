<script setup lang="ts">
  import { onBeforeMount, computed, ref } from "vue";
  import { useI18n } from "vue-i18n";

  import { IconImageArea } from "@iconify-prerendered/vue-mdi";

  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  import { pingImage } from "@/utils/invidiousAPI";
  import isElementOverflow from "@/utils/isElemenetOverflow";

  import type { ChannelId, AuthorThumbnail } from "@/utils/invidiousAPI";
  import type { Ref } from "vue";

  dayjs.extend(relativeTime);

  const props = defineProps<{
    content: string;
    author: {
      name: string;
      authorId: ChannelId;
      thumbnails: AuthorThumbnail[];
    };
    published: number;
  }>();

  const imageNotFound = ref(false);
  const { t } = useI18n();
  const showMore = ref(false);
  const commentContentRef: Ref<HTMLParagraphElement | undefined> = ref();

  const formatedDate = computed(() => {
    return dayjs.unix(props.published).fromNow();
  });

  const isContentOverflow = computed(() => {
    if (commentContentRef.value) {
      return isElementOverflow(commentContentRef.value);
    }

    return false;
  });

  onBeforeMount(() => {
    if (props.author.thumbnails[0].url) {
      // Ping image url to check whether it exists or not
      pingImage(props.author.thumbnails[0].url).catch(
        () => (imageNotFound.value = true),
      );
    }
  });
</script>

<template>
  <div class="flex gap-4">
    <div class="aspect-square max-h-[36px] min-w-[36px] max-w-[36px]">
      <img
        v-if="author.thumbnails[2].url && !imageNotFound"
        :src="author.thumbnails[2].url"
        decoding="async"
        referrerpolicy="no-referrer"
        crossorigin="anonymous"
        loading="lazy"
        :alt="`${author.name} ${t('channel-avatar-alt')}`"
        class="h-full w-full rounded-lg"
        width="32"
        height="32"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800"
      >
        <IconImageArea
          class="text-gray-500 dark:text-gray-300"
          width="32"
          height="32"
        />
      </div>
    </div>
    <div class="flex flex-col items-start gap-2">
      <div class="flex gap-2">
        <span
          class="font-sans text-base font-medium text-gray-500 dark:text-gray-300"
        >
          {{ author.name }}
        </span>
        <span
          class="font-sans text-base font-normal text-gray-500 dark:text-gray-200"
        >
          {{ formatedDate }}
        </span>
      </div>
      <p
        ref="commentContentRef"
        :class="{ 'line-clamp-3': !showMore }"
        class="font-sans text-base font-normal text-gray-900 dark:text-white"
      >
        {{ content }}
      </p>
      <button
        v-if="commentContentRef && isContentOverflow"
        class="font-sans text-base font-medium text-gray-900 dark:text-white"
        @click="showMore = !showMore"
      >
        {{ t(showMore ? "showLess" : "showMore") }}
      </button>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "alt-avatar": "Channel avatar",
    "showMore": "More",
    "showLess": "Less",
    "channel-avatar-alt": "avatar"
  },
  "uk": {
    "alt-avatar": "Аватар каналу",
    "showMore": "Більше",
    "showLess": "Менше",
    "channel-avatar-alt": "аватар"
  },
  "ru": {
    "alt-avatar": "Аватар канала",
    "showMore": "Больше",
    "showLess": "Меньше",
    "channel-avatar-alt": "аватар"
  }
}
</i18n>
