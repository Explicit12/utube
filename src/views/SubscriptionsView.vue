<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { onBeforeMount } from "vue";
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";

  import VideosBlockVue from "@/components/VideosBlock.vue";

  import { getChannelVideos } from "@/utils/invidiousAPI";

  import { useUserData } from "@/stores/userData";

  import type { VideoInfo } from "@/utils/invidiousAPI";

  const userData = useUserData();
  const router = useRouter();

  const { subscriptions } = storeToRefs(userData);

  const { t } = useI18n();

  async function getEachChannelVideos() {
    const channelsVidos = await Promise.all(
      [...subscriptions.value].map(
        (channelId) =>
          new Promise((res) => {
            getChannelVideos(channelId).then((videos) => res(videos));
          }),
      ),
    );

    return (channelsVidos as VideoInfo[][]).reduce(
      (acc, val) => acc.concat(val),
      [],
    );
  }

  onBeforeMount(() => {
    if (!subscriptions.value.size) {
      router.replace({ name: "home" });
    }
  });
</script>

<template>
  <main class="flex flex-col justify-center px-4">
    <h1 class="pt-8 font-sans text-2xl font-bold text-gray-900">
      {{ t("headline") }}
    </h1>
    <VideosBlockVue
      :request="getEachChannelVideos"
      :show-per-view="20"
      sort-by-time
    />
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
