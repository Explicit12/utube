import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { PiniaSharedState } from "pinia-shared-state";
import VuePlyr from "vue-plyr";
import "vue-plyr/dist/vue-plyr.css";

import App from "./App.vue";
import router from "./router";

import "./assets/style.css";
import "dayjs/locale/en";
import "dayjs/locale/uk";
import "dayjs/locale/ru";

const app = createApp(App);

const pinia = createPinia();
pinia.use(PiniaSharedState({}));

const i18n = createI18n({
  locale: "uk-UA",
  fallbackLocale: "en-US",
});

app.use(pinia);
app.use(i18n);
app.use(router);

app.use(VuePlyr, {
  plyr: {},
});

app.mount("#app");
