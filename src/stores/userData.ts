import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import type { Ref } from "vue";
import type { ChannelId } from "@/utils/invidiousAPI";

export const useUserData = defineStore("userData", () => {
  const subscriptions: Ref<Set<ChannelId>> = useLocalStorage(
    "subscriptions",
    new Set<ChannelId>(),
  );

  function subscribeToChannel(channelId: ChannelId[] | ChannelId): void {
    if (typeof channelId === "string" && !subscriptions.value.has(channelId)) {
      subscriptions.value.add(channelId);
    } else if (Array.isArray(channelId)) {
      channelId.forEach((id) => {
        if (!subscriptions.value.has(id)) subscriptions.value.add(id);
      });
    }
  }

  function unsubscribeFromChannel(channelId: ChannelId[] | ChannelId): void {
    if (typeof channelId === "string") {
      subscriptions.value.delete(channelId);
    } else if (Array.isArray(channelId)) {
      subscriptions.value.forEach((id, i, set) => set.delete(id));
    }
  }

  return { subscriptions, subscribeToChannel, unsubscribeFromChannel };
});
