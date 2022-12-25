import { defineStore } from "pinia";
import {
  useLocalStorage,
  usePreferredDark,
  useBreakpoints,
  breakpointsTailwind,
  usePreferredLanguages,
} from "@vueuse/core";

export const useUserSettings = defineStore("userSettings", () => {
  const isMenuOpen = useLocalStorage(
    "isMenuOpen",
    useBreakpoints(breakpointsTailwind).greaterOrEqual("lg"),
  );
  const userLocale = useLocalStorage(
    "userLocale",
    usePreferredLanguages().value[0] || "en",
  );
  const isDarkMode = useLocalStorage("darkMode", usePreferredDark());

  function toggleMenu(): void {
    isMenuOpen.value = !isMenuOpen.value;
  }

  return { isMenuOpen, toggleMenu, userLocale, isDarkMode };
});
