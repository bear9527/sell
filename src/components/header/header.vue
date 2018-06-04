<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name" v-html="seller.name"></span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>

    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail" transition="fade">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="item.num">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <div class="content">
                {{seller.bulletin}}
              </div>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <span class="icon-close">
                </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from 'components/star/star';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail () {
      this.detailShow = true;
    },
    hideDetail () {
      this.detailShow = false;
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  },
  components: {
    star: star
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import"../../common/stylus/mixin";
  @import "../../common/stylus/style.css";
  .header
    position:relative
    color:#fff;
    background: rgba(7,17,27,0.5)
    overflow:hidden
    .content-wrapper
      position:relative
      padding: 24px 12px 18px 24px;
      font-size:0;
      .avatar
        display: inline-block;
        vertical-align:top
        img
          border-radius:2px
      .content
        font-size:14px;
        margin-left:16px;
        display: inline-block;
        .title
          margin:2px 0 8px 0
          .brand
            width:30px
            height:18px
            display:inline-block
            vertical-align:top
            bg-image('brand')
            background-size:30px 18px
            background-repeat:no-repeat
          .name
            margin-left:6px
            font-size:16px
            line-height:18px
            font-weight:bold
        .description
          margin-bottom:10px
          line-height:12px
          font-size:12px
        .support
          margin-top:10px
          font-size:0px;
          .icon
            display:inline-block
            vertical-align:top
            width:12px
            height:12px
            background-size:12px 12px
            background-repeat:no-repeat
            margin-right:4px
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height:12px
            font-size:10px
      .support-count
        position:absolute
        right:12px
        bottom:13px
        border-radius:14px
        padding:7px 8px
        height:14px
        // width:30px
        background-color:rgba(0,0,0,0.2)
        text-align:center;
        .count
          font-size:10px
          color:rgb(255,255,255);
          line-height:12px
          font-size:10px
        .icon-zuoyoujiantou
          margin-left:2px
          line-height:14px
          font-size:10px
    .bulletin-wrapper
      position:relative
      height:28px
      line-height:28px
      padding:0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow:ellipsis
      background: rgba(7,17,27,0.2)
      .bulletin-title
        margin-top:9px
        vertical-align:center
        display: inline-block
        width: 22px
        height:12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat:no-repeat
      .bulletin-text
        vertical-align:top
        margin:0 4px
        font-size:10px
      .icon-zuoyoujiantou
        position:absolute
        right:14px
        top:8px
        line-height:14px
        font-size:10px
    .background
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter: blur(10px)
    .detail
      position:fixed
      top:0
      left:0
      z-index:100
      width:100%
      height:100%
      overflow:auto
      background:rgba(7,17,27,0.8)
      -webkit-backdrop-filter blur(10px)
      &.fade-enter-active
        animation: bounce-in .1s;
      &.fade-leave-active
        animation: bounce-out .1s;
      @keyframes bounce-in {
        0% {
          background:rgba(7,17,27,0.1)
        }
        25% {
          background:rgba(7,17,27,0.3)
        }
        50% {
          background:rgba(7,17,27,0.5)
        }
        75% {
          background:rgba(7,17,27,0.6)
        }
        100% {
          background:rgba(7,17,27,0.8)
        }
      }
      @keyframes bounce-out {
        0% {
          background:rgba(7,17,27,0.8)
        }
        25% {
          background:rgba(7,17,27,0.6)
        }
        50% {
          background:rgba(7,17,27,0.5)
        }
        75% {
          background:rgba(7,17,27,0.3)
        }
        100% {
          background:rgba(7,17,27,0.0)
        }
      }
      .detail-wrapper
        min-height:90%
        width: 100%
        .detail-main
          padding-bottom:64px
          margin-top:64px
          .name
            line-height:16px
            text-align:center
            font-size:16px
            font-weight:700
          .star-wrapper
            margin-top:18px
            padding:2px 0
            text-align:center
          .title
            display:flex
            width:80%
            margin:28px auto 24px auto
            .line
              flex:1
              position: relative
              top: -6px
              border-bottom:1px solid rgba(255,255,255,0.2)
            .text
              padding:0 12px
              font-weight:700
              font-size: 14px
          .supports
            width:80%
            margin:0 auto
            .support-item
              padding:0 12px
              margin-bottom:12px
              font-size:0
              :last-child
                margin-bottom:0px
              .icon
                display:inline-block
                width:16px
                height:16px
                vertical-align:top
                margin-right:6px
                background-size:16px 16px
                background-repeat:no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height: 16px
                font-size:12px
          .bulletin
            width:80%
            margin:0 auto
            .content
              padding: 0 12px
              line-height:24px
              font-size: 12px
      .detail-close
        position:relative
        width: 32px
        height:32px
        margin: -64px auto 0 auto
        clear:both
        font-size:32px
</style>
