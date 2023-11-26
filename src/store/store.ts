import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
      categories: 'title' as TaskCategory,
      searchKeyword: '',
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
  getters: {
    filteredTasks: (state) => {
      const filteredTasks = state.tasks.filter((task: Task) => {
        const categoryValue = task[state.categories].toLowerCase();
        const searchKeyword = state.searchKeyword.toLowerCase();
        return categoryValue.includes(searchKeyword);
      });
      return filteredTasks;
    },
  },
  mutations: {
    updateCategories(state, value) {
      state.categories = value;
    },
    updateTasks(state, updatedTasks) {
      state.tasks = updatedTasks;
    },
    updateSearchKeyword(state, value) {
      state.searchKeyword = value;
    },
  },

  plugins: [createPersistedState()],
});

export default store;
