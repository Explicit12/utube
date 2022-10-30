<script setup lang="ts">
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();
</script>

<template>
  <h1 class="text-xl font-bold underline">{{ t("hello") }}</h1>
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
