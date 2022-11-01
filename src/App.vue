<script setup lang="ts">
  import { RouterView } from "vue-router";
  import { storeToRefs } from "pinia";
  import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

  import { useSettings } from "@/stores/settings";

  import TheHeader from "@/components/TheHeader.vue";
  import SideMenu from "@/components/SideMenu.vue";

  import type { Ref } from "vue";

  const settings = useSettings();
  const breakpoints = useBreakpoints(breakpointsTailwind);

  const isLgAndGreater: Ref<boolean> = breakpoints.greaterOrEqual("lg");

  const { isMenuOpen } = storeToRefs(settings);
  const { toggleMenu } = settings;
</script>

<template>
  <TheHeader />
  <Transition name="slide-in">
    <SideMenu v-show="isMenuOpen" />
  </Transition>

  <!-- backdrop -->
  <div
    @click="toggleMenu"
    :class="{ block: isMenuOpen, hidden: !isMenuOpen || isLgAndGreater }"
    class="absolute z-10 h-full w-full bg-gray-900 opacity-25"
  ></div>

  <RouterView
    tag="main"
    :class="{ 'lg:pl-[256px]': isMenuOpen }"
    class="relative pt-[106px] transition-[padding-left] duration-300"
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
