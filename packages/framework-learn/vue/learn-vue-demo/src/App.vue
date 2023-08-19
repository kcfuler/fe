<script setup lang="ts">
import { ref } from 'vue'
const list = ref([
  {id: 1,label:'时尚商店', isHot: true},
  {id: 1,label:'时尚商店', isHot: false},
])
localStorage.setItem('key',JSON.stringify(list.value) );
</script>

<template>
  <div class="container">
    <template v-for="item in list" >
     <div>{{item.label}} <label class="tip" v-show="item.isHot">热</label></div>
    </template>
  </div>
</template>

<style scoped>
.container{
  display: grid;
  grid-template-columns: 40% 40%;
  column-gap: 20%;
}
.tip{
  width: 50px;
  height: 50px;
  background-color: red;
  color: #fff;
}
</style>
