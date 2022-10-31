<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";
  import { useDropZone } from "@vueuse/core";
  import { ref, computed } from "vue";
  import SecondaryButton from "@/components/buttons/SecondaryButton.vue";

  import type { Ref, ComputedRef } from "vue";

  // TODO: Change to real data
  const channels: Ref<any[]> = ref(new Array(0));
  const standardToShow: Ref<number> = ref(6);
  const channelsToShow: Ref<number> = ref(standardToShow.value);
  const importDropZoneRef = ref<HTMLDivElement>();

  function importDropZoneHandler(file: File[] | null): void {
    if (file) {
      console.log(file[0].type);
    }
  }

  function importInputHandler(event: Event | null): void {
    const element = event?.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log(fileList);
    }
  }

  const route = useRoute();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOverDropZone } = useDropZone(
    importDropZoneRef,
    importDropZoneHandler,
  );
  const { t } = useI18n();

  // TODO: Remove any type
  const slicedChannels: ComputedRef<any[]> = computed(() => {
    return channels.value.slice(0, channelsToShow.value);
  });
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 top-[106px] inline w-64 space-y-8 overflow-y-scroll border-r-2 border-gray-200 px-6 py-8"
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
        <li>
          <RouterLink
            :to="{ name: 'home' }"
            :class="{ 'bg-blue-50': route.name === 'subscribtions' }"
            class="block rounded-lg p-2 font-sans text-base font-normal transition-colors"
          >
            {{ t("navigation.links.subscribtions") }}
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div>
      <h2 class="font-sans text-xl font-normal uppercase text-gray-400">
        {{ t("subscribtions.headline") }}
      </h2>

      <template v-if="slicedChannels.length">
        <ul class="space-y-5 pt-6">
          <li v-for="n in slicedChannels" :key="n">
            <RouterLink
              :to="{ name: 'home' }"
              class="flex items-center gap-2 font-sans font-normal text-gray-900"
            >
              <!-- TODO: Take data from api -->
              <!-- <img src="#" :alt="t('subscribtions.alt-avatar')" /> -->
              <div class="h-8 w-8 rounded-full bg-gray-200" />
              {{ "Channel Name" }}
            </RouterLink>
          </li>
        </ul>

        <SecondaryButton
          v-if="channels.length > standardToShow"
          @click="
            channelsToShow =
              channelsToShow <= standardToShow
                ? channels.length
                : standardToShow
          "
          class="mt-4 w-full"
        >
          {{
            channelsToShow <= standardToShow
              ? t("subscribtions.button-more")
              : t("subscribtions.button-less")
          }}
        </SecondaryButton>
      </template>

      <template v-else>
        <div
          ref="importDropZoneRef"
          class="mt-6 flex h-64 w-full items-center justify-center rounded-lg border-4 border-dashed border-blue-600 p-4 text-center"
        >
          {{ t("subscribtions.drop-zone") }}
        </div>
        <input
          type="file"
          @change="importInputHandler"
          class="mt-4 block w-full font-sans text-base font-normal text-gray-900 file:block file:w-full file:rounded-lg file:border-2 file:border-transparent file:bg-blue-50 file:py-2 file:px-4"
        />
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
            {{ t("info.license") }}
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
        "subscribtions": "Subscribtions"
      }
    },
    "subscribtions": {
      "headline": "Subscribtions",
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
        "subscribtions": "Підписки"
      }
    },
    "subscribtions": {
      "headline": "Subscribtions",
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
        "subscribtions": "Подписки"
      }
    },
    "subscribtions": {
      "headline": "Subscribtions",
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
