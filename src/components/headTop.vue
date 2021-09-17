<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" >
      <el-button type="primary">
        你好，{{ usename }}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu style="width: 100px;margin-top: 5px;overflow: hidden;height: 65px;box-shadow: 0 2px 10px 2px #92b6dd;" slot="dropdown">
        <el-dropdown-item command="userset">账户设置</el-dropdown-item>
        <el-dropdown-item command="signout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

export default {
  data() {
    return {
      usename: '',
    }
  },
  created() {
    if(sessionStorage.getItem("loginid")===""){
      this.$router.push('/');
    }
  },
  methods: {
    async handleCommand(command) {
      if (command === 'userset') {
        this.$router.push('userset');
      } else if (command === 'signout') {
        sessionStorage.setItem("loginid","")
        this.$message({
          type: 'success',
          message: '退出成功'
        });
        this.$router.push('/');
      }
    },
  },
  mounted() {
    this.$axios.post('People/getNameById/' + sessionStorage.getItem("loginid"))
        .then(
            (data) => {
              this.usename = data.data;
            },
            () => {
              this.$message({
                type: 'error',
                message: "请您重新登录"
              });
              this.$router.push('/');
            })
  }
}
</script>

<style lang="less">
@import '../style/mixin';

.header_container {
  background-color: #EFF2F7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}

.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>