<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>欢迎来到咖啡世界</p>
        </div>
        <div class="manage_smalltip">
          <p>记录你的咖啡因摄入</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='Go_login' class="submit_btn">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='Go_register' class="submit_btn">注册</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
      },
      showLogin: false,
    }
  },
  methods: {
    Go_register() {
      this.$router.push('register')
    },
    Go_login() {
      if(this.loginForm.username.length !== 0 ){
        if(this.loginForm.password.length !== 0){
          this.$axios.post('People/JudgePassword', {
            "name": this.loginForm.username,
            "password": this.loginForm.password
          }).then(
              (data) => {
                if (data.data!==0){
                  this.$message({
                    type: 'success',
                    message: "登陆成功"
                  });
                  sessionStorage.setItem("loginid",data.data.toString())
                  this.$router.push('manage')
                }
                else{
                  this.loginForm.password=""
                  this.loginForm.username=""
                  this.$message({
                    type: 'error',
                    message: "账号或密码错误"
                  });
                }
              },
              () => {
                this.$message({
                  type: 'error',
                  message: "网络错误"
                });
                this.$router.push('/');
              })
        }
        else {
          this.$message({
            type: 'warning',
            message: "密码不能为空"
          });
        }
      }
      else {
        this.$message({
          type: 'warning',
          message: "用户名不能为空"
        });
      }
    }
  },
  mounted() {
    this.showLogin = true;
  }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';

.login_page {
  background-color: #324057;
}

.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;

  p {
    font-size: 34px;
    color: #fff;
  }
}

.manage_smalltip {
  position: absolute;
  width: 100%;
  top: -60px;
  left: 0;

  p {
    font-size: 20px;
    color: #fff;
  }
}

.form_contianer {
  .wh(320px, 210px);
  .ctp(320px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;

  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}

.tip {
  font-size: 12px;
  color: red;
}

.form-fade-enter-active, .form-fade-leave-active {
  transition: all 1s;
}

.form-fade-enter, .form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
