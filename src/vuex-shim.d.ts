import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  interface State {
    categories: string;
    tasks: Array<any>;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
