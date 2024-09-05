<template>
    <div class="w-[70%] m-auto flex justify-between mb-5 box-border">
        <input type="text"
            class=" w-[25%] border-b border-gray-300 border-solid bg-transparent mr-2.5 focus:outline-none focus:border-gray-800 transition duration-300 ease-linear"
            v-model="test" placeholder="請輸入代辦事項" @keydown.enter="addItem">
        <input type="time"
            class=" w-[25%] border-b border-gray-300 border-solid bg-transparent mr-2.5 focus:outline-none focus:border-gray-800 transition duration-300 ease-linear"
            v-model="usertime" @keydown.enter="addItem">
        <button
            class="w-[20%] py-2.5 bg-cyan-400 text-white rounded-md font-bold ml-1 hover:text-cyan-400 hover:bg-white transition duration-500"
            @click="addItem">新增</button>
    </div>
    <ul class="list-none">
        <toDoItem v-for="(item, index) in history" :key="item.event" :test="item.event" :fulltime="item.time"
            :index="index" @delete-history="deleteItem" @update-history="updateItem(index, $event)" />
    </ul>
</template>

<script setup>
import { ref } from "vue";
import toDoItem from '../components/toDoItem.vue'

const test = ref('');
const usertime = ref('')
const history = ref([
    {
        event: '自習',
        time: '08:00'
    },
    {
        event: '財經新聞',
        time: '09:30'
    },
    {
        event: 'work',
        time: '10:30'
    },
]);
// const usertext = test.value.trim(); //使用者輸入

const addItem = () => {
    if (test.value.trim()) {
        const defaultTime = new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        history.value.push({ event: test.value.trim(), time: usertime.value || defaultTime });
        test.value = '';
        usertime.value = '';
    }
}
const updateItem = (index, editValue) => {
    history.value[index] = editValue;
}
const deleteItem = (index) => {
    const confirm = window.confirm('確定要刪除該筆資料?');
    if (confirm) {
        history.value.splice(index, 1)
    }
}


</script>

<style scoped></style>