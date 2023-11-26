<template>
  <header>TODO List</header>
  <div>
    <div>목록</div>
    <div>통계</div>
  </div>
  <div>
    <select v-model="selectedCategory" label="선택">
      <option value="title">제목</option>
      <option value="description">설명</option>
      <option value="state">상태</option>
      <option value="date">날짜</option>
    </select>
    <input
      type="text"
      v-model="searchKeyword"
      name="searchKeywordInput"
      @input="updateSearchKeyword"
    />
  </div>
  <button v-if="!addMode" @click="startAdding">+</button>
  <TaskCardAddForm v-else @add-task="addTask" @cancel-add="stopAdding" />
  <div>
    <TaskCard
      v-for="(task, index) in filteredTasks"
      :key="index"
      :title="task.title"
      :description="task.description"
      :date="task.date"
      :state="task.state"
      @update-task="updateTask(index, $event)"
    />
  </div>
</template>

<script lang="ts">
import TaskCard from '../components/tasks/TaskCard.vue';
import TaskCardAddForm from '../components/tasks/TaskCardAddForm.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'tasks-comp',
  components: { TaskCard, TaskCardAddForm },
  data() {
    return {
      addMode: false,
    };
  },
  methods: {
    startAdding() {
      this.addMode = true;
    },
    stopAdding() {
      this.addMode = false;
    },
    addTask(newTask: any) {
      this.$store.dispatch('addTask', newTask);
      this.stopAdding();
    },
    updateTask(index: number, updatedTask: any) {
      this.$store.dispatch('updateTask', { index, updatedTask });
    },
    updateSearchKeyword(event: Event) {
      const newKeyword = (event.target as HTMLInputElement).value;
      this.$store.commit('updateSearchKeyword', newKeyword);
    },
    setSelectedCategory(value: string): void {
      this.$store.commit('updateCategories', value);
    },
  },
  computed: {
    ...mapState(['categories', 'searchKeyword']),
    ...mapGetters(['filteredTasks']),
    selectedCategory: {
      get(): string {
        return this.$store.state.categories;
      },
      set(value: string) {
        this.$store.commit('updateCategories', value);
      },
    },
  },
};
</script>
