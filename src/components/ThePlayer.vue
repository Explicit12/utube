<script setup lang="ts">
  import { computed, ref } from "vue";
  import { storeToRefs } from "pinia";

  import { useUserSettings } from "@/stores/userSettings";

  import type { FormatStream } from "@/utils/invidiousAPI";

  defineProps<{
    formatStreams: FormatStream[];
  }>();

  const userSettings = useUserSettings();
  const { userLocale } = storeToRefs(userSettings);

  const ruPlyr = {
    play: "Плей",
    pause: "Пауза",
    currentTime: "Текущее время",
    duration: "Длительность",
    volume: "Громкость",
    mute: "Выключить звук",
    unmute: "Включить звук",
    enterFullscreen: "Войти в режим полного экрана",
    exitFullscreen: "Выйти из режима полного экрана",
    settings: "Настройки",
    speed: "Скорость",
    normal: "Нормальная",
    quality: "Качество",
  };

  const uaPlyr = {
    play: "Плей",
    pause: "Пуза",
    currentTime: "Поточний час",
    duration: "Триваліть",
    volume: "Гучність",
    mute: "Вимкнути звук",
    unmute: "Увімкнути звук",
    enterFullscreen: "Увійти в режим полного экрану",
    exitFullscreen: "Вийти з режиму полного экрану",
    settings: "Налаштування",
    speed: "Швидкість",
    normal: "Нормальна",
    quality: "Якість",
  };

  const plyrLocales = computed(() => {
    if (userLocale.value === "en") return {};
    if (userLocale.value === "uk") return uaPlyr;
    if (userLocale.value === "ru") return ruPlyr;

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
