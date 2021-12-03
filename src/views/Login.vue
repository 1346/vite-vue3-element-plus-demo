<template>
  <div class="login">login页面</div>
  <el-card title="登录表单" class="logiel-form">
    <el-form :model="model" ref="formRef" :rules="rules">
      <el-form-item prop="account" label="">
        <el-input v-model="model.account" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="passwd" label="">
        <el-input v-model="model.passwd" placeholder="请输入密码" />
      </el-form-item>
    </el-form>
    <el-button @click="handleSubmitLoginForm" round type="primary">
      验证
    </el-button>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const formRef = ref();
const model = reactive({
  account: "",
  passwd: "",
});
const rules = {
  account: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
  ],
  passwd: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
};
const handleSubmitLoginForm = () => {
  formRef.value.validate((valid: boolean) => {
    if (!valid) {
      return;
    } else {
      store
        .dispatch("login", model)
        .then(() => {
          router.push({
            path: "/",
          });
        })
        .catch(() => {});
    }
  });
};
</script>

<style lang="scss">
.login-form {
  width: 500px;
}
</style>
