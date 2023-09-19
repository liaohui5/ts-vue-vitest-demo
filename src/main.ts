import { createApp } from "vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import { setupElementPlus } from "./plugins/element";
import App from "./App.vue";

// https://github.com/necolas/normalize.css
import "normalize.css";

// https://github.com/rstacruz/nprogress
import "nprogress/nprogress.css";

// https://fontawesome.com.cn/
import "@/assets/fontawesome-free-5.15.4-web/css/all.min.css";

// global scss
import "./assets/scss/global.scss";

const app = createApp(App);

setupRouter(app);
setupStore(app);
setupElementPlus(app);

app.mount("#app");
