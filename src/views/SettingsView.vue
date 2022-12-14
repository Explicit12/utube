<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { storeToRefs } from "pinia";
  import { ref, watch } from "vue";

  import SubscriptionFileInput from "@/components/SubscriptionFileInput.vue";

  import { useUserSettings } from "@/stores/userSettings";

  const { t } = useI18n();
  const userSettings = useUserSettings();
  const { userLocale, isDarkMode } = storeToRefs(userSettings);
  const localeSelect = ref(userLocale.value);
  const darkModeForm = ref(isDarkMode.value);

  watch(localeSelect, (newValue) => {
    userLocale.value = newValue;
  });

  watch(darkModeForm, (newValue) => {
    isDarkMode.value = newValue;
  });
</script>

<template>
  <main class="px-4 pb-[58px] lg:px-16">
    <div class="mx-auto h-screen min-h-full max-w-screen-xl">
      <h1
        class="pt-8 font-sans text-2xl font-bold text-gray-900 dark:text-gray-300"
      >
        {{ t("headline") }}
      </h1>
      <section class="py-4">
        <hr />
        <h2
          for="darkMode"
          class="pt-8 pb-4 font-sans text-xl font-normal uppercase text-gray-500 dark:text-gray-300"
        >
          {{ t("darkMode.headline") }}
        </h2>
        <form class="flex gap-4">
          <div>
            <input
              id="dark-radio"
              v-model="darkModeForm"
              class="peer hidden"
              type="radio"
              name="dark-radio"
              :value="true"
            />
            <label
              class="rounded-md border-2 border-gray-900 py-2 px-4 text-center font-sans text-base font-normal text-gray-900 peer-checked:border-blue-600 dark:border-white dark:text-white"
              for="dark-radio"
            >
              {{ t("darkMode.dark") }}
            </label>
          </div>
          <div>
            <input
              id="light-radio"
              v-model="darkModeForm"
              class="peer hidden"
              type="radio"
              name="light-radio"
              :value="false"
            />
            <label
              class="rounded-md border-2 border-gray-900 py-2 px-4 text-center font-sans text-base font-normal text-gray-900 peer-checked:border-blue-600 dark:border-white dark:text-white"
              for="light-radio"
            >
              {{ t("darkMode.light") }}
            </label>
          </div>
        </form>
      </section>
      <section class="py-4">
        <hr />
        <label
          for="locales"
          class="block pt-8 pb-4 font-sans text-xl font-normal uppercase text-gray-500 dark:text-gray-300"
        >
          {{ t("language.headline") }}
        </label>
        <select
          id="locales"
          v-model="localeSelect"
          class="block w-full rounded-lg border border-gray-300 bg-white p-2 text-base text-gray-900 dark:bg-gray-900 dark:text-white"
        >
          <option value="en" :selected="userLocale === 'en-US'">
            {{ t("language.english") }}
          </option>
          <option value="uk" :selected="userLocale === 'uk-UA'">
            {{ t("language.ukrainian") }}
          </option>
          <option value="ru" :selected="userLocale === 'ru-RU'">
            {{ t("language.russian") }}
          </option>
        </select>
      </section>
      <section class="py-4">
        <hr />
        <h2
          class="pt-8 font-sans text-xl font-normal uppercase text-gray-500 dark:text-gray-300"
        >
          {{ t("subscriptions.headline") }}
        </h2>
        <SubscriptionFileInput />
      </section>
    </div>
  </main>
</template>

<i18n lang="json">
{
  "en": {
    "headline": "Settings",
    "subscriptions": {
      "headline": "Subscriptions"
    },
    "language": {
      "headline": "Language",
      "english": "English",
      "ukrainian": "????????????????????",
      "russian": "??????????????"
    },
    "darkMode": {
      "headline": "Theme",
      "dark": "Dark",
      "light": "Light"
    }
  },
  "uk": {
    "headline": "????????????????????????",
    "subscriptions": {
      "headline": "????????????????"
    },
    "language": {
      "headline": "????????",
      "english": "English",
      "ukrainian": "????????????????????",
      "russian": "??????????????"
    },
    "darkMode": {
      "headline": "????????",
      "dark": "??????????",
      "light": "????????????"
    }
  },
  "ru": {
    "headline": "??????????????????",
    "subscriptions": {
      "headline": "????????????????"
    },
    "language": {
      "headline": "????????",
      "english": "English",
      "ukrainian": "????????????????????",
      "russian": "??????????????"
    },
    "darkMode": {
      "headline": "????????",
      "dark": "????????????",
      "light": "??????????????"
    }
  }
}
</i18n>
