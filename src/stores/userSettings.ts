import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import type { Ref } from "vue";

export const useUserSettings = defineStore("userSettings", () => {
  const isMenuOpen: Ref<boolean> = useLocalStorage("isMenuOpen", true);
  const userLocale: Ref<string> = useLocalStorage("userLocale", "en-US");

  function toggleMenu(): void {
    isMenuOpen.value = !isMenuOpen.value;
  }

  return { isMenuOpen, toggleMenu, userLocale };
});
