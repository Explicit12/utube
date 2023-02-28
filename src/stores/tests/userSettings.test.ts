import { describe, test, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia, storeToRefs } from "pinia";
import {
  usePreferredDark,
  useBreakpoints,
  breakpointsTailwind,
} from "@vueuse/core";

import { useUserSettings } from "@/stores/userSettings";

describe("useUserSettings", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("toggles menu correctly", () => {
    const userSettings = useUserSettings();
    const { isMenuOpen } = storeToRefs(userSettings);

    expect(isMenuOpen.value).toBe(false);
    userSettings.toggleMenu();
    expect(isMenuOpen.value).toBe(true);
    userSettings.toggleMenu();
    expect(isMenuOpen.value).toBe(false);
  });

  test("defaults to user's preferred language", () => {
    const userSettings = useUserSettings();
    const { userLocale } = storeToRefs(userSettings);

    expect(userLocale.value).toBe(
      window.navigator.language.toLowerCase().substring(0, 2),
    );
  });

  test("defaults to dark mode preference", () => {
    const userSettings = useUserSettings();
    const { isDarkMode } = storeToRefs(userSettings);
    const usePreferredDarkTheme = usePreferredDark();

    expect(isDarkMode.value).toBe(usePreferredDarkTheme.value);
  });

  test("defaults to greater or equal to lg breakpoint for menu", () => {
    const userSettings = useUserSettings();
    const { isMenuOpen } = storeToRefs(userSettings);
    const isLgOrGreater =
      useBreakpoints(breakpointsTailwind).greaterOrEqual("lg");

    expect(isMenuOpen.value).toBe(isLgOrGreater.value);
  });
});
