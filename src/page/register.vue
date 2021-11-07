<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>欢迎来到咖啡世界</p>
        </div>
        <div class="manage_smalltip">
          <p>注册新用户</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名" maxlength = "15" clearable><span>dsfsf</span></el-input>
          </el-form-item>
          <el-form-item prop="password1">
            <el-input type="password" placeholder="密码" v-model="loginForm.password1" maxlength = "20" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input type="password" placeholder="确认密码" v-model="loginForm.password2" maxlength = "20" clearable></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="邮箱（用于找回密码）" v-model="loginForm.email" maxlength = "20" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='register' class="submit_btn">注册</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>


<script>
export default {
  name: "register",
  data() {
    return {
      loginForm: {
        username: '',
        password1: '',
        password2: '',
        email:'',
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password1: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        password2: [
          {required: true, message: '请确认密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
      },
      showLogin: false,
      dialogVisible: false
    }
  },
  methods: {
    register() {
      if (this.loginForm.username.length === 0 || this.loginForm.password1.length === 0 || this.loginForm.password2.length === 0||this.loginForm.email.length===0) {
        this.$message({
          type: 'warning',
          message: "请完整填写表格"
        });
      } else {
        if (this.loginForm.password1.localeCompare(this.loginForm.password2) !== 0) {
          this.$message({
            type: 'error',
            message: "两次输入的密码不一致"
          });
        } else {
          this.$axios.post('People/AddPeople', {
            "name": this.loginForm.username,
            "password": this.loginForm.password1,
            "email":this.loginForm.email
          }).then(
              (data) => {
                if (data.data!==0){
                  this.$message({
                    type: 'success',
                    message: "注册成功，欢迎来到咖啡世界！"
                  });
                  sessionStorage.setItem("loginid",data.data.toString())
                  this.$router.push('manage')
                }
                else{
                  this.$message({
                    type: 'error',
                    message: "用户名已被注册"
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
      }
    }
  },
  mounted() {
    this.showLogin = true;
  },
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
  top: -40px;
  left: 0;

  p {
    font-size: 20px;
    color: #fff;
  }
}

.form_contianer {
  .wh(320px, 290px);
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
</style>
