import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

import { Quasar, Notify } from "quasar";
import quasarLang from "quasar/lang/en-US";
import quasarIconSet from "quasar/icon-set/material-icons";

import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";

const pinia = createPinia();
const app = createApp(App);

app.use(Quasar, {
  plugins: { Notify },
  lang: quasarLang,
  iconSet: quasarIconSet,
});
app.use(pinia);
app.mount("#app");
