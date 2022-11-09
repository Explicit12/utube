import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { ref } from "vue";

import type { Ref } from "vue";
import type { ChannelsId } from "@/utils/invidiousAPI";

export const useUserData = defineStore("userData", () => {
  const subscriptions: Ref<string[]> = useLocalStorage("subscriptions", []);

  function subscribeToChannel(channelId: ChannelsId[] | ChannelsId): void {
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

  function unsubscribeFromChannel(channelId: ChannelsId[] | ChannelsId): void {
    if (typeof channelId === "string") {
      subscriptions.value = subscriptions.value.filter(
        (id) => id !== channelId,
      );
    } else if (Array.isArray(channelId)) {
      subscriptions.value = subscriptions.value.filter(
        (id) => !channelId.includes(id),
      );
    }
  }

  return { subscriptions, subscribeToChannel, unsubscribeFromChannel };
});
