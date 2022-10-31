import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import type { Ref } from "vue";

export const useSettings = defineStore("settings", () => {
  const isMenuOpen: Ref<boolean> = useLocalStorage("isMenuOpen", true);

  function toggleMenu(): void {
    isMenuOpen.value = !isMenuOpen.value;
  }

  return { isMenuOpen, toggleMenu };
});
