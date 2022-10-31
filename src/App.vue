<script setup lang="ts">
  import { RouterView } from "vue-router";
  import { storeToRefs } from "pinia";

  import { useSettings } from "@/stores/settings";

  import TheHeader from "@/components/TheHeader.vue";
  import SideMenu from "@/components/SideMenu.vue";

  const settings = useSettings();
  const { isMenuOpen } = storeToRefs(settings);

  const { toggleMenu } = settings;
</script>

<template>
  <TheHeader @menu-click="toggleMenu" />
  <Transition name="slide-in">
    <SideMenu v-show="isMenuOpen" />
  </Transition>
  <RouterView />
</template>

<style>
  .slide-in-enter-active,
  .slide-in-leave-active {
    transition: 250ms ease-in-out;
  }

  .slide-in-enter-from,
  .slide-in-leave-to {
    transform: translateX(-100%);
  }
</style>
