<template>
  <div class="task-card" @click="startEditing">
    <div v-if="!editMode" class="task-card-normal">
      <h2>{{ editedTitle }}</h2>
      <div>{{ editedContent }}</div>
      <div>{{ editedDate }}</div>
      <div>{{ editedState }}</div>
    </div>
    <form v-else class="task-card-editmode" @submit="submitChanges">
      <input type="text" v-model="editedTitle" @keyup.enter="submitChanges" />
      <textarea v-model="editedContent" @keyup.enter="submitChanges"></textarea>
      <input type="text" v-model="editedDate" @keyup.enter="submitChanges" />
      <select v-model="editedState">
        <option value="unstarted">진행전</option>
        <option value="pending">진행중</option>
        <option value="completed">완료</option>
      </select>
      <button type="submit">Submit</button>
      <button type="button" @click="stopEditing">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'task-card',
  props: {
    title: String,
    content: String,
    date: String,
    state: String,
  },
  data() {
    return {
      editMode: false,
      editedTitle: this.title,
      editedContent: this.content,
      editedDate: this.date,
      editedState: this.state,
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
    startEditing() {
      this.editMode = true;
    },
    stopEditing() {
      this.editMode = false;
    },
    submitChanges() {
      this.$emit('update-task', {
        title: this.editedTitle,
        content: this.editedContent,
        date: this.editedDate,
        state: this.editedState,
      });
      this.stopEditing();
    },
  },
};
</script>
