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

  import { useSettings } from "@/stores/userSettings";

  import TheHeader from "@/components/TheHeader.vue";
  import SideMenu from "@/components/SideMenu.vue";

  import type { Ref } from "vue";

  const settings = useSettings();
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const { locale } = useI18n();

  const isBodyScrollLocked: Ref<boolean> = useScrollLock(document.body);
  const isLgAndGreater: Ref<boolean> = breakpoints.greaterOrEqual("lg");

  const { isMenuOpen } = storeToRefs(settings);
  const { toggleMenu } = settings;

  function toggleBodySrollLock() {
    if (isMenuOpen.value && !isLgAndGreater.value) {
      isBodyScrollLocked.value = true;
    } else {
      isBodyScrollLocked.value = false;
    }
  }

  watch(isLgAndGreater, toggleBodySrollLock);
  watch(isMenuOpen, toggleBodySrollLock);

  onMounted(() => {
    toggleBodySrollLock();

    switch (locale.value) {
      case "uk-UA":
        dayjs.locale("uk");
        break;
      case "en-US":
        dayjs.locale("en");
        break;
      case "ru-RU":
        dayjs.locale("ru");
        break;
    }
  });
</script>

<template>
  <TheHeader />
  <Transition name="slide-in">
    <SideMenu v-show="isMenuOpen" />
  </Transition>

  <!-- backdrop -->
  <div
    @click="toggleMenu"
    :class="{
      block: isMenuOpen || !isLgAndGreater,
      hidden: !isMenuOpen || isLgAndGreater,
    }"
    class="fixed z-10 h-full w-full bg-gray-900 opacity-25"
  />

  <RouterView
    :class="{ 'lg:pl-[272px]': isMenuOpen }"
    class="relative my-0 mx-auto max-w-screen-2xl pt-[106px] transition-[padding-left] duration-300"
  />
</template>

<style>
  .slide-in-enter-active,
  .slide-in-leave-active {
    transition: 300ms ease-in-out;
  }

  .slide-in-enter-from,
  .slide-in-leave-to {
    transform: translateX(-100%);
  }
</style>
