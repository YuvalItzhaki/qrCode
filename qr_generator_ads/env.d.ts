/// <reference types="vite/client" />
declare module "*.vue" {
  //This is a fix for the warnings in the IDE for imports , currently IDS can't recognize Vue files
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
