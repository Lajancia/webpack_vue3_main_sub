import { createApp, defineAsyncComponent } from "vue";
import Layout from "./Layout.vue";

const Content = defineAsyncComponent(() => import("sub1/Content"));
const Button = defineAsyncComponent(() => import("sub1/Button"));


const Remote = defineAsyncComponent(() => import("sub2/Remote"));
const Buttonsub = defineAsyncComponent(() => import("sub2/Buttonsub"));

const app = createApp(Layout);

app.component("remote-element", Remote);
app.component("buttonsub-element", Buttonsub);
app.component("content-element", Content);
app.component("button-element", Button);


app.mount("#app");
