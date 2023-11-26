import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  interface State {
    categories: string;
    tasks: Array<any>;
    searchKeyword: string;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
