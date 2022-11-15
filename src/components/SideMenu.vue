<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { useRoute, RouterLink } from "vue-router";
  import { useDropZone } from "@vueuse/core";
  import { ref, computed, onBeforeMount, watch } from "vue";
  import { storeToRefs } from "pinia";

  import { useUserData } from "@/stores/userData";

  import SecondaryButton from "@/components/buttons/SecondaryButton.vue";
  import SubscriptionSkeleton from "@/components/skeletonLoaders/SubscriptionsSkeleton.vue";
  import TheError from "@/components/TheError.vue";

  import CSVtoJSON from "@/helpers/CSVtoJSON";
  import { getShortChannelInfo } from "@/utils/invidiousAPI";

  import type { Ref } from "vue";
  import type { ShortChannelInfo, ChannelsId } from "@/utils/invidiousAPI";

  const userData = useUserData();
  const route = useRoute();
  const { t } = useI18n();

  const { subscribeToChannel } = userData;
  const { subscriptions } = storeToRefs(userData);
  const isChannelsInfoLoaded: Ref<boolean> = ref(false);
  const fileError: Ref<string> = ref("");
  const channels: Ref<ShortChannelInfo[]> = ref([]);
  const standardToShow: Ref<number> = ref(6);
  const channelsToShow: Ref<number> = ref(standardToShow.value);
  const importDropZone = ref<HTMLDivElement>();
  const requestError: Ref<string> = ref("");

  async function importDropZoneHandler(file: File[] | null): Promise<void> {
    if (file && file[0].type === "text/csv") {
      fileError.value = "";
      const channelsIds = await CSVtoJSON(file[0]);
      channelsIds?.forEach((id) => subscribeToChannel(id["Channel Id"]));
    } else {
      fileError.value = new Error("Wrong file type").message;
    }
  }

  async function importInputHandler(event: Event | null): Promise<void> {
    const element = event?.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList[0].type === "text/csv") {
      fileError.value = "";
      const channelsIds = await CSVtoJSON(fileList[0]);
      channelsIds?.forEach((id) => subscribeToChannel(id["Channel Id"]));
    } else {
      fileError.value = new Error("Wrong file type").message;
    }
  }

  async function updateChannels(id: ChannelsId): Promise<void> {
    try {
      isChannelsInfoLoaded.value = false;
      if (!channels.value.find((channel) => channel.authorId === id)) {
        const channelInfo = await getShortChannelInfo(id);
        channels.value.push(channelInfo);
      }
      isChannelsInfoLoaded.value = true;
    } catch (error) {
      const message = (error as Error).message;
      requestError.value = message;
    }
  }

  watch(
    subscriptions,
    () => {
      channels.value = [];
      subscriptions.value.forEach(updateChannels);
    },
    { deep: true },
  );

  useDropZone(importDropZone, importDropZoneHandler);

  const slicedChannels = computed<ShortChannelInfo[]>(() => {
    return channels.value.slice(0, channelsToShow.value);
  });

  onBeforeMount(() => subscriptions.value.forEach(updateChannels));
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 top-[58px] z-20 inline w-64 space-y-8 overflow-y-scroll border-r-2 border-gray-200 bg-white px-6 py-8"
  >
    <nav>
      <h2 class="font-sans text-xl font-normal uppercase text-gray-400">
        {{ t("navigation.headline") }}
      </h2>
      <ul class="space-y-2 pt-6">
        <li>
          <RouterLink
            :to="{ name: 'home' }"
            :class="{ 'bg-blue-50': route.name === 'home' }"
            class="block rounded-lg p-2 font-sans text-base font-normal transition-colors"
          >
            {{ t("navigation.links.home") }}
          </RouterLink>
        </li>
        <li v-if="subscriptions.size">
          <RouterLink
            :to="{ name: 'subscriptions' }"
            :class="{ 'bg-blue-50': route.name === 'subscriptions' }"
            class="block rounded-lg p-2 font-sans text-base font-normal transition-colors"
          >
            {{ t("navigation.links.subscriptions") }}
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div>
      <h2 class="font-sans text-xl font-normal uppercase text-gray-400">
        {{ t("subscriptions.headline") }}
      </h2>

      <template v-if="subscriptions.size">
        <ul class="space-y-5 pt-6">
          <template v-if="isChannelsInfoLoaded && !requestError">
            <li v-for="channel in slicedChannels" :key="channel.author">
              <RouterLink
                :to="{ name: 'home' }"
                class="flex items-center gap-2 font-sans font-normal text-gray-900"
              >
                <img
                  v-if="channel.authorThumbnails[0]"
                  :src="channel.authorThumbnails[0].url"
                  decoding="async"
                  referrerpolicy="no-referrer"
                  crossorigin="anonymous"
                  loading="lazy"
                  :alt="t('subscriptions.alt-avatar')"
                  class="rounded-lg"
                  width="32"
                  height="32"
                />
                <div v-else class="h-8 w-8 rounded-lg bg-gray-200" />
                <span class="overflow-hidden text-ellipsis whitespace-nowrap">
                  {{ channel.author }}
                </span>
              </RouterLink>
            </li>
          </template>

          <template v-else>
            <SubscriptionSkeleton v-for="n in standardToShow" :key="n" />
          </template>
        </ul>

        <SecondaryButton
          v-if="subscriptions.size > standardToShow && channels.length"
          class="mt-4 w-full"
          @click="
            channelsToShow =
              channelsToShow <= standardToShow
                ? subscriptions.size
                : standardToShow
          "
        >
          {{
            channelsToShow <= standardToShow
              ? t("subscriptions.button-more")
              : t("subscriptions.button-less")
          }}
        </SecondaryButton>
      </template>

      <template v-else>
        <div
          ref="importDropZone"
          class="mt-6 flex h-64 w-full items-center justify-center rounded-lg border-4 border-dashed border-blue-600 p-4 text-center"
        >
          {{ t("subscriptions.drop-zone") }}
        </div>
        <input
          type="file"
          class="mt-4 block w-full font-sans text-base font-normal text-gray-900 file:block file:w-full file:rounded-lg file:border-2 file:border-transparent file:bg-blue-50 file:py-2 file:px-4 hover:cursor-pointer file:hover:cursor-pointer"
          @change="importInputHandler"
        />
        <TheError v-if="fileError" :message="fileError" class="h-fit p-2" />
      </template>
    </div>

    <div>
      <h2 class="font-sans text-xl font-normal uppercase text-gray-400">
        {{ t("info.headline") }}
      </h2>
      <ul class="space-y-4 pt-6">
        <li>
          <RouterLink
            :to="{ name: 'home' }"
            class="font-sans font-normal text-gray-400 hover:underline hover:underline-offset-2"
          >
            {{ t("info.license") }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'home' }"
            class="font-sans font-normal text-gray-400 hover:underline hover:underline-offset-2"
          >
            {{ t("info.about") }}
          </RouterLink>
        </li>
        <li>
          <a
            href="#"
            class="font-sans font-normal text-gray-400 hover:underline hover:underline-offset-2"
          >
            {{ t("info.github") }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<i18n lang="json">
{
  "en-US": {
    "navigation": {
      "headline": "Navigation",
      "links": {
        "home": "Home",
        "subscriptions": "subscriptions"
      }
    },
    "subscriptions": {
      "headline": "subscriptions",
      "button-more": "More",
      "button-less": "Less",
      "alt-avatar": "Channel avatar",
      "drop-zone": "Drop subscriptions.csv file here"
    },
    "info": {
      "headline": "Info",
      "license": "MIT license",
      "about": "About",
      "github": "GitHub"
    }
  },
  "uk-UA": {
    "navigation": {
      "headline": "Навігація",
      "links": {
        "home": "Головна",
        "subscriptions": "Підписки"
      }
    },
    "subscriptions": {
      "headline": "Підписки",
      "button-more": "Більше",
      "button-less": "Менше",
      "alt-avatar": "Аватар каналу",
      "drop-zone": "Перетягніть сюди subscriptions.csv файл"
    },
    "info": {
      "headline": "Інформація",
      "license": "MIT ліцензія",
      "about": "Про проект",
      "github": "GitHub"
    }
  },
  "ru-RU": {
    "navigation": {
      "header": "Навигация",
      "links": {
        "home": "Главная",
        "subscriptions": "Подписки"
      }
    },
    "subscriptions": {
      "headline": "subscriptions",
      "button-more": "Ещё",
      "button-less": "Меньше",
      "alt-avatar": "Аватар канала",
      "drop-zone": "Перетащите subscriptions.csv файл сюда"
    },
    "info": {
      "headline": "Информация",
      "license": "MIT license",
      "about": "О проекте",
      "github": "GitHub"
    }
  }
}
</i18n>
