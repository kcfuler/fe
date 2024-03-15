<template>
  <div>
    <div>A页面</div>
    <input type="text" v-model="dataA" /><br />
    <div @click="toB">跳转B</div>
    <div @click="toC">跳转C</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const dataA = ref("");
const toB = () => {
  router.push("/bb");
};
const toC = () => {
  router.push("/cc");
};
</script>
