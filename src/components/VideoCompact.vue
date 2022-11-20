<script setup lang="ts">
  import { computed, ref, onBeforeMount } from "vue";
  import { useI18n } from "vue-i18n";
  import { RouterLink } from "vue-router";
  import { IconPlay } from "@iconify-prerendered/vue-mdi";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  import { pingImage } from "@/utils/invidiousAPI";
  import formatNumbers from "@/helpers/formatNumbers";

  import type { Ref } from "vue";
  import type {
    VideoThumbnail,
    ChannelId,
    VideoId,
  } from "@/utils/invidiousAPI";

  dayjs.extend(relativeTime);

  const props = defineProps<{
    name: string;
    author: { name: string; id: ChannelId };
    videoId: VideoId;
    date: number;
    views: number;
    image: VideoThumbnail[] | null;
    horizontalLayout?: boolean;
  }>();

  const imageError: Ref<boolean> = ref(false);

  const { t } = useI18n();

  const formatedViews = computed<string>(() => formatNumbers(props.views));

  const formatedDate = computed<string>(() => {
    return dayjs.unix(props.date).fromNow();
  });

  onBeforeMount(() => {
    if (props.image) {
      // Ping image url to check whether it exists or not
      pingImage(props?.image[8].url).catch(() => (imageError.value = true));
    }
  });
</script>

<template>
  <RouterLink
    :to="{ name: 'home' }"
    :class="{ 'md:flex md:gap-4': horizontalLayout }"
    class="block"
  >
    <RouterLink :to="{ name: 'home' }" @click.stop>
      <img
        v-if="image && !imageError"
        :class="{ 'md:min-w-[24rem] md:max-w-sm': horizontalLayout }"
        :src="image[3].url"
        :alt="name"
        decoding="async"
        referrerpolicy="no-referrer"
        crossorigin="anonymous"
        loading="lazy"
        class="aspect-video w-full rounded-lg object-cover"
        @error="imageError = true"
      />
      <div
        v-else
        :class="{ 'md:min-w-[24rem] md:max-w-sm': horizontalLayout }"
        class="flex aspect-video items-center justify-center rounded-lg bg-gray-200"
      >
        <IconPlay width="32" height="32" class="text-gray-400" />
      </div>
    </RouterLink>

    <div>
      <RouterLink
        :to="{ name: 'home' }"
        :class="{ 'pt-4': !horizontalLayout, 'max-md:pt-4': horizontalLayout }"
        class="block font-sans text-base font-normal text-gray-900 line-clamp-2"
      >
        {{ name }}
      </RouterLink>

      <div>
        <RouterLink
          :to="{ name: 'channel', params: { id: author.id } }"
          class="pt-2 font-sans text-sm font-normal text-gray-400 line-clamp-1 hover:underline"
          @click.stop.prevent
        >
          {{ author.name }}
        </RouterLink>
        <span class="font-sans text-sm font-normal text-gray-400">
          {{ formatedViews + " " + t("views") }}
        </span>
        <span class="pl-2 font-sans text-sm font-normal text-gray-400">
          {{ formatedDate }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>

<i18n lang="json">
{
  "en-US": {
    "views": "views"
  },
  "uk-UA": {
    "views": "переглядів"
  },
  "ru-RU": {
    "views": "просмотров"
  }
}
</i18n>
