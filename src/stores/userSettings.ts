import { defineStore } from "pinia";
import {
  useLocalStorage,
  usePreferredDark,
  useBreakpoints,
  breakpointsTailwind,
  usePreferredLanguages,
} from "@vueuse/core";

export const useUserSettings = defineStore("userSettings", () => {
  const usePreferredLanguage = usePreferredLanguages().value[0];
  const greaterOrEqualLg =
    useBreakpoints(breakpointsTailwind).greaterOrEqual("lg");

  const isMenuOpen = useLocalStorage("isMenuOpen", greaterOrEqualLg);
  const userLocale = useLocalStorage("userLocale", usePreferredLanguage);
  const isDarkMode = useLocalStorage("darkMode", usePreferredDark());

  function toggleMenu(): void {
    isMenuOpen.value = !isMenuOpen.value;
  }

  return { isMenuOpen, toggleMenu, userLocale, isDarkMode };
});
