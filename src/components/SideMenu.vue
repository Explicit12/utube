<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { useRoute, RouterLink } from "vue-router";
  import { defineAsyncComponent } from "vue";
  import { storeToRefs } from "pinia";

  import { useUserData } from "@/stores/userData";

  const SubscriptionList = defineAsyncComponent(
    () => import("@/components/SubscriptionList.vue"),
  );

  const SubscriptionFileInput = defineAsyncComponent(
    () => import("@/components/SubscriptionFileInput.vue"),
  );

  const userData = useUserData();
  const route = useRoute();
  const { t } = useI18n();

  const { subscriptions } = storeToRefs(userData);
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 top-[58px] z-20 inline w-64 space-y-8 overflow-y-scroll border-y-0 border-r-2 border-gray-200 bg-white px-6 py-8 dark:border-gray-400 dark:bg-gray-900"
  >
    <nav>
      <h2
        class="font-sans text-xl font-normal uppercase text-gray-500 dark:text-gray-300"
      >
        {{ t("navigation.headline") }}
      </h2>
      <ul class="space-y-2 pt-6">
        <li>
          <RouterLink
            :to="{ name: 'home' }"
            :class="{ 'bg-blue-50 dark:bg-gray-800': route.name === 'home' }"
            class="block rounded-lg p-2 font-sans text-base font-normal text-gray-900 transition-colors hover:bg-blue-50 dark:text-white dark:hover:bg-gray-800"
          >
            {{ t("navigation.links.home") }}
          </RouterLink>
        </li>
        <li v-if="subscriptions.size">
          <RouterLink
            :to="{ name: 'subscriptions' }"
            :class="{
              'bg-blue-50 dark:bg-gray-800': route.name === 'subscriptions',
            }"
            class="block rounded-lg p-2 font-sans text-base font-normal text-gray-900 transition-colors hover:bg-blue-50 dark:text-white dark:hover:bg-gray-800"
          >
            {{ t("navigation.links.subscriptions") }}
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div>
      <h2
        class="font-sans text-xl font-normal uppercase text-gray-500 dark:text-gray-300"
      >
        {{ t("subscriptions.headline") }}
      </h2>

      <SubscriptionList v-if="subscriptions.size" />

      <SubscriptionFileInput v-else />
    </div>

    <div>
      <h2
        class="font-sans text-xl font-normal uppercase text-gray-500 dark:text-gray-300"
      >
        {{ t("info.headline") }}
      </h2>
      <ul class="space-y-4 pt-6">
        <li>
          <a
            href="https://github.com/Explicit12/utube"
            class="font-sans font-normal text-gray-500 hover:underline hover:underline-offset-2 dark:text-gray-300"
          >
            {{ t("info.github") }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<i18n lang="json">
{
  "en-US": {
    "navigation": {
      "headline": "Navigation",
      "links": {
        "home": "Home",
        "subscriptions": "Subscriptions"
      }
    },
    "subscriptions": {
      "headline": "subscriptions"
    },
    "info": {
      "headline": "Info",
      "github": "GitHub"
    }
  },
  "uk-UA": {
    "navigation": {
      "headline": "Навігація",
      "links": {
        "home": "Головна",
        "subscriptions": "Підписки"
      }
    },
    "subscriptions": {
      "headline": "Підписки"
    },
    "info": {
      "headline": "Інформація",
      "github": "GitHub"
    }
  },
  "ru-RU": {
    "navigation": {
      "headline": "Навигация",
      "links": {
        "home": "Главная",
        "subscriptions": "Подписки"
      }
    },
    "subscriptions": {
      "headline": "Подписки"
    },
    "info": {
      "headline": "Информация",
      "github": "GitHub"
    }
  }
}
</i18n>
