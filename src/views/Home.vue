<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world msg="Hello Vue 3 + TypeScript + Vite" />
    <el-table :data="tableDataVlaue" border>
      <el-table-column prop="serialNo" label="序号" width="" align="center" />
      <el-table-column
        prop="productName"
        label="榜单分类名称"
        width=""
        align="center"
      />
      <el-table-column
        prop="salesCount"
        label="产品数量"
        width=""
        align="center"
      />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEditColumn(row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import { queryResouce$ } from "@/api/resource";

type columnRowType = {
  serialNo: number;
  id: string;
  productName: string;
  salesCount: string;
};

const tableDataVlaue = ref([]);
const tableLoading = ref(true);

onMounted(() => {
  getList();
});

const getList = () => {
  queryResouce$().then(({ data }) => {
    tableDataVlaue.value = data || [];
    tableLoading.value = false;
  });
};

const handleEditColumn = (row: columnRowType) => {
  console.log(row.id);
};
</script>

<style lang="scss">
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .table-card {
    width: 1000px;
    margin: 0 auto;
  }
}
</style>
