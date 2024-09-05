<template>
    <li
        class="w-[70%] flex justify-between items-center p-5 mx-auto mb-2.5 rounded-lg bg-slate-200 box-border relative listpic">
        <input v-if="editStatus" type="time" v-model="editTime"
            class="border-gray-800 p-2 focus:outline-none bg-transparent border-none">
        <span v-else class="text-red-600 text-2xl font-bold">{{ fulltime }}</span>
        <input v-if="editStatus" type="text" v-model="editValue" @keydown.enter="updateItem"
            class="border-b border-gray-300 p-2 focus:outline-none focus:border-gray-800 transition duration-300 ease-linear bg-transparent">
        <span v-else class="flex font-sans font-semibold">{{ test }}</span>
        <div class="flex gap-2.5">
            <button
                class="bg-cyan-400  text-white hover:bg-white hover:text-cyan-400 transition duration-300 ease-linear font-semibold py-1 px-2 cursor-pointer rounded-md"
                @click="editStatus ? updateItem() : updateEvent()">{{ editStatus ? '保存' : '修改' }}</button>
            <button
                class="bg-cyan-400  text-white hover:bg-white hover:text-cyan-400 transition duration-300 ease-linear font-semibold py-1 px-2 cursor-pointer rounded-md"
                @click="deleteItem">刪除</button>
        </div>
    </li>
</template>

<script setup>
import { ref, toRefs } from 'vue';

const props = defineProps({ test: String, fulltime: String, index: Number })
const emit = defineEmits(['delete-history', 'update-history'])
const { test, fulltime } = toRefs(props);
// const fulltime = ref('');
const editStatus = ref(false);
const editValue = ref(test.value);
const editTime = ref(fulltime.value);

//編輯狀態
const updateEvent = () => {
    editStatus.value = true;
    editValue.value = test.value;
    editTime.value = fulltime.value;
}
//更新內容
const updateItem = () => {
    if (editValue.value.trim() && editTime.value.trim()) {
        emit('update-history', { event: editValue.value.trim(), time: editTime.value.trim() });
        editStatus.value = false;
    }
}
//刪除
const deleteItem = () => {
    console.log(props.index);

    emit('delete-history', props.index)
}
</script>

<style scoped>
.listpic::before {
    content: '';
    display: block;
    background-image: url('/public/img/1.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 5%;
    left: -5%;
    z-index: 2;
}
</style>