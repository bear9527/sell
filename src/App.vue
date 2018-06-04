<template>
  <div id="app">
        <!-- 头部 -->
    <v-header :seller="seller"></v-header>
    <!-- 主体切换 -->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link v-bind:to="'/goods'">
          商品

        </router-link>

      </div>
      <div class="tab-item">
        <router-link to="/ratings">
          评论
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">
          商家
        </router-link>
      </div>
    </div>
    <!-- 头部 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header1 from 'components/header/header';
// import data from 'common/json/data.json';
export default {
  name: 'app',
  data () {
    return {
      seller: {}
    };
  },
  created () {
      // GET /someUrl
    this.$http.get('/api/seller').then(response => {
      // get body data
      const res = response.body;
      if (res.errno === 0) {
        this.seller = res.data;
      }
    }, response => {
      // error callback
    });

    // this.seller = data.seller;
  },
  components: { 'v-header': header1 }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/index.styl';
.tab
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-1px(rgba(7, 17, 27, 0.1));
  .tab-item
    flex: 1;
    text-align: center;
    a
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
    .active
      color: rgb(240, 20, 20);
</style>
