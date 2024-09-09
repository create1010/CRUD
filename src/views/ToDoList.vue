<template>
    <div class="w-[70%] m-auto flex justify-between items-center mb-5 box-border">
        <input type="text"
            class=" w-[25%] border-b border-gray-300 border-solid bg-transparent mr-2.5 focus:outline-none focus:border-gray-800 transition duration-300 ease-linear"
            v-model="test" placeholder="請輸入代辦事項">
        <input type="time"
            class=" w-[25%] border-b border-gray-300 border-solid bg-transparent mr-2.5 focus:outline-none focus:border-gray-800 transition duration-300 ease-linear"
            v-model="usertime">
        <button
            class="w-[20%] py-2.5 bg-cyan-400 text-white rounded-md font-bold ml-1 hover:text-cyan-400 hover:bg-white transition duration-500"
            @click="addItem">新增</button>
    </div>
    <div class="w-[70%] flex justify-between items-center mb-5 m-auto">
        <input type="search"
            class="w-[70%] border-b border-gray-300 border-solid bg-transparent mr-2.5 focus:outline-none focus-within:border-gray-800 transition duration-300 ease-linear"
            v-model="usersearch" placeholder="請輸入欲查詢事件">
        <button
            class="w-[20%] py-2.5 bg-cyan-400 text-white rounded-md font-bold ml-1 hover:text-cyan-400 hover:bg-white transition duration-500"
            @click="isSearch">查詢</button>
    </div>
    <ul class="list-none">
        <toDoItem v-for="item in filterHistory" :key="item.id" :test="item.event" :fulltime="item.time" :index="item.id"
            :edit-item="editItem" @update-editing-status="updateEditingStatus" @delete-history="deleteItem"
            @update-history="updateItem" />
    </ul>
</template>

<script setup>
import { ref } from "vue";
import toDoItem from '../components/toDoItem.vue';

const test = ref('');
const usertime = ref('');
const usersearch = ref('');
const editItem = ref(null);
const history = ref([
    { id: 1, event: '起床', time: '07:00' },
    { id: 2, event: '晨間運動', time: '07:30' },
    { id: 3, event: '早餐', time: '08:00' },
    { id: 4, event: '自習', time: '09:00' },
    { id: 5, event: '工作', time: '10:00' },
    { id: 6, event: '休息', time: '11:00' }
]);
const filterHistory = ref([...history.value]);
//增
const addItem = () => {
    if (test.value.trim()) {
        const defaultTime = new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const newId = history.value.length ? Math.max(...history.value.map(item => item.id)) + 1 : 1;
        history.value.push({ id: newId, event: test.value.trim(), time: usertime.value || defaultTime });
        test.value = '';
        usertime.value = '';
        isSearch();//更新事件
    }
}
//刪
const deleteItem = (selectID) => {
    const confirm = window.confirm('確定要刪除該筆資料?');
    if (confirm) {
        history.value = history.value.filter(item => item.id !== selectID);
        isSearch();
    }
}
//改
const updateItem = (updateItem) => {
    const selectItem = history.value.findIndex(item => item.id === updateItem.id)
    if (selectItem !== -1) {
        history.value[selectItem] = updateItem;
        usersearch.value = '';
        history.value.sort((a, b) => a.time.localeCompare(b.time));
        isSearch();
    }
}
//查
const isSearch = () => {
    if (usersearch.value.trim()) {
        filterHistory.value = history.value.filter(item => item.event.includes(usersearch.value.trim()))
            .sort((a, b) => a.time.localeCompare(b.time));

    } else {
        filterHistory.value = [...history.value].sort((a, b) => a.time.localeCompare(b.time));
        editItem.value = null;
    }
}

//處理編輯更新
const updateEditingStatus = (id) => {
    editItem.value = id !== null ? id : null;
}

//初始化預設資訊
isSearch();
</script>

<style scoped></style>