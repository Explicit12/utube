<script setup lang="ts">
  import { ref, onBeforeMount, computed, watch } from "vue";
  import { storeToRefs } from "pinia";
  import { useI18n } from "vue-i18n";

  import SubscriptionSkeleton from "@/components/skeletonLoaders/SubscriptionsSkeleton.vue";
  import TheButton from "@/components/TheButton.vue";

  import { getChannelInfo } from "@/utils/invidiousAPI";
  import { useUserData } from "@/stores/userData";

  import type { Ref } from "vue";
  import type { ChannelInfo, ChannelId } from "@/utils/invidiousAPI";

  const initialAmoutOfChannels = 6;

  const userData = useUserData();
  const channels: Ref<Set<ChannelInfo>> = ref(new Set());
  const amoutOfChannelsToShow = ref(initialAmoutOfChannels);

  const { subscriptions } = storeToRefs(userData);

  const channelsToShow = computed<Set<ChannelInfo>>(
    () => new Set([...channels.value].slice(0, amoutOfChannelsToShow.value)),
  );

  const { t } = useI18n();

  watch(
    () => subscriptions.value.size,
    async () => {
      const deletedChannelId: ChannelId | undefined = [...channels.value].find(
        (channel) => !subscriptions.value.has(channel.authorId),
      )?.authorId;

      const addedChannelsId: ChannelId[] = [...subscriptions.value].filter(
        (id) => ![...channels.value].find((channel) => channel.authorId === id),
      );

      if (deletedChannelId) {
        channels.value = new Set(
          [...channels.value].filter(
            (channel) => channel.authorId !== deletedChannelId,
          ),
        );
      } else if (addedChannelsId.length) {
        const addedChannels: Awaited<ChannelInfo[]> = await Promise.all(
          addedChannelsId.map((id) => getChannelInfo(id)),
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
    },
  );

  onBeforeMount(() => {
    Promise.all([...subscriptions.value].map(getChannelInfo)).then(
      (channelsInfo) => {
        channels.value = new Set(channelsInfo);
      },
    );
  });
</script>

<template>
  <ul class="space-y-2 pt-6">
    <template v-if="channels.size">
      <li
        v-for="channel in channelsToShow"
        :key="channel.author"
        class="rounded-lg p-2 hover:bg-blue-50 dark:hover:bg-gray-800"
      >
        <RouterLink
          :to="{ name: 'channel', params: { id: channel.authorId } }"
          class="group flex items-center gap-2 font-sans font-normal text-gray-900 dark:text-white"
        >
          <img
            v-if="channel.authorThumbnails[0]"
            :src="channel.authorThumbnails[0].url"
            decoding="async"
            referrerpolicy="no-referrer"
            crossorigin="anonymous"
            loading="lazy"
            :alt="`${channel.author} ${t('channel-avatar-alt')}`"
            class="rounded-lg"
            width="32"
            height="32"
          />
          <div v-else class="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-800" />
          <span class="overflow-hidden text-ellipsis whitespace-nowrap">
            {{ channel.author }}
          </span>
        </RouterLink>
      </li>
    </template>

    <template v-else>
      <SubscriptionSkeleton
        v-for="n in initialAmoutOfChannels"
        :key="n"
        class="p-2"
      />
    </template>
  </ul>
  <TheButton
    v-if="channels.size && channels.size > initialAmoutOfChannels"
    type="secondary"
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
  </TheButton>
</template>

<i18n lang="json">
{
  "en": {
    "button-more": "More",
    "button-less": "Less",
    "channel-avatar-alt": "avatar"
  },
  "uk": {
    "button-more": "????????????",
    "button-less": "??????????",
    "channel-avatar-alt": "????????????"
  },
  "ru": {
    "button-more": "??????",
    "button-less": "????????????",
    "channel-avatar-alt": "????????????"
  }
}
</i18n>
