<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">分析</header>
      <el-row :gutter="8" ref="form" :model="form">
        <el-col :span="3">
          <div class="data_list all_head"><span class="data_num head">记录：</span></div>
        </el-col>
        <el-col :span="6">
          <div class="data_list">本周共饮用:<span class="data_num">{{ LastWeekSum }}</span>mg</div>
        </el-col>
        <el-col :span="6">
          <div class="data_list">本周平均饮用:<span class="data_num">{{ LastWeekAvg }}</span>mg</div>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        <el-col :span="3">
          <div class="data_list all_head"><span class="data_num head">记录：</span></div>
        </el-col>
        <el-col :span="6">
          <div class="data_list">本月共饮用:<span class="data_num">{{ LastMonthSum }}</span>mg</div>
        </el-col>
        <el-col :span="6">
          <div class="data_list">本月平均饮用:<span class="data_num">{{ LastMonthAvg }}</span>mg</div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import headTop from "@/components/headTop";

export default {
  data() {
    return {
      StartCaffeine: '',
      LastWeekSum:0,
      LastWeekAvg:0,
      LastMonthSum:0,
      LastMonthAvg:0,
    }
  },
  components: {
    headTop,
  },
  mounted() {
    this.$axios.post('Caffeine/getLastMonthRecord/' + sessionStorage.getItem("loginid"))
        .then(
            (data) => {
              var nowtime = new Date();
              for (var i in data.data) {
                var tmptime = new Date(data.data[i].time);
                if(nowtime.getTime() - tmptime.getTime() < 7*24*3600*1000 && nowtime.getTime() - tmptime.getTime()>0){
                  this.LastWeekSum = this.LastWeekSum + data.data[i].caffeine
                }
                this.LastMonthSum = this.LastMonthSum + data.data[i].caffeine
              }
              this.LastMonthSum = this.LastMonthSum.toFixed(2)
              this.LastWeekSum = this.LastWeekSum.toFixed(2)
              this.LastWeekAvg = (this.LastWeekSum/7).toFixed(2)
              this.LastMonthAvg = (this.LastMonthSum/30).toFixed(2)
            },
            (err) => {
              this.$message({
                type: 'error',
                message: '错误信息：' + err
              });
            })
  },
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

  .data_list {
    text-align: center;
    font-size: 16px;
    color: #666;
    margin: 7px 7px;
    border-radius: 6px;
    background: #E5E9F2;

    .data_num {
      color: #333;
      font-size: 26px;
    }

    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }

  .today_head {
    background: #FF9800;
  }

  .all_head {
    background: #20A0FF;
  }
}
</style>