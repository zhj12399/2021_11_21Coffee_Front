<template>
  <div class="fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%;width: 13%; background-color: #324057; ">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="manage"><i class="el-icon-menu"></i>今日</el-menu-item>
          <el-menu-item index="caffeinelist"><i class="el-icon-document"></i>咖啡记录</el-menu-item>
          <el-menu-item index="addcaffeine"><i class="el-icon-plus"></i>增添数据</el-menu-item>
          <el-menu-item index="analysis"><i class="el-icon-star-on"></i>分析</el-menu-item>
          <el-menu-item index="userset"><i class="el-icon-setting"></i>账户设置</el-menu-item>
          <el-menu-item index="explain"><i class="el-icon-warning"></i>说明</el-menu-item>
          <img :src="coffee_android_Url" width="113" height="113">
          <el-menu-item @click="go()">下载安卓App</el-menu-item>
          <img :src="coffee_mini_Url" width="113" height="113">
          <el-menu-item>打开微信小程序</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return{
      coffee_android_Url:require("../assets/coffee_android.png"),
      coffee_mini_Url:require("../assets/coffee_mini.png")
    }
  },
  methods:{
    go(){
      window.open("http://zhj12399.cn:8080/coffee.apk","_blank")
    }
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '');
    }
  }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';

.fillcontain{
  min-width: 875px; // 设置的最小宽度，小于1024时，会出现滚动条
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>