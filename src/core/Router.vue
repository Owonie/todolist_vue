<script lang="ts">
import { Component, defineComponent } from 'vue';
import Analystics from '../pages/Analystics.vue';
import NotFound from '../pages/NotFound.vue';
import Tasks from '../pages/Tasks.vue';

const routes: Record<string, Component> = {
  '/': Tasks,
  '/analystics': Analystics,
};

export default defineComponent({
  data() {
    return {
      currentPath: window.location.pathname,
    };
  },
  computed: {
    currentView() {
      return routes[this.currentPath] || NotFound;
    },
  },
  mounted() {
    window.addEventListener('popstate', () => {
      this.currentPath = window.location.pathname;
    });
  },
});
</script>

<template>
  <a href="/">Tasks</a>
  <a href="/analystics">Analystics</a>
  <component :is="currentView" />
</template>
