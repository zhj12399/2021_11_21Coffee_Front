<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">咖啡世界</header>
      <el-row>每日我们建议最多摄入400mg咖啡因（红色），最佳的入眠状态为咖啡因量低于100mg（橙色）</el-row>
      <el-row :gutter="8">
        <el-col :span="3">
          <div class="data_list all_head"><span class="data_num head">记录：</span></div>
        </el-col>
        <el-col :span="6">
          <div class="data_list">当前体内咖啡因量:<span class="data_num">{{ nowCaffeine }}</span>mg</div>
        </el-col>
        <el-col :span="6">
          <div class="data_list">今日饮用杯数:<span class="data_num">{{ todaycups }}</span>杯</div>
        </el-col>
        <el-col :span="6">
          <div class="data_list">今日累计摄入:<span class="data_num">{{ todaycaffeine }}</span>/400mg</div>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        {{ LastDrink }}
      </el-row>
      <el-row :gutter="8">
        {{ SleepTime }}
      </el-row>
      <el-row :gutter="8">
        下图是您上一次饮用咖啡之后，咖啡因衰减的图表
      </el-row>
    </section>
    <div id="chartLineBox" style="width: 90%;height:450px;"></div>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import * as echarts from 'echarts';

export default {
  data() {
    return {
      loginid: sessionStorage.getItem("loginid"),
      StartCaffeine: 0,
      StartTime: '',
      Xdata: [],
      Ydata: [],
      SleepData: [],
      MaxData: [],
      todaycups: 0,
      todaycaffeine: 0,
      nowCaffeine: 0,
      LastDrink: '',
      SleepTime: '您大约在 正在读取中 降至睡眠量'
    }
  },
  created() {

  },
  components: {
    headTop,
  },
  mounted() {
    var nowtime = new Date();
    var nowtimestr = nowtime.getFullYear() + '-' + (nowtime.getMonth() + 1) + '-' + nowtime.getDate()
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
    this.$axios.post('Caffeine/getTodayCaffeineRecord?id=' + sessionStorage.getItem("loginid") +
        '&time=' + nowtimestr).then(
        (data) => {
          var sumcaffeine = 0.0;
          for (var i in data.data) {
            sumcaffeine += data.data[i].caffeine;
          }
          this.todaycaffeine = sumcaffeine;
          this.todaycups = data.data.length;
        }
    )
    this.$axios.post('Caffeine/getStateById/' + sessionStorage.getItem("loginid"))
        .then(
            (data) => {
              this.StartCaffeine = data.data.caffeine
              this.StartTime = new Date(data.data.time)
              this.LastDrink = this.StartTime
              var nowtime = new Date();

              for (var i = 0; i < 14; i++) {
                var xdatastring = "";
                if (this.StartTime.getHours() + i > 23) {
                  xdatastring = (this.StartTime.getHours() + i - 24).toString() + ":" + this.StartTime.getMinutes().toString()
                } else {
                  xdatastring = (this.StartTime.getHours() + i).toString() + ":" + this.StartTime.getMinutes().toString()
                }
                this.Xdata.push(xdatastring)
                this.Ydata.push((this.StartCaffeine * Math.pow(0.5, i / 4.0)).toFixed(2))
                this.SleepData.push(100)
                this.MaxData.push(400)
              }

              //上一次饮用距现在的时间差
              var deltatime = (nowtime.getTime() - this.StartTime.getTime()) / 1000.0 / 3600.0
              //计算出现在的咖啡因量
              this.nowCaffeine = (this.StartCaffeine * Math.pow(0.5, deltatime / 4.0)).toFixed(2)
              //计算距离睡眠量的时间差
              var delta_sleeptime = 4 * Math.log(100.0 / this.StartCaffeine) / Math.log(0.5)
              //得出睡眠的时间
              var sleeptime = new Date(this.StartTime.getTime() + delta_sleeptime * 3600 * 1000)


              if (this.StartCaffeine < 100) {
                this.SleepTime = "此时已经低于睡眠值了,可以入睡啦"
              } else {
                this.SleepTime = "您大约在" + sleeptime.getFullYear() + "-" + (Array(2).join(0)+(sleeptime.getMonth()+1).toString()).slice(-2) + "-" + (Array(2).join(0)+sleeptime.getDate().toString()).slice(-2) + " " + (Array(2).join(0)+sleeptime.getHours().toString()).slice(-2) + ":" + (Array(2).join(0)+sleeptime.getMinutes().toString()).slice(-2) + "降至睡眠量"
              }

              if (this.nowCaffeine < 1) {
                this.LastDrink = "您很久没喝咖啡了，您上一次饮用饮品的时间是：" + this.StartTime.getFullYear() + "年" + (this.StartTime.getMonth() + 1).toString() + "月" + this.StartTime.getDate() + "日 "
                    + this.StartTime.getHours() + ":" + this.StartTime.getMinutes()
              } else {
                this.LastDrink = "您上一次饮用饮品的时间是：" + this.StartTime.getFullYear() + "年" + (this.StartTime.getMonth() + 1).toString() + "月" + this.StartTime.getDate() + "日 "
                    + this.StartTime.getHours() + ":" + this.StartTime.getMinutes()
              }
            },
            (err) => {
              this.$message({
                type: 'error',
                message: '错误信息：' + err
              });
            }).then(
        () => {
          this.chartLine = echarts.init(document.getElementById('chartLineBox'));
          // 指定图表的配置项和数据
          var option = {
            tooltip: {              //设置tip提示
              trigger: 'axis'
            },
            color: ['#675bba', '#FF8A00', '#FF0000'],
            legend: {
              data: ['当前量', '入眠量', '最大量']
            },
            xAxis: {                //设置x轴
              type: 'category',
              boundaryGap: false,     //坐标轴两边不留白
              data: this.Xdata,
              name: '时间',           //X轴 name
              nameTextStyle: {        //坐标轴名称的文字样式
                color: '#999',
                fontSize: 16,
                padding: [0, 0, 0, 20]
              },
              axisLine: {             //坐标轴轴线相关设置。
                lineStyle: {
                  color: '#999',
                }
              }
            },
            yAxis: {
              name: '咖啡因(mg)',
              nameTextStyle: {
                color: '#999',
                fontSize: 16,
                padding: [0, 0, 10, 0]
              },
              axisLine: {
                lineStyle: {
                  color: '#999',
                }
              },
              type: 'value'
            },
            series: [
              {
                name: '当前量',
                data: this.Ydata,
                type: 'line',
                lineStyle: {
                  normal: {
                    color: '#675bba',
                  }
                },
                smooth: true,
              },
              {
                name: '入眠量',
                data: this.SleepData,
                type: 'line',
                lineStyle: {
                  normal: {
                    color: '#FF8A00',
                    type: 'dotted'
                  }
                },
                smooth: true,
              }, {
                name: '最大量',
                data: this.MaxData,
                type: 'line',
                lineStyle: {
                  normal: {
                    color: '#FF0000',
                    type: 'dotted'
                  }
                },
                smooth: true,
              }
            ]
          };

          // 使用刚指定的配置项和数据显示图表。
          this.chartLine.setOption(option);
        }
    )
  },
  computed: {},
  methods: {}
}
</script>

<style lang="less">
@import '../style/mixin';

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
    font-size: 14px;
    color: #666;
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