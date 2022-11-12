import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import type { Ref } from "vue";
import type { ChannelsId } from "@/utils/invidiousAPI";

export const useUserData = defineStore("userData", () => {
  const subscriptions: Ref<Set<string>> = useLocalStorage(
    "subscriptions",
    new Set<string>(),
  );

  function subscribeToChannel(channelId: ChannelsId[] | ChannelsId): void {
    if (typeof channelId === "string" && !subscriptions.value.has(channelId)) {
      subscriptions.value.add(channelId);
    } else if (Array.isArray(channelId)) {
      channelId.forEach((id) => {
        if (!subscriptions.value.has(id)) subscriptions.value.add(id);
      });
    }
  }

  function unsubscribeFromChannel(channelId: ChannelsId[] | ChannelsId): void {
    if (typeof channelId === "string") {
      subscriptions.value.delete(channelId);
    } else if (Array.isArray(channelId)) {
      subscriptions.value.forEach((id, i, set) => set.delete(id));
    }
  }

  return { subscriptions, subscribeToChannel, unsubscribeFromChannel };
});
