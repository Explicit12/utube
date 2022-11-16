<script setup lang="ts">
  import { onBeforeMount, ref, computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { RouterLink } from "vue-router";
  import { storeToRefs } from "pinia";
  import { IconImageArea } from "@iconify-prerendered/vue-mdi";

  import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
  import SecondaryButton from "@/components/buttons/SecondaryButton.vue";

  import { pingImage } from "@/utils/invidiousAPI";
  import { useUserData } from "@/stores/userData";
  import formatNumbers from "@/helpers/formatNumbers";

  import type { Ref } from "vue";
  import type { AuthorThumbnails, ChannelsId } from "@/utils/invidiousAPI";

  const props = defineProps<{
    name: string;
    subs: number;
    channelsId: ChannelsId;
    thumbnail: AuthorThumbnails;
  }>();

  const { t } = useI18n();
  const userData = useUserData();

  const { subscribeToChannel, unsubscribeFromChannel } = userData;
  const { subscriptions } = storeToRefs(userData);

  const imageError: Ref<boolean> = ref(false);

  const formatedSubs = computed<string>(() => formatNumbers(props.subs));

  onBeforeMount(() => {
    if (props.thumbnail) {
      // Ping image url to check whether it exists or not
      pingImage(props.thumbnail[0].url).catch(() => (imageError.value = true));
    }
  });
</script>

<template>
  <RouterLink
    :to="{ name: 'channel', params: { id: channelsId } }"
    class="flex justify-between gap-4"
  >
    <div class="aspect-square max-h-[56px] min-w-[56px] max-w-[56px]">
      <img
        v-if="thumbnail && !imageError"
        :src="thumbnail[3].url"
        decoding="async"
        referrerpolicy="no-referrer"
        crossorigin="anonymous"
        loading="lazy"
        :alt="t('alt-avatar')"
        class="h-full w-full rounded-lg"
        width="32"
        height="32"
      />
      <div
        v-else
        class="flex h-full w-full items-center justify-center rounded-lg bg-gray-200"
      >
        <IconImageArea class="text-gray-400" width="32" height="32" />
      </div>
    </div>
    <div class="w-full overflow-hidden">
      <p class="font-sans text-base font-semibold text-gray-900 line-clamp-1">
        {{ name }}
      </p>
      <p class="min-w-max pt-2 font-sans text-sm text-gray-400">
        {{ formatedSubs + " " + t("subscriptions") }}
      </p>
    </div>
    <PrimaryButton
      v-if="!subscriptions.has(channelsId)"
      class="self-start"
      @click.stop.prevent="subscribeToChannel(channelsId)"
    >
      {{ t("subscribe") }}
    </PrimaryButton>
    <SecondaryButton
      v-else
      class="self-start"
      @click.stop.prevent="unsubscribeFromChannel(channelsId)"
    >
      {{ t("unsubscribe") }}
    </SecondaryButton>
  </RouterLink>
</template>

<i18n lang="json">
{
  "en-US": {
    "alt-avatar": "Channel avatar",
    "subscriptions": "Subs",
    "subscribe": "Subscribe",
    "unsubscribe": "Unsubscribe"
  },
  "uk-UA": {
    "alt-avatar": "Аватар каналу",
    "subscriptions": "Підписчиків",
    "subscribe": "Підписатися",
    "unsubscribe": "Відписатися"
  },
  "ru-RU": {
    "alt-avatar": "Аватар канала",
    "subscriptions": "Подписчиков",
    "subscribe": "Подписаться",
    "unsubscribe": "Отписаться"
  }
}
</i18n>
