<template>
  <header>TODO List</header>
  <div>
    <div>목록</div>
    <div>통계</div>
  </div>
  <div>
    <button>제목(드랍다운)</button>
    <input type="text" />
  </div>
  <button v-if="!addMode" @click="startAdding">+</button>
  <TaskCardAddForm v-else @add-task="addTask" @cancel-add="stopAdding" />
  <div>
    <TaskCard
      v-for="(task, index) in tasks"
      :key="index"
      :title="task.title"
      :content="task.content"
      :date="task.date"
      :state="task.state"
      @update-task="updateTask(index, $event)"
    />
  </div>
</template>

<script lang="ts">
import TaskCard from '../components/tasks/TaskCard.vue';
import TaskCardAddForm from '../components/tasks/TaskCardAddForm.vue';
export default {
  name: 'tasks-comp',
  components: { TaskCard, TaskCardAddForm },
  data() {
    return {
      addMode: false,
      tasks: [
        {
          title: 'Task 1',
          content: 'Content 1',
          date: '2023-01-01',
          state: 'pending',
        },
        {
          title: 'Task 2',
          content: 'Content 2',
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
      this.tasks[index] = updatedTask;
      console.log('updated', updatedTask.title);
    },
  },
};
</script>
