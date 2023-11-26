import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
      categories: 'title',
      tasks: [
        {
          title: 'Task 1',
          content: 'Description',
          date: '2023-01-01',
          state: 'pending',
        },
        {
          title: 'Task 2',
          content: 'Description 2',
          date: '2023-02-01',
          state: 'completed',
        },
      ],
    };
  },
  mutations: {
    updateCategories(state, value) {
      state.categories = value;
    },
    updateTasks(state, updatedTasks) {
      state.tasks = updatedTasks;
    },
  },
  plugins: [createPersistedState()],
});

export default store;
