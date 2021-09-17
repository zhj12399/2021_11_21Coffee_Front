<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">纪录饮品</header>
    </section>
    <el-row style="margin-top: 20px;">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
        <el-form-item label="饮用时间" class="block">
          <el-date-picker
              v-model="formData.time"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
          <el>（未选择则默认当下时间）</el>
        </el-form-item>
        <el-form-item label="品牌" prop="brand">
          <el-radio v-model="formData.brand" label="1">星巴克</el-radio>
          <el-radio v-model="formData.brand" label="2">瑞幸</el-radio>
          <el-radio v-model="formData.brand" label="3">麦当劳</el-radio>
          <el-radio v-model="formData.brand" label="4">雀巢</el-radio>
          <el-radio v-model="formData.brand" label="5">其它品牌</el-radio>
        </el-form-item>

        <el-form-item label="饮品" prop="starbucks" v-if="formData.brand==='1'">
          <el-radio v-model="formData.type" label="1">美式</el-radio>
          <el-radio v-model="formData.type" label="2">拿铁</el-radio>
          <el-radio v-model="formData.type" label="3">摩卡</el-radio>
          <el-radio v-model="formData.type" label="4">馥芮白</el-radio>
          <el-radio v-model="formData.type" label="5">冷萃</el-radio>
        </el-form-item>
        <el-form-item label="饮品" prop="luckin" v-if="formData.brand==='2'">
          <el-radio v-model="formData.type" label="1">美式</el-radio>
          <el-radio v-model="formData.type" label="2">拿铁</el-radio>
          <el-radio v-model="formData.type" label="3">摩卡</el-radio>
          <el-radio v-model="formData.type" label="4">澳瑞白</el-radio>
          <el-radio v-model="formData.type" label="5">加浓美式</el-radio>
        </el-form-item>
        <el-form-item label="饮品" prop="mac" v-if="formData.brand==='3'">
          <el-radio v-model="formData.type" label="1">美式</el-radio>
          <el-radio v-model="formData.type" label="2">拿铁</el-radio>
          <el-radio v-model="formData.type" label="3">摩卡</el-radio>
          <el-radio v-model="formData.type" label="4">冰醇咖啡</el-radio>
          <el-radio v-model="formData.type" label="5">卡布奇诺</el-radio>
        </el-form-item>
        <el-form-item label="饮品" prop="nestle" v-if="formData.brand==='4'">
          <el-radio v-model="formData.type" label="1">醇品速溶</el-radio>
          <el-radio v-model="formData.type" label="2">金牌速溶</el-radio>
          <el-radio v-model="formData.type" label="3">1+2速溶</el-radio>
        </el-form-item>
        <el-form-item label="饮品" prop="other" v-if="formData.brand==='5'">
          <el-radio v-model="formData.type" label="1">胶囊咖啡</el-radio>
          <el-radio v-model="formData.type" label="2">可乐(550ml)</el-radio>
          <el-radio v-model="formData.type" label="3">红茶(500ml)</el-radio>
          <el-radio v-model="formData.type" label="4">功能饮料(330ml)</el-radio>
        </el-form-item>

        <el-form-item label="杯型" prop="size" v-if="formData.brand==='1'">
          <el-radio v-model="formData.cups" label="1">中杯</el-radio>
          <el-radio v-model="formData.cups" label="2">大杯</el-radio>
          <el-radio v-model="formData.cups" label="3">超大杯</el-radio>
        </el-form-item>
        <el-form-item label="饮用了" prop="percent">
          <el-radio v-model="formData.percent" label="1">1杯</el-radio>
          <el-radio v-model="formData.percent" label="2">3/4杯</el-radio>
          <el-radio v-model="formData.percent" label="3">2/3杯</el-radio>
          <el-radio v-model="formData.percent" label="4">1/3杯</el-radio>
          <el-radio v-model="formData.percent" label="5">1/4杯</el-radio>
        </el-form-item>
        <el-form-item class="button_submit">
          <el-button type="primary" @click='addcaffeinerecord'>立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import headTop from '@/components/headTop'

export default {
  data() {
    return {
      formData: {
        time: '',
        brand: '1',
        type: '1',
        cups: '2',
        percent: '1',
      },
      sqlData: {
        brand: '',
        type: '',
        cups: '',
        percent: '',
        caffeine: 0.0,
      },
      rules: {
        time: [
          {required: true, message: '请选择时间', trigger: 'blur'},
        ]
      },
    }
  },
  components: {
    headTop,
  },
  methods: {
    addcaffeinerecord() {
      if (this.formData.percent === '1') {
        this.sqlData.percent = 1;
      } else if (this.formData.percent === '2') {
        this.sqlData.percent = 0.75;
      } else if (this.formData.percent === '3') {
        this.sqlData.percent = 0.67;
      } else if (this.formData.percent === '4') {
        this.sqlData.percent = 0.33;
      } else if (this.formData.percent === '5') {
        this.sqlData.percent = 0.25;
      }

      if (this.formData.brand === '1') {//星巴克
        this.sqlData.brand = '星巴克';
        if (this.formData.type === '1') {//美式
          this.sqlData.type = '美式';
          if (this.formData.cups === '1') {//中杯
            this.sqlData.cups = '中';
            this.sqlData.caffeine = 150 * this.sqlData.percent;
          } else if (this.formData.cups === '2') {
            this.sqlData.cups = '大';
            this.sqlData.caffeine = 225 * this.sqlData.percent;
          } else if (this.formData.cups === '3') {
            this.sqlData.cups = '超大';
            this.sqlData.caffeine = 300 * this.sqlData.percent;
          }
        } else if (this.formData.type === '2') {//拿铁
          this.sqlData.type = '拿铁';
          if (this.formData.cups === '1') {
            this.sqlData.cups = '中';
            this.sqlData.caffeine = 75 * this.sqlData.percent;
          } else if (this.formData.cups === '2') {
            this.sqlData.cups = '大';
            this.sqlData.caffeine = 150 * this.sqlData.percent;
          } else if (this.formData.cups === '3') {
            this.sqlData.cups = '超大';
            this.sqlData.caffeine = 225 * this.sqlData.percent;
          }
        } else if (this.formData.type === '3') {//摩卡
          this.sqlData.type = '摩卡';
          if (this.formData.cups === '1') {
            this.sqlData.cups = '中';
            this.sqlData.caffeine = 90 * this.sqlData.percent;
          } else if (this.formData.cups === '2') {
            this.sqlData.cups = '大';
            this.sqlData.caffeine = 175 * this.sqlData.percent;
          } else if (this.formData.cups === '3') {
            this.sqlData.cups = '超大';
            this.sqlData.caffeine = 185 * this.sqlData.percent;
          }
        } else if (this.formData.type === '4') {//馥芮白
          this.sqlData.type = '馥芮白';
          if (this.formData.cups === '1') {
            this.sqlData.cups = '中';
            this.sqlData.caffeine = 130 * this.sqlData.percent;
          } else if (this.formData.cups === '2') {
            this.sqlData.cups = '大';
            this.sqlData.caffeine = 195 * this.sqlData.percent;
          } else if (this.formData.cups === '3') {
            this.sqlData.cups = '超大';
            this.sqlData.caffeine = 260 * this.sqlData.percent;
          }
        } else if (this.formData.type === '5') {//冷萃
          this.sqlData.type = '冷萃';
          if (this.formData.cups === '1') {
            this.sqlData.cups = '中';
            this.sqlData.caffeine = 150 * this.sqlData.percent;
          } else if (this.formData.cups === '2') {
            this.sqlData.cups = '大';
            this.sqlData.caffeine = 225 * this.sqlData.percent;
          } else if (this.formData.cups === '3') {
            this.sqlData.cups = '超大';
            this.sqlData.caffeine = 300 * this.sqlData.percent;
          }
        }
      } else if (this.formData.brand === '2') {//瑞幸
        this.sqlData.brand = '瑞幸';
        this.sqlData.cups = '大';
        if (this.formData.type === '1') {
          this.sqlData.type = '美式';
          this.sqlData.caffeine = 225 * this.sqlData.percent;
        } else if (this.formData.type === '2') {
          this.sqlData.type = '拿铁';
          this.sqlData.caffeine = 150 * this.sqlData.percent;
        } else if (this.formData.type === '3') {
          this.sqlData.type = '摩卡';
          this.sqlData.caffeine = 175 * this.sqlData.percent;
        } else if (this.formData.type === '4') {
          this.sqlData.type = '澳瑞白';
          this.sqlData.caffeine = 190 * this.sqlData.percent;
        } else if (this.formData.type === '5') {
          this.sqlData.type = '加浓美式';
          this.sqlData.caffeine = 300 * this.sqlData.percent;
        }
      } else if (this.formData.brand === '3') {//麦当劳
        this.sqlData.brand = '麦当劳';
        this.sqlData.cups = '大';
        if (this.formData.type === '1') {
          this.sqlData.type = '美式';
          this.sqlData.caffeine = 125 * this.sqlData.percent;
        } else if (this.formData.type === '2') {
          this.sqlData.type = '拿铁';
          this.sqlData.caffeine = 125 * this.sqlData.percent;
        } else if (this.formData.type === '3') {
          this.sqlData.type = '摩卡';
          this.sqlData.caffeine = 140 * this.sqlData.percent;
        } else if (this.formData.type === '4') {
          this.sqlData.type = '冰醇咖啡';
          this.sqlData.caffeine = 225 * this.sqlData.percent;
        } else if (this.formData.type === '5') {
          this.sqlData.type = '卡布奇诺';
          this.sqlData.caffeine = 125* this.sqlData.percent;
        }
      }
      else if (this.formData.brand === '4') {//雀巢
        this.sqlData.brand = '雀巢';
        this.sqlData.cups = '正常';
        if (this.formData.type === '1') {
          this.sqlData.type = '醇品速溶';
          this.sqlData.caffeine = 70 * this.sqlData.percent;
        } else if (this.formData.type === '2') {
          this.sqlData.type = '金牌速溶';
          this.sqlData.caffeine = 70 * this.sqlData.percent;
        } else if (this.formData.type === '3') {
          this.sqlData.type = '1+2速溶';
          this.sqlData.caffeine = 50 * this.sqlData.percent;
        }
      }
      else if (this.formData.brand === '5') {//雀巢
        this.sqlData.brand = '其它';
        this.sqlData.cups = '正常';
        if (this.formData.type === '1') {
          this.sqlData.type = '胶囊咖啡';
          this.sqlData.caffeine = 60 * this.sqlData.percent;
        } else if (this.formData.type === '2') {
          this.sqlData.type = '可乐';
          this.sqlData.caffeine = 50 * this.sqlData.percent;
        } else if (this.formData.type === '3') {
          this.sqlData.type = '红茶';
          this.sqlData.caffeine = 105 * this.sqlData.percent;
        }
        else if (this.formData.type === '4') {
          this.sqlData.type = '功能饮料';
          this.sqlData.caffeine = 120 * this.sqlData.percent;
        }
      }
      if (this.formData.time === '') {
        this.formData.time = new Date();
      }
      this.$confirm('您选择了' + this.sqlData.brand + '的一杯' + this.sqlData.type + '，其杯型是：' + this.sqlData.cups + '杯，喝了' + this.sqlData.percent + '杯，大约含有咖啡因' + this.sqlData.caffeine.toFixed(2) + 'mg', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('Caffeine/AddCaffeineRecord', {
          "id": sessionStorage.getItem("loginid"),
          "time": this.formData.time,
          "brand": this.sqlData.brand,
          "type": this.sqlData.type,
          "size": this.sqlData.cups,
          "percent": this.sqlData.percent,
          "caffeine": this.sqlData.caffeine.toFixed(2),
        }).then(
            (data) => {
              if(data.data===true){
                this.$message({
                  type: 'success',
                  message: '提交成功'
                });
              }
              else {
                this.$message({
                  type: 'warning',
                  message: '您不能在同一时间引用两个饮品',
                });
              }
            },
            () => {
              this.$message({
                type: 'error',
                message: '提交错误',
              });

            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
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
</style>