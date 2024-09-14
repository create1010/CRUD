<template>
    <li
        class="w-[70%] flex flex-col justify-center items-center p-2.5 gap-2.5 md:flex-row md:justify-between md:p-5 mx-auto mb-2.5 rounded-lg bg-slate-200 box-border relative listpic">
        <input v-if="editStatus" type="time" v-model="editTime"
            class="border-gray-800 p-2 focus:outline-none bg-transparent border-none">
        <span v-else class="text-red-600 text-2xl font-bold">{{ fulltime }}</span>
        <input v-if="editStatus" type="text" v-model="editValue"
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
import { ref, toRefs, computed } from 'vue';

const props = defineProps({ test: String, fulltime: String, index: Number, editItem: Number })
const emit = defineEmits(['delete-history', 'update-history', 'update-editing-status'])
const { test, fulltime, index, editItem } = toRefs(props);
const editValue = ref(test.value);
const editTime = ref(fulltime.value);
const editStatus = computed(() => editItem.value === index.value);

//編輯狀態
const updateEvent = () => {
    emit('update-editing-status', index.value)
    editValue.value = test.value;
    editTime.value = fulltime.value;
}
//更新內容
const updateItem = () => {
    if (editValue.value.trim() && editTime.value.trim()) {
        emit('update-history', { id: index.value, event: editValue.value.trim(), time: editTime.value.trim() });
        emit('update-editing-status', null);
    }
}
//刪除
const deleteItem = () => {
    // console.log(index.value);
    emit('delete-history', index.value)
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
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

@media screen and (min-width:768px) {
    .listpic::before {
        top: 20%;
        left: -7%;
    }
}
</style>