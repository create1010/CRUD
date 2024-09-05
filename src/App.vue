<template>
  <div class=" max-w-[1200px] min-h-screen box-border m-auto py-5 text-center">
    <h1 class="text-3xl text-stone-600 font-bold mb-5">To-do-List</h1>
    <todoList />
  </div>
</template>

<script setup>
import todoList from './views/ToDoList.vue'
</script>