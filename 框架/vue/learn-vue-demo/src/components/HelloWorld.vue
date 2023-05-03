<template>
  <div class="color-picker">
    <div class="color-box" :style="{ backgroundColor: selectedColor }"></div>
    <input type="color" v-model="selectedColor" @change="updateColor"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedColor: '#ff0000'
    }
  },
  methods: {
    updateColor(event) {
      this.selectedColor = event.target.value;
      this.$emit('color-changed', this.selectedColor);
    }
  }
}
</script>

<style>
.color-picker {
  display: flex;
  align-items: center;
}

.color-box {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
