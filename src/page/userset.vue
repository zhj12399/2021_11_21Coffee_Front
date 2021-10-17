<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">个人信息</header>
    </section>
    <div class="admin_set">
      <ul>
        <li>
          <span>昵称：</span><span>{{ Caffeineusername }}</span>
        </li>
        <li>
          <span>ID：</span><span>{{ Caffeineuserid }}</span>
        </li>
        <li>
          <el-button type="primary" @click='revisepassword'>修改密码</el-button>
          <el-button type="primary" @click='revisename'>修改昵称</el-button>
          <el-button type="primary" @click='deletepeople'>删除账户</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import headTop from '../components/headTop'

export default {
  data() {
    return {
      Caffeineusername: '',
      Caffeineuserid: '',
    }
  },
  components: {
    headTop,
  },
  mounted() {
    this.$axios.post('People/ExistPeople/'+ sessionStorage.getItem("loginid"))
        .then(
            (data)=>{
              if(!data.data){
                sessionStorage.setItem("loginid","")
                this.$message({
                  type: 'info',
                  message: '请您重新登录'
                });
                this.$router.push('/')
              }
            },
            (err) => {
              this.$message({
                type: 'error',
                message: '错误信息：' + err
              });
            })
    this.Caffeineuserid = sessionStorage.getItem("loginid");
    this.$axios.post('People/getNameById/' + sessionStorage.getItem("loginid"))
        .then(
            (data) => {
              this.Caffeineusername = data.data;
            })
  },
  methods: {
    revisepassword() {
      this.$prompt('请输入修改的密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z0-9]{1,10}$/,
        inputErrorMessage: '密码格式不正确'
      }).then(({value}) => {
        this.$axios.post('People/updatePasswordById?id=' + sessionStorage.getItem("loginid") +
            '&password=' + value).then(
            () => {
              this.$message({
                type: 'success',
                message: '密码更改成功'
              })
            },
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消更改'
        });
      });
    },
    revisename() {
      this.$prompt('请输入修改的昵称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$/,
        inputErrorMessage: '昵称格式不正确'
      }).then(({value}) => {
        this.$axios.post('People/updateNameById?id=' + sessionStorage.getItem("loginid") +
            '&name=' + value).then(
            (data) => {
              if (data.data !== false) {
                sessionStorage.setItem("loginid", "")
                this.$message({
                  type: 'success',
                  message: '昵称更改成功，请重新登录'
                })
                this.$router.push('/');
              } else {
                this.$message({
                  type: 'error',
                  message: '昵称更改失败，昵称已被他人注册'
                })
              }
            }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消更改'
        });
      });
    },
    deletepeople() {
      this.$confirm('删除后您的账号将不会被保留 其它信息也将会被删除', '确定删除账户码？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('People/deletePeopleById?id=' + sessionStorage.getItem("loginid")
        ).then(
            () => {
              sessionStorage.setItem("loginid", "")
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.$router.push('/');
            },
            () => {
              this.$message({
                type: 'error',
                message: '删除错误',
              });

            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style lang="less">
@import '../style/mixin';

.table_container {
  padding: 20px;
}

.data_section {
  padding: 20px;
  margin-bottom: 40px;

  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
}

.admin_set {
  width: 60%;
  background-color: #F9FAFC;
  min-height: 400px;
  margin: 20px auto 0;
  border-radius: 10px;

  ul > li {
    padding: 20px;

    span {
      color: #666;
    }
  }
}

.admin_title {
  margin-top: 20px;
  .sc(24px, #666);
  text-align: center;
}
</style>