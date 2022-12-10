<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { storeToRefs } from "pinia";
  import { ref, watch } from "vue";

  import SubscriptionFileInput from "@/components/SubscriptionFileInput.vue";

  import { useUserSettings } from "@/stores/userSettings";

  const { t } = useI18n();
  const userSettings = useUserSettings();
  const { userLocale } = storeToRefs(userSettings);
  const localeSelect = ref(userLocale.value);

  watch(localeSelect, (newValue) => {
    userLocale.value = newValue;
  });
</script>

<template>
  <main class="px-4 lg:px-16">
    <div class="mx-auto flex w-full max-w-screen-xl flex-col justify-center">
      <h1 class="pt-8 font-sans text-2xl font-bold text-gray-900">
        {{ t("headline") }}
      </h1>
      <section class="py-4">
        <hr />
        <label
          for="locales"
          class="block pt-8 pb-4 font-sans text-xl font-normal uppercase text-gray-500"
        >
          {{ t("language.headline") }}
        </label>
        <select
          id="locales"
          v-model="localeSelect"
          class="block w-full rounded-lg border border-gray-300 bg-white p-2 text-base text-gray-900"
        >
          <option value="en-US" :selected="userLocale === 'en-US'">
            {{ t("language.english") }}
          </option>
          <option value="uk-UA" :selected="userLocale === 'uk-UA'">
            {{ t("language.ukrainian") }}
          </option>
          <option value="ru-RU" :selected="userLocale === 'ru-RU'">
            {{ t("language.russian") }}
          </option>
        </select>
      </section>
      <section class="py-4">
        <hr />
        <h2 class="pt-8 font-sans text-xl font-normal uppercase text-gray-500">
          {{ t("subscriptions.headline") }}
        </h2>
        <SubscriptionFileInput />
      </section>
    </div>
  </main>
</template>

<i18n lang="json">
{
  "en-US": {
    "headline": "Settings",
    "subscriptions": {
      "headline": "Subscriptions"
    },
    "language": {
      "headline": "Language",
      "english": "English",
      "ukrainian": "Українська",
      "russian": "Русский"
    }
  },
  "uk-UA": {
    "headline": "Налаштування",
    "subscriptions": {
      "headline": "Підписки"
    },
    "language": {
      "headline": "Мова",
      "english": "English",
      "ukrainian": "Українська",
      "russian": "Русский"
    }
  },
  "ru-RU": {
    "headline": "Настройки",
    "subscriptions": {
      "headline": "Подписки"
    },
    "language": {
      "headline": "Язык",
      "english": "English",
      "ukrainian": "Українська",
      "russian": "Русский"
    }
  }
}
</i18n>
