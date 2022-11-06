import { watch, computed } from "vue";
import { useWindowScroll } from "@vueuse/core";

import type { ComputedRef } from "vue";

export function useOnScrollBottom(callback: () => void): {
  isScrolledToBottom: ComputedRef<boolean>;
} {
  const { y: scrollY } = useWindowScroll();

  const isScrolledToBottom = computed(
    () => scrollY.value === document.body.scrollHeight - window.innerHeight,
  );

  watch(scrollY, () => {
    if (isScrolledToBottom.value) callback();
  });

  return { isScrolledToBottom };
}
