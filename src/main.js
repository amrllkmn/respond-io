import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import "./style.css";

// Import your components
import FlowChart from "./components/FlowChart.vue";

// Create a new router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: FlowChart }],
});

// Create pinia instance
const pinia = createPinia();
// Create the Vue app instance
const app = createApp(App);

// Use the router in your Vue app
app.use(router);

app.use(pinia);

// Mount the app
app.mount("#app");
