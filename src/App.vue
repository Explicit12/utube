<script setup lang="ts">
  import { RouterView } from "vue-router";
  import { storeToRefs } from "pinia";
  import {
    breakpointsTailwind,
    useBreakpoints,
    useScrollLock,
  } from "@vueuse/core";
  import { onMounted, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import dayjs from "dayjs";
  import { useRouter } from "vue-router";

  import { useUserSettings } from "@/stores/userSettings";

  import TheHeader from "@/components/TheHeader.vue";
  import SideMenu from "@/components/SideMenu.vue";

  const settings = useUserSettings();
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const { locale } = useI18n();
  const router = useRouter();

  const isBodyScrollLocked = useScrollLock(document.body);
  const isLgAndGreater = breakpoints.greaterOrEqual("lg");

  const { isMenuOpen, userLocale, isDarkMode } = storeToRefs(settings);
  const { toggleMenu } = settings;

  function toggleBodySrollLock(): void {
    if (isMenuOpen.value && !isLgAndGreater.value) {
      isBodyScrollLocked.value = true;
    } else {
      isBodyScrollLocked.value = false;
    }
  }

  function setLocales(): void {
    locale.value = userLocale.value;
    dayjs.locale(userLocale.value);
  }

  watch(isLgAndGreater, toggleBodySrollLock);
  watch(isMenuOpen, toggleBodySrollLock);
  watch(userLocale, setLocales);

  // need this to hinde menu on mobile after page update
  router.afterEach(() => {
    if (!isLgAndGreater.value) isMenuOpen.value = false;
  });

  onMounted(() => {
    toggleBodySrollLock();
    setLocales();
  });
</script>

<template>
  <div :class="{ dark: isDarkMode }">
    <TheHeader />
    <Transition name="slide-in">
      <SideMenu v-show="isMenuOpen" />
    </Transition>

    <!-- backdrop -->
    <div
      :class="{
        block: isMenuOpen || !isLgAndGreater,
        hidden: !isMenuOpen || isLgAndGreater,
      }"
      class="fixed z-10 h-full w-full bg-gray-900 opacity-25"
      @click="toggleMenu"
    />

    <RouterView
      :class="{ 'lg:pl-[252px]': isMenuOpen }"
      class="my-0 min-h-screen w-full pt-[58px] transition-[padding-left] duration-300 dark:bg-gray-900"
    />
  </div>
</template>

<style>
  .slide-in-enter-active,
  .slide-in-leave-active {
    transition: 250ms linear;
  }

  .slide-in-enter-from,
  .slide-in-leave-to {
    transform: translateX(-100%);
    transition: 250ms linear;
  }
</style>
