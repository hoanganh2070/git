<script setup>
import { useRouter } from 'vue-router';
import InputForm from '../components/InputForm.vue';
import axios from 'axios';

import { ref } from 'vue';

const router = useRouter();

const username = ref('');
const password = ref('');
const progress = ref('');
const time = ref(0);
const count = ref(0);




function randomPassword() {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function logIn() {

    let milliseconds = 0;
    const timer = setInterval(() => {
        milliseconds++;
        time.value = milliseconds;
    }, 1);
    progress.value = "Checking...";


    while (true) {

        const promiseList = [];

        for (let i = 1; i <= 5; i++) {
            const res = axios.post('http://localhost:3000/login', {
                username: username.value,
                password: randomPassword()
            })
            promiseList.push(res);
        }

        const responses = await Promise.allSettled(promiseList);

        for (let i = 0; i < responses.length; i++) {
            console.log(responses[i]);
            if (responses[i].status === "fulfilled") {
                progress.value = "Success";
                break;
            }

        }

     

        



        if (progress.value === "Success") {
            clearInterval(timer);
            break;
        }





    }
}

</script>

<template>

    <div class="w-screen h-screen flex flex-col lg:flex-row md:p-48 items-center overflow-x-hidden">

        <div class="flex w-full flex-col space-y-5 items-center">
            <form class="flex w-[350px] flex-col space-y-5 items-center">
                <div class="w-full">
                    <p class="text-2xl float-start">Log In</p>
                </div>
                <div>
                    <input v-model="username" type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg  block w-[350px] p-2.5 "
                        placeholder="Username" required>
                </div>
                <div>

                </div>


                <button @click="logIn()"
                    class="bg-slate-600 text-white p-2 w-32 rounded-lg hover:bg-black duration-200">Log In</button>

                <label for="file" v-text="time">
                </label>
                <p>ms</p>
                <label for="file" v-text="progress"></label>
                <progress id="file" max="1000000">70 %</progress>



            </form>

        </div>
    </div>

</template>