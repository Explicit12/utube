<script setup lang="ts">
  import { ref, onBeforeMount, computed, watch } from "vue";
  import { storeToRefs } from "pinia";
  import { useI18n } from "vue-i18n";

  import SubscriptionSkeleton from "@/components/skeletonLoaders/SubscriptionsSkeleton.vue";
  import SecondaryButton from "./buttons/SecondaryButton.vue";

  import { getShortChannelInfo, type ChannelsId } from "@/utils/invidiousAPI";
  import { useUserData } from "@/stores/userData";

  import type { Ref } from "vue";
  import type { ShortChannelInfo } from "@/utils/invidiousAPI";

  const initialAmoutOfChannels = 6;

  const userData = useUserData();
  const channels: Ref<Set<ShortChannelInfo>> = ref(new Set());
  const amoutOfChannelsToShow: Ref<number> = ref(initialAmoutOfChannels);

  const { subscriptions } = storeToRefs(userData);

  const channelsToShow = computed<Set<ShortChannelInfo>>(
    () => new Set([...channels.value].slice(0, amoutOfChannelsToShow.value)),
  );

  const { t } = useI18n();

  watch(subscriptions, async () => {
    const deletedChannelId: ChannelsId | undefined = [...channels.value].find(
      (channel) => !subscriptions.value.has(channel.authorId),
    )?.authorId;

    const addedChannelsId: ChannelsId[] = [...subscriptions.value].filter(
      (id) => ![...channels.value].find((channel) => channel.authorId === id),
    );

    if (deletedChannelId) {
      channels.value = new Set(
        [...channels.value].filter(
          (channel) => channel.authorId !== deletedChannelId,
        ),
      );
    } else if (addedChannelsId.length) {
      const addedChannels: Awaited<ShortChannelInfo[]> = await Promise.all(
        addedChannelsId.map((id) => getShortChannelInfo(id)),
      );
      addedChannels.forEach((newChannel) => {
        if (
          ![...channels.value].find(
            (channel) => channel.authorId === newChannel.authorId,
          )
        ) {
          channels.value.add(newChannel);
        }
      });
    }
  });

  onBeforeMount(() => {
    Promise.all([...subscriptions.value].map(getShortChannelInfo)).then(
      (channelsInfo) => {
        channels.value = new Set(channelsInfo);
      },
    );
  });
</script>

<template>
  <ul class="space-y-5 pt-6">
    <template v-if="channels.size">
      <li v-for="channel in channelsToShow" :key="channel.author">
        <RouterLink
          :to="{ name: 'channel', params: { id: channel.authorId } }"
          class="flex items-center gap-2 font-sans font-normal text-gray-900"
        >
          <img
            v-if="channel.authorThumbnails[0]"
            :src="channel.authorThumbnails[0].url"
            decoding="async"
            referrerpolicy="no-referrer"
            crossorigin="anonymous"
            loading="lazy"
            alt="channel avatar"
            class="rounded-lg"
            width="32"
            height="32"
          />
          <div v-else class="h-8 w-8 rounded-lg bg-gray-200" />
          <span class="overflow-hidden text-ellipsis whitespace-nowrap">
            {{ channel.author }}
          </span>
        </RouterLink>
      </li>
    </template>

    <template v-else>
      <SubscriptionSkeleton v-for="n in initialAmoutOfChannels" :key="n" />
    </template>
  </ul>
  <SecondaryButton
    v-if="channels.size && channels.size > initialAmoutOfChannels"
    class="mt-4 w-full"
    @click="
      amoutOfChannelsToShow =
        amoutOfChannelsToShow === initialAmoutOfChannels
          ? subscriptions.size
          : initialAmoutOfChannels
    "
  >
    {{
      amoutOfChannelsToShow <= initialAmoutOfChannels
        ? t("button-more")
        : t("button-less")
    }}
  </SecondaryButton>
</template>

<i18n lang="json">
{
  "en-US": {
    "button-more": "More",
    "button-less": "Less"
  },
  "uk-UA": {
    "button-more": "Більше",
    "button-less": "Менше"
  },
  "ru-RU": {
    "button-more": "Ещё",
    "button-less": "Меньше"
  }
}
</i18n>