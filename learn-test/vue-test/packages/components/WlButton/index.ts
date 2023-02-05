import { App } from "vue";
import Comp from "./src/index.vue";

Comp.install = (app: App) => {
  app.component(Comp.name, Comp);
};

export default Comp;
