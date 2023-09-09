<template>
  <div>
    <div>B页面</div>
    <input type="text" v-model="dataB" /><br />
    <div @click="toA">跳转A</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const dataB = ref("");
const toA = () => {
  router.push("/aa");
};
</script>
