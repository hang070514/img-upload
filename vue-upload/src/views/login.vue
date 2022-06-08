<template>
  <div class="login">
    <el-form ref="formRef" :model="formData" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.pwd"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { login } from '../api/index'
export default {
  name: "login",
  data() {
    return {
      formData: {
        username: 'admin',
        pwd: 123456
      }
    }
  },
  created() {

  },
  methods: {
    login() {
      login({username: this.formData.username, password: this.formData.pwd }).then((res) => {
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
          }
          },
          (err) => {

          })
    }
  }
}
</script>

<style scoped lang="less">
.login{
  width: 50%;
  margin: 0 auto;
}
</style>
