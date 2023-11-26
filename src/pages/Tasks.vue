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
    <input type="text" />
  </div>
  <button v-if="!addMode" @click="startAdding">+</button>
  <TaskCardAddForm v-else @add-task="addTask" @cancel-add="stopAdding" />
  <div>
    <TaskCard
      v-for="(task, index) in tasks"
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
import { mapState } from 'vuex';

export default {
  name: 'tasks-comp',
  components: { TaskCard, TaskCardAddForm },
  data() {
    return {
      addMode: false,
      selectedCategory: 'title',
      tasks: [
        {
          title: 'Task 1',
          description: 'description 1',
          date: '2023-01-01',
          state: 'pending',
        },
        {
          title: 'Task 2',
          description: 'description 2',
          date: '2023-02-01',
          state: 'completed',
        },
      ],
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
      this.tasks.push(newTask);
      this.stopAdding();
    },
    updateTask(index: number, updatedTask: any) {
      this.$store.commit(
        'updateTasks',
        this.updateTaskInArray(index, updatedTask)
      );
      console.log('updated', this.tasks);
    },
    updateTaskInArray(index: number, updatedTask: any): Array<any> {
      const newArray = [...this.tasks];
      newArray[index] = updatedTask;
      return newArray;
    },
  },
  computed: {
    ...mapState(['categories', 'tasks']),
    selectedCategory: {
      get(): string {
        return this.$store.state.categories;
      },
      set(value: string) {
        this.$store.commit('updateCategories', value);
      },
    },
    tasks: {
      get(): Array<any> {
        return this.$store.state.tasks;
      },
      set(value: Array<any>) {
        this.$store.commit('updateTasks', value);
      },
    },
  },
};
</script>
