<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { IconAlertCircleOutline } from "@iconify-prerendered/vue-mdi";

  defineProps<{ message: string }>();

  const { t } = useI18n();
</script>

<template>
  <div
    class="mt-4 flex w-full flex-col items-center justify-center self-center rounded-lg border-8 border-dashed border-orange-400 p-4 text-center"
  >
    <div class="flex gap-2">
      <IconAlertCircleOutline
        class="text-gray-900 dark:text-white"
        width="32"
        height="32"
      />
      <h1 class="font-sans text-xl font-bold text-gray-900 dark:text-white">
        {{ t("error") }}
      </h1>
    </div>
    <p
      class="pt-2 font-sans text-base font-normal text-gray-900 dark:text-white"
    >
      {{ message }}
    </p>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "error": "Error"
  },
  "uk": {
    "error": "Помилка"
  },
  "ru": {
    "error": "Ошибка"
  }
}
</i18n>
