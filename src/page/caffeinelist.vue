<template>
  <div class="fillcontain">
    <head-top></head-top>
    <section class="data_section">
    <header class="section_title">咖啡记录</header>
    </section>
    <div class="table_container">
      <el-table
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          :default-sort="{prop: 'time', order: 'descending'}">
        <el-table-column
            type="index"
            width="100">
        </el-table-column>
        <el-table-column
            property="time"
            label="饮用时间"
            sortable>
        </el-table-column>
        <el-table-column
            property="brand"
            label="品牌">
        </el-table-column>
        <el-table-column
            property="type"
            label="饮品">
        </el-table-column>
        <el-table-column
            property="size"
            label="杯型">
        </el-table-column>
        <el-table-column
            property="percent"
            label="饮用了">
        </el-table-column>
        <el-table-column
            property="caffeine"
            label="咖啡因含量">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headTop from '../components/headTop'

export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
    }
  },
  components: {
    headTop,
  },
  created() {

  },
  mounted() {
    this.getCaffeineList();
  },
  methods: {

    handleDelete(){
      this.$alert('删除功能上线中', '提示', {
        confirmButtonText: '确定',
        type: 'info'
      })
    },
    /*handleDelete(index, row) {
      this.$confirm('确定要删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
            this.$axios.post('/api/Caffeine/deleteCaffeineRecord', {
              'id': sessionStorage.getItem("loginid"),
              'time': row.time
            }).then(
                () => {
                  this.$message({
                    type: 'success',
                    message: '提交成功'
                  });

                },
                () => {
                  this.$message({
                    type: 'error',
                    message: '删除失败',
                  });
                })
          }
      )
    },*/
    getCaffeineList() {
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
      this.$axios.post('Caffeine/getCaffeineRecordById/' + sessionStorage.getItem("loginid"))
          .then(
              (data) => {
                for (var i in data.data) {
                  var tmpjson = {};
                  tmpjson.time = data.data[i].time;
                  tmpjson.time = data.data[i].time;
                  tmpjson.brand = data.data[i].brand;
                  tmpjson.type = data.data[i].type;
                  tmpjson.size = data.data[i].size;
                  tmpjson.percent = data.data[i].percent;
                  tmpjson.caffeine = data.data[i].caffeine;
                  this.tableData.push(tmpjson)
                }
              },
              (err) => {
                this.$message({
                  type: 'error',
                  message: '错误信息：' + err
                });
              })
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
</style>