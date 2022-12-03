<script setup lang="ts">
  import { useI18n } from "vue-i18n";

  import TheButton from "@/components/TheButton.vue";

  defineEmits<{
    (event: "prompt", prompt: number): void;
    (event: "clickOutside"): void;
  }>();

  const { t } = useI18n();
</script>

<template>
  <div
    class="fixed inset-0 flex h-screen w-screen items-center justify-center bg-gray-900/25"
    @click="$emit('clickOutside')"
  >
    <div class="rounded-lg bg-white p-8">
      <slot name="text" />
      <div class="flex gap-2 pt-4">
        <TheButton type="secondary" @click="$emit('prompt', true)">
          {{ t("claim") }}
        </TheButton>
        <TheButton type="primary" @click="$emit('prompt', false)">
          {{ t("cancel") }}
        </TheButton>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en-US": {
    "claim": "Claim",
    "cancel": "Cancel"
  },
  "uk-UA": {
    "claim": "Підтвердити",
    "cancel": "Скасувати"
  },
  "ru-RU": {
    "claim": "Подтвердить",
    "cancel": "Отменить"
  }
}
</i18n>
