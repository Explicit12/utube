import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import type { Ref } from "vue";

export const useUserData = defineStore("userData", () => {
  const subscriptions: Ref<string[]> = useLocalStorage("subscriptions", []);

  function subscribe(channelId: string[] | string) {
    if (
      typeof channelId === "string" &&
      !subscriptions.value.includes(channelId)
    ) {
      subscriptions.value.push(channelId);
    } else if (Array.isArray(channelId)) {
      channelId.forEach((id) => {
        if (!subscriptions.value.includes(id)) subscriptions.value.push(id);
      });
    }
  }

  return { subscriptions, subscribe };
});
