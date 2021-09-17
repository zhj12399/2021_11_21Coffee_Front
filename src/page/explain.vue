<template>
  <div class="fillcontain">
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">关于</header>
    </section>
    <p class="explain_text">一款可记录咖啡因的网站</p>
    <p class="explain_text">所有数据均来自于公布数据</p>
    <p class="explain_text">由于个人体质等条件不同，数据仅供参考</p>

    <p class="explain_text">作者：zhj12399</p>
    <p class="explain_text">作者邮箱：zhj727534681@163.com</p>
  </div>
</template>

<script>
import headTop from '../components/headTop'
export default {
  components: {
    headTop,
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
}
.explain_text{
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
}
</style>