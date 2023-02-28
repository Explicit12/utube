import { describe, test, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia, storeToRefs } from "pinia";

import { useUserData } from "@/stores/userData";

describe("User Data store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should subscribe to a channel", () => {
    const userData = useUserData();
    const { subscriptions } = storeToRefs(userData);

    userData.subscribeToChannel("channel1");
    expect(subscriptions.value.has("channel1")).toBe(true);
  });

  test("should unsubscribe from a channel", () => {
    const userData = useUserData();
    const { subscriptions } = storeToRefs(userData);

    userData.subscribeToChannel("channel1");
    userData.unsubscribeFromChannel("channel1");
    expect(subscriptions.value.has("channel1")).toBe(false);
  });

  test("should subscribe to multiple channels", () => {
    const userData = useUserData();
    const { subscriptions } = storeToRefs(userData);

    userData.subscribeToChannel(["channel1", "channel2"]);
    expect(subscriptions.value.has("channel1")).toBe(true);
    expect(subscriptions.value.has("channel2")).toBe(true);
  });

  test("should unsubscribe from multiple channels", () => {
    const userData = useUserData();
    const { subscriptions } = storeToRefs(userData);

    userData.subscribeToChannel(["channel1", "channel2"]);
    userData.unsubscribeFromChannel(["channel1", "channel2"]);
    expect(subscriptions.value.has("channel1")).toBe(false);
    expect(subscriptions.value.has("channel2")).toBe(false);
  });
});
