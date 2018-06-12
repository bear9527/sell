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
import {urlParse} from 'common/js/util';
import header1 from 'components/header/header';
// import data from 'common/json/data.json';
export default {
  name: 'app',
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created () {
    const ERR_OK = 0;
    this.$http.get('/api/seller/?id=' + this.seller.id).then(response => {
      response = response.data;
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data);
        console.log(this.seller.id);
      }
      }, response => {});
      // GET /someUrl
    // this.$http.get('/api/seller').then(response => {
    //   const res = response.body;
    //   if (res.errno === 0) {
    //     this.seller = res.data;
    //   }
    // }, response => {
    // });
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
