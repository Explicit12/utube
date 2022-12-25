import { defineStore } from "pinia";
import {
  useLocalStorage,
  usePreferredDark,
  useBreakpoints,
  breakpointsTailwind,
} from "@vueuse/core";

export const useUserSettings = defineStore("userSettings", () => {
  const isMenuOpen = useLocalStorage(
    "isMenuOpen",
    useBreakpoints(breakpointsTailwind).greaterOrEqual("lg"),
  );
  const userLocale = useLocalStorage("userLocale", "en-US");
  const isDarkMode = useLocalStorage("darkMode", usePreferredDark());

  function toggleMenu(): void {
    isMenuOpen.value = !isMenuOpen.value;
  }

  return { isMenuOpen, toggleMenu, userLocale, isDarkMode };
});
