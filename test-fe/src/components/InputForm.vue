<script setup>

const props = defineProps({
    placeHolder: String,
    Type : String
})

</script>

<template>
    <input :type=props.Type
        class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-[350px] p-2.5 "
        :placeholder=props.placeHolder required>
</template>