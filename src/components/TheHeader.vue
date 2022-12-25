<script setup lang="ts">
  import { ref, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import { RouterLink, useRouter, useRoute } from "vue-router";
  import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
  import {
    IconMagnify,
    IconCog,
    IconClose,
    IconMenu,
  } from "@iconify-prerendered/vue-mdi";

  import TheLogo from "@/components/TheLogo.vue";

  import { useUserSettings } from "@/stores/userSettings";

  const { t } = useI18n();
  const userSettings = useUserSettings();
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const router = useRouter();
  const route = useRoute();

  const isMobileSearch = ref(false);
  const isSmAndSmaller = breakpoints.smallerOrEqual("sm");
  const searchInput = ref("");

  const { toggleMenu } = userSettings;

  function routeToSearch() {
    if (searchInput.value) {
      router.push({
        name: "search",
        query: { search_query: searchInput.value },
      });
    }
  }

  watch(isSmAndSmaller, (newValue) => {
    if (newValue) isMobileSearch.value = false;
  });

  watch(
    () => route.query,
    () => {
      if (typeof route.query.search_query === "string") {
        searchInput.value = route.query.search_query;
      }
    },
  );
</script>

<template>
  <header
    class="border-b-1 fixed z-30 flex min-h-[58px] w-screen items-center justify-between gap-11 border-b-2 border-gray-200 bg-white px-4 py-2 dark:border-gray-400 dark:bg-gray-900"
  >
    <div class="flex items-center gap-8">
      <button :aria-label="t('menu-button-label')" @click="toggleMenu">
        <IconMenu
          width="24"
          height="24"
          class="text-grey-900 dark:text-white"
        />
      </button>

      <RouterLink
        v-show="!isMobileSearch"
        :aria-label="t('main-link-label')"
        :to="{ name: 'home' }"
      >
        <TheLogo />
      </RouterLink>
    </div>

    <form
      :class="{ flex: isMobileSearch, hidden: !isMobileSearch }"
      class="relative w-full max-w-screen-sm items-center md:flex"
    >
      <IconMagnify
        width="24"
        height="24"
        class="text-grey-900 absolute left-2 z-10 dark:text-white"
        @click.prevent="routeToSearch"
      />
      <label for="searchInput" class="sr-only">
        {{ t("menu-input-label") }}
      </label>
      <input
        id="searchInput"
        v-model="searchInput"
        type="text"
        :placeholder="t('search-placeholder')"
        class="placeholder:text-grey-500 text-grey-900 w-full rounded-lg bg-blue-50 p-2 pl-10 font-sans text-base font-normal placeholder:font-sans focus-visible:outline-none focus-visible:outline-blue-200 dark:border-2 dark:border-white dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-300 dark:focus-visible:border-white dark:focus-visible:outline-gray-800"
        @keypress.prevent.enter="routeToSearch"
      />
    </form>

    <nav class="flex gap-4">
      <component
        :is="isMobileSearch ? IconClose : IconMagnify"
        width="24"
        height="24"
        class="text-grey-900 hover:cursor-pointer dark:text-white md:hidden"
        @click="isMobileSearch = !isMobileSearch"
      />

      <RouterLink
        :aria-label="t('settings-link-label')"
        :to="{ name: 'settings' }"
      >
        <IconCog
          width="24"
          height="24"
          class="text-grey-900 transition-transform hover:rotate-90 hover:cursor-pointer dark:text-white"
        />
      </RouterLink>
    </nav>
  </header>
</template>

<i18n lang="json">
{
  "en": {
    "menu-input-label": "Search field",
    "search-placeholder": "I'm searching...",
    "menu-button-label": "Navigation",
    "main-link-label": "The main",
    "settings-link-label": "To settings"
  },
  "uk": {
    "menu-input-label": "Поле пошуку",
    "search-placeholder": "Я шукаю...",
    "menu-button-label": "Навігація",
    "main-link-label": "Головна",
    "settings-link-label": "Налаштування"
  },
  "ru": {
    "menu-input-label": "Поле поиска",
    "search-placeholder": "Я ищу...",
    "menu-button-label": "Навигация",
    "main-link-label": "Главная",
    "settings-link-label": "Настройки"
  }
}
</i18n>
