<script setup lang="ts">
  import { computed, ref } from "vue";
  import { storeToRefs } from "pinia";

  import { useUserSettings } from "@/stores/userSettings";
  import playerLocales from "./playerLocales";

  import type { FormatStream } from "@/utils/invidiousAPI";

  defineProps<{
    formatStreams: FormatStream[];
  }>();

  const userSettings = useUserSettings();
  const { userLocale } = storeToRefs(userSettings);

  const plyrLocales = computed(() => {
    if (userLocale.value === "uk") return playerLocales.ua;
    if (userLocale.value === "ru") return playerLocales.ru;

    return {};
  });

  const videoPlayerOptions = ref({
    autoplay: true,
    ratio: "16:9",
    i18n: plyrLocales,
  });
</script>

<template>
  <vue-plyr :options="videoPlayerOptions">
    <video controls playsinline style="--plyr-color-main: #2563eb">
      <source size="720" :src="formatStreams[1].url" type="video/mp4" />
      <source size="1080" :src="formatStreams[2].url" type="video/mp4" />
    </video>
  </vue-plyr>
</template>
