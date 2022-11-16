import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/subscriptions",
      name: "subscriptions",
      component: () => import("@/views/SubscriptionsView.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/SearchView.vue"),
      props: (route) => ({ searchQuery: route.query.search_query }),
      beforeEnter: (to) => {
        if (!to.query.search_query) router.push({ name: "home" });
      },
    },
    {
      path: "/channel/:id",
      name: "channel",
      component: () => import("@/views/ChannelView.vue"),
      props: true,
    },
  ],
});

export default router;
