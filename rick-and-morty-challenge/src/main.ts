import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { Quasar } from "quasar";
import quasarLang from "quasar/lang/en-US";
import quasarIconSet from "quasar/icon-set/material-icons";

// Import Quasar and icon styles
import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";

const app = createApp(App);

app.use(Quasar, {
  plugins: {}, // add Quasar plugins here as needed
  lang: quasarLang,
  iconSet: quasarIconSet,
});
app.mount("#app");
