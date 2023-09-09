<template>
  <div>
    <div>C页面</div>
    <input type="text" v-model="dataC" />
    <div @click="toA">跳转A</div>
  </div>
</template>

<script lang="ts" setup name="C">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const dataC = ref("");
const toA = () => {
  router.push("/aa");
};
</script>
