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

  import type { Ref } from "vue";

  const { t } = useI18n();
  const userSettings = useUserSettings();
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const router = useRouter();
  const route = useRoute();

  const isMobileSearch: Ref<boolean> = ref(false);
  const isSmAndSmaller: Ref<boolean> = breakpoints.smallerOrEqual("sm");
  const searchInput: Ref<string> = ref("");

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
    class="border-b-1 fixed z-20 flex min-h-[106px] w-screen items-center justify-between gap-11 border-b-2 border-gray-200 bg-white px-4 py-8"
  >
    <div class="flex items-center gap-8">
      <button @click="toggleMenu">
        <IconMenu width="24" height="24" class="text-grey-900" />
      </button>

      <RouterLink v-show="!isMobileSearch" :to="{ name: 'home' }">
        <TheLogo />
      </RouterLink>
    </div>

    <span
      :class="{ flex: isMobileSearch, hidden: !isMobileSearch }"
      class="relative w-full max-w-screen-sm items-center md:flex"
    >
      <IconMagnify
        width="24"
        height="24"
        class="text-grey-900 absolute left-2 z-10"
        @click.prevent="routeToSearch"
      />
      <input
        v-model="searchInput"
        type="text"
        :placeholder="t('search-placeholder')"
        class="placeholder:text-grey-400 text-grey-900 w-full max-w-screen-sm rounded-lg bg-blue-50 p-2 pl-10 font-sans text-base font-normal placeholder:font-sans focus-visible:outline-none focus-visible:outline-blue-200"
        @keypress.prevent.enter="routeToSearch"
      />
    </span>

    <nav class="flex gap-4">
      <component
        :is="isMobileSearch ? IconClose : IconMagnify"
        width="24"
        height="24"
        class="text-grey-900 hover:cursor-pointer md:hidden"
        @click="isMobileSearch = !isMobileSearch"
      />

      <RouterLink :to="{ name: 'home' }">
        <IconCog
          width="24"
          height="24"
          class="text-grey-900 hover:cursor-pointer"
        />
      </RouterLink>
    </nav>
  </header>
</template>

<i18n lang="json">
{
  "en-US": {
    "search-placeholder": "I'm searching..."
  },
  "uk-UA": {
    "search-placeholder": "Я шукаю..."
  },
  "ru-RU": {
    "search-placeholder": "Я ищу..."
  }
}
</i18n>
