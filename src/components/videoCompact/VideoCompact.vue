<script setup lang="ts">
  import { computed, ref, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { RouterLink } from "vue-router";
  import { IconPlay } from "@iconify-prerendered/vue-mdi";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  import { pingImage } from "@/utils/invidiousAPI";

  import type { Ref } from "vue";
  import type { VideoThumbnails } from "@/utils/invidiousAPI";

  dayjs.extend(relativeTime);

  const props = defineProps<{
    name: string;
    author: { name: string; id: string };
    date: number;
    views: number;
    image: VideoThumbnails | null;
  }>();

  const imageError: Ref<boolean> = ref(false);

  const { t } = useI18n();

  const formatedViews = computed<string>(() => {
    const views: number = props.views;

    if (Math.abs(views) <= 999) {
      return String(Math.sign(views) * Math.abs(views));
    } else if (Math.abs(views) > 999 && Math.abs(views) < 1_000_000) {
      return String(Number((Math.abs(views) / 1000).toFixed(1))) + "k";
    } else {
      return String(Number((Math.abs(views) / 1_000_000).toFixed(1))) + "M";
    }
  });

  const formatedDate = computed<string>(() => {
    return dayjs.unix(props.date).fromNow();
  });

  onMounted(() => {
    if (props.image) {
      // Ping image url to check whether it exists or not
      pingImage(props.image[8].url).catch(() => (imageError.value = true));
    }
  });
</script>

<template>
  <div>
    <RouterLink :to="{ name: 'home' }">
      <img
        v-if="image && !imageError"
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
        class="flex aspect-video items-center justify-center rounded-lg bg-gray-200"
      >
        <IconPlay width="32" height="32" class="text-gray-400" />
      </div>
    </RouterLink>

    <RouterLink
      :to="{ name: 'home' }"
      class="block pt-4 font-sans text-base font-normal text-gray-900 line-clamp-2"
    >
      {{ name }}
    </RouterLink>

    <div>
      <RouterLink
        :to="{ name: 'home' }"
        class="pt-2 font-sans text-sm font-normal text-gray-400 line-clamp-1 hover:underline"
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
