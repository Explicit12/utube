import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import router from "./router";

import "./assets/style.css";
import "dayjs/locale/en";
import "dayjs/locale/uk";
import "dayjs/locale/ru";

const app = createApp(App);

app.use(createPinia());
app.use(
  createI18n({
    locale: "uk-UA",
    fallbackLocale: "en-US",
  }),
);
app.use(router);

app.mount("#app");
