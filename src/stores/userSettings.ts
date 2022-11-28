import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useUserSettings = defineStore("userSettings", () => {
  const isMenuOpen = useLocalStorage("isMenuOpen", true);
  const userLocale = useLocalStorage("userLocale", "en-US");

  function toggleMenu(): void {
    isMenuOpen.value = !isMenuOpen.value;
  }

  return { isMenuOpen, toggleMenu, userLocale };
});
