<script setup lang="ts">
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();
</script>

<template>
  <div class="my-0 mx-auto max-w-screen-xl px-4">
    <h1 class="text-xl font-bold underline">{{ t("hello") }}</h1>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "hello": "hello, world!"
  },
  "uk-UA": {
    "hello": "привіт світ"
  }
}
</i18n>
