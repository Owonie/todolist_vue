<template>
  <div class="task-card">
    <form class="task-card-editmode" @submit="submitChanges">
      <input type="text" v-model="editedTitle" @keyup.enter="submitChanges" />
      <textarea v-model="editedContent" @keyup.enter="submitChanges"></textarea>
      <input type="text" v-model="editedDate" @keyup.enter="submitChanges" />
      <select v-model="editedState">
        <option value="unstarted">진행전</option>
        <option value="pending">진행중</option>
        <option value="completed">완료</option>
      </select>
      <button type="submit">Submit</button>
      <button type="button" @click="cancelChanges">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'task-card-add-form',
  data() {
    return {
      editedTitle: '',
      editedContent: '',
      editedDate: '',
      editedState: '',
    };
  },
  watch: {
    title(newTitle) {
      this.editedTitle = newTitle;
    },
    content(newContent) {
      this.editedContent = newContent;
    },
    date(newDate) {
      this.editedDate = newDate;
    },
    state(newState) {
      this.editedState = newState;
    },
  },
  methods: {
    submitChanges() {
      this.$emit('add-task', {
        title: this.editedTitle,
        content: this.editedContent,
        date: this.editedDate,
        state: this.editedState,
      });
    },
    cancelChanges() {
      this.$emit('cancel-add');
    },
  },
};
</script>
