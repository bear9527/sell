<template>
<div class="seller" ref="mySeller">
  <div class="seller-wrapper">
    <div class="seller-header">
      <div class="header-left">
        <h1 class="header-title">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="36" :score="seller.score"></star><span class="rat">({{seller.ratingCount}})</span>月售{{seller.sellCount}}单
        </div>
      </div>
      <div class="header-right">
        <span class="icon-favorite"></span>
        <h2 class="shoucang">快收藏</h2>
      </div>
      <span class="hx border-1px"></span>
      <div class="header-bottom">
        <div class="bottom-item">
          <h2>起送价</h2>
          <span class="big-text">{{seller.minPrice}}</span>元
        </div>
        <div class="bottom-item borderlr">
          <h2>商家配送</h2>
          <span class="big-text">{{seller.deliveryPrice}}</span>元
        </div>
        <div class="bottom-item">
          <h2>平均配送时间</h2>
          <span class="big-text">{{seller.deliveryTime}}</span>元
        </div>
      </div>
    </div>
    <split></split>
    <div class="seller-conent">
      <h1 class="title">公告与活动</h1>
      <p class="bulletin">{{seller.bulletin}}</p>
      <ul v-show="seller.supports">
        <li v-for="(item, index) in seller.supports" :key="item.num">
          <i class="icon" :class="classMap[seller.supports[index].type]"></i>{{item.description}}</li>
      </ul>
    </div>
    <split></split>
    <div class="real-scene">
      <h1 class="title">商家实景</h1>
      <div class="pic-wrapper" ref="picWrapper">
        <ul v-show="seller.pics">
          <li v-for="item in seller.pics" :key="item.num"><img :src="item"></li>
        </ul>
      </div>
    </div>
    <split></split>
    <div class="real-info">
      <h1 class="title">商家信息</h1>
      <ul v-show="seller.infos">
        <li v-for="item in seller.infos" :key="item.num">{{item}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import star from 'components/star/star';
import split from 'components/split/split';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    };
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.mySeller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
      if (!this.picWrapper) {
        console.log(this.picWrapper);
        this.picWrapper = new BScroll(this.$refs.picWrapper, {
          click: true,
          scrollX: true,
          eventPassthrough: 'vertical'
        });
      } else {
        this.picWrapper.refresh();
      }
    }
  },
  ready () {
    this._initScroll();
  },
  created () {
    // this.$http.get('/api/seller/').then(response => {
    //   console.log(response);
    // },response => {
    // });
    // this.$nextTick(() => {
    //   if (!this.scroll) {
    //     this.scroll = new BScroll(this.$refs.seller, {
    //       click: true
    //     });
    // console.log(this.$refs.sellers);
    //   } else {
    //     this.scroll.refresh;
    //   }
    // });
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  components: {
    star,
    split
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  .seller
    position:absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .seller-wrapper
      .seller-header
        padding:18px
        .hx
          display:inline-block
          width:100%
          border-1px(rgba(7,17,27,0.1))
        .header-left
          float:left
          .header-title
            font-size:14px
            color:rgb(7,17,27)
            line-height:14px
          .star-wrapper
            font-size:10px
            color:rgb(77,85,93)
            line-height:18px
            margin-top:8px
            .star
              float:left
              line-height:30px
            .rat
              margin:0 12px 0 8px
        .header-right
          float:right
          text-align:center
          .icon-favorite
            color:#ccc
            font-size:24px
            color:rgb(240,20,20)
            line-height:24px
          .shoucang
            font-size:10px
            color:rgb(77,85,93)
            line-height:10px
            margin-top:4px
        .header-bottom
          display:flex
          margin-top:18px
          text-align:center
          .borderlr
            border-left:1px solid rgba(7,17,27,0.1)
            border-right:1px solid rgba(7,17,27,0.1)
          .bottom-item
            flex:1
            font-size:10px
            h2
              margin-bottom:4px
              font-size:10px
              color:rgb(147,153,159)
            .big-text
              display:inline-block
              font-size:24px
              font-weight:200
              color:rgb(7,17,27)
              line-height:24px
      .seller-conent
        padding:18px
        .title
          font-size:14px
          color:rgb(7,17,27)
          line-height:14px
        .bulletin
          padding: 8px 12px 16px 12px
          font-size:12px
          font-size:200
          color:rgb(240,20,20)
          line-height:24px
          border-1px(rgba(7,17,27,0.1))
        .icon
          display:inline-block
          vertical-align:top
          height:16px
          width:16px
          background-size:12px 12px
          background-repeat:no-repeat
        .decrease
          bg-image('decrease_4')
        .discount
          bg-image('discount_4')
        .guarantee
          bg-image('guarantee_4')
        .invoice
          bg-image('invoice_4')
        .special
          bg-image('special_4')
        ul
          font-size:12px
          font-weight:200
          color:rgb(7,17,27)
          line-height:12px
          li
            padding:16px 12px
            border-1px(rgba(7,17,27,0.1))
          li:last-child:after
            border:none
            display:none
          li:last-child
            padding-bottom:0px
      .real-scene
        padding:18px
        .title
          font-size:14px
          color:rgb(7,17,27)
          line-height:14px
          padding-bottom:12px
        .pic-wrapper
          width:100%
          height:90px
          white-space: nowrap
          overflow:hidden
          ul
            font-size:0
            li
              display:inline-block
              height:90px
              width:120px
              margin-right:6px
              img
                width:100%
                height:100%
      .real-info
        padding:18px
        .title
          font-size:14px
          color:rgb(7,17,27)
          line-height:14px
          padding-bottom:12px
          border-1px(rgba(7,17,27,0.1))
        ul
          font-size:12px
          font-weight:200
          color:rgb(7,17,27)
          line-height:16px
          li
            padding:16px 12px
            border-1px(rgba(7,17,27,0.1))
</style>
