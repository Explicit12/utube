import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import type { Ref } from "vue";

export const useUserData = defineStore("userData", () => {
  const subscribtions: Ref<string[]> = useLocalStorage("subscribtions", []);

  function subscribe(channelId: string[] | string) {
    if (
      typeof channelId === "string" &&
      !subscribtions.value.includes(channelId)
    ) {
      subscribtions.value.push(channelId);
    } else if (Array.isArray(channelId)) {
      channelId.forEach((id) => {
        if (!subscribtions.value.includes(id)) subscribtions.value.push(id);
      });
    }
  }

  return { subscribtions, subscribe };
});
