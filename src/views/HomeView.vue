<script setup lang="ts">
  import { watch, ref, computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { useWindowScroll } from "@vueuse/core";

  import VideoCompact from "@/components/videoCompact/VideoCompact.vue";

  import type { Ref } from "vue";

  const videos: Ref<any[]> = ref(new Array(40));
  const standardToShow: Ref<number> = ref(16);
  const videosToShow: Ref<number> = ref(standardToShow.value);

  const { y: scrollY } = useWindowScroll();

  const slicedVideos = computed(() => {
    return videos.value.slice(0, videosToShow.value);
  });

  watch(scrollY, (newValue) => {
    if (newValue === document.body.scrollHeight - window.innerHeight) {
      videosToShow.value += standardToShow.value;
    }
  });

  const { t } = useI18n();
</script>

<template>
  <main class="flex flex-col justify-center px-4">
    <h1 class="pt-8 font-sans text-2xl font-bold text-gray-900">
      {{ t("headline") }}
    </h1>
    <div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-3 lg:grid-cols-4">
      <VideoCompact
        v-for="n in slicedVideos"
        :key="n"
        name="Some very very long name of
      video, it's such long that you can't see all!"
        :author="{ name: 'author name', link: 'string' }"
        :views="5_220_024"
        :date="123412"
        :image="'https://images.unsplash.com/photo-1667325688507-6e2e670bd140?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'"
      />
    </div>
  </main>
</template>

<i18n lang="json">
{
  "en-US": {
    "headline": "Popular"
  },
  "uk-UA": {
    "headline": "Популярне"
  },
  "ru-RU": {
    "headline": "Популярное"
  }
}
</i18n>
