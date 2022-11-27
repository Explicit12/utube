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
    class="fixed inset-y-0 left-0 top-[58px] z-20 inline w-64 space-y-8 overflow-y-scroll border-r-2 border-gray-200 bg-white px-6 py-8"
  >
    <nav>
      <h2 class="font-sans text-xl font-normal uppercase text-gray-400">
        {{ t("navigation.headline") }}
      </h2>
      <ul class="space-y-2 pt-6">
        <li>
          <RouterLink
            :to="{ name: 'home' }"
            :class="{ 'bg-blue-50': route.name === 'home' }"
            class="block rounded-lg p-2 font-sans text-base font-normal transition-colors"
          >
            {{ t("navigation.links.home") }}
          </RouterLink>
        </li>
        <li v-if="subscriptions.size">
          <RouterLink
            :to="{ name: 'subscriptions' }"
            :class="{ 'bg-blue-50': route.name === 'subscriptions' }"
            class="block rounded-lg p-2 font-sans text-base font-normal transition-colors"
          >
            {{ t("navigation.links.subscriptions") }}
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div>
      <h2 class="font-sans text-xl font-normal uppercase text-gray-400">
        {{ t("subscriptions.headline") }}
      </h2>

      <SubscriptionList v-if="subscriptions.size" />

      <SubscriptionFileInput v-else />
    </div>

    <div>
      <h2 class="font-sans text-xl font-normal uppercase text-gray-400">
        {{ t("info.headline") }}
      </h2>
      <ul class="space-y-4 pt-6">
        <li>
          <RouterLink
            :to="{ name: 'home' }"
            class="font-sans font-normal text-gray-400 hover:underline hover:underline-offset-2"
          >
            {{ t("info.license") }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'home' }"
            class="font-sans font-normal text-gray-400 hover:underline hover:underline-offset-2"
          >
            {{ t("info.about") }}
          </RouterLink>
        </li>
        <li>
          <a
            href="#"
            class="font-sans font-normal text-gray-400 hover:underline hover:underline-offset-2"
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
        "subscriptions": "subscriptions"
      }
    },
    "subscriptions": {
      "headline": "subscriptions"
    },
    "info": {
      "headline": "Info",
      "license": "MIT license",
      "about": "About",
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
      "license": "MIT ліцензія",
      "about": "Про проект",
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
      "headline": "subscriptions"
    },
    "info": {
      "headline": "Информация",
      "license": "MIT license",
      "about": "О проекте",
      "github": "GitHub"
    }
  }
}
</i18n>
