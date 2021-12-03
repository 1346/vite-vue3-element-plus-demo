<template>
  <h1>{{ msg }}</h1>
  <div class="mb20">
    <el-button type="primary" @click="handleAddCount"
      >store count is: {{ store.getters.count }}</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";

defineProps<{ msg: String }>();

const store = useStore();
const handleAddCount = () => {
  store.commit("INCREMENT");
};
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
