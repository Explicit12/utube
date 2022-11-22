<script setup lang="ts">
  import { computed, ref } from "vue";
  import { useI18n } from "vue-i18n";

  import type { Ref } from "vue";

  const props = defineProps<{ discriptionHtml: string }>();

  const showMore: Ref<boolean> = ref(false);
  const { t } = useI18n();

  const styledDisctiptionHtml = computed(() => {
    return props.discriptionHtml
      .split("\n")
      .filter((text) => text !== "")
      .map((text) => {
        return (
          "<p class='font-sans text-base font-normal text-gray-900'>" +
          text.replace(
            /<a /gi,
            "<a class='text-blue-600 cursor-pointer underline' ",
          ) +
          "</p>"
        );
      })
      .join("");
  });
</script>

<template>
  <div>
    <h3 class="font-sans text-xl font-normal uppercase text-gray-400">
      {{ t("headline") }}
    </h3>

    <!-- eslint-disable vue/no-v-html -->
    <div
      :class="{ 'line-clamp-3': !showMore }"
      class="pt-2"
      v-html="styledDisctiptionHtml"
    />
    <button
      class="font-sans text-base font-medium text-gray-900"
      @click="showMore = !showMore"
    >
      {{ t(showMore ? "showLess" : "showMore") }}
    </button>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "headline": "Discription",
    "showMore": "More",
    "showLess": "Less"
  },
  "uk-UA": {
    "headline": "Опис",
    "showMore": "Більше",
    "showLess": "Менше"
  },
  "ru-RU": {
    "headline": "Описание",
    "showMore": "Больше",
    "showLess": "Меньше"
  }
}
</i18n>
