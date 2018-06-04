<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartControl-wrapper">
            <cartControl :food="food"></cartControl>
          </div>
          <transition name='buy'>
            <div class="buy" @click.stop.prevent="addFirst($event)"
            v-show="!food.count || food.count === 0">
              加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split v-show="food.info"></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlycontent" :desc="desc" :ratings="food.rating"></ratingselect>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll';
import cartControl from 'components/cartcontrol/cartcontrol';
import Vue from 'vue';
import ratingselect from 'components/ratingselect/ratingselect';
import split from 'components/split/split';

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlycontent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  methods: {
    show () {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide () {
      this.showFlag = false;
    },
    addFirst (event) {
      if (!event._constructed) { return; }
      Vue.set(this.food, 'count', 1);
    }
  },
  created () {
  },
  components: {
    cartControl,
    ratingselect,
    split
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index:30
    width:100%
    background:#fff
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
      transform:translate3d(0,0,0)
    &.move-enter, &.move-leave
      transition: all 0.2s linear
      opacity: 0
      transform: translate3d(100%,0,0)
    .image-header
      position:relative
      width:100%
      height:0
      padding-top:100%
      img
        position: absolute
        top:0
        width:100%
        height:100%
      .back
        position:absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size:20px
          color:#fff
    .content
      position: relative;
      padding:18px
      .title
        line-height:14px
        margin-bottom:8px
        font-size:14px
        font-weight:700
        color:rgb(7,17,27)
      .detail
        margin-bottom:18px
        line-height:10px
        font-size:0px
        .sell-count,.rating
          font-size:10px
          color:rgb(147,153,159)
        .sell-count
          margin-right:12px
      .price
        font-weight:700
        line-height:24px
        .now
          margin-right:8px
          font-size:14px
          color:rgb(240,20,20)
        .old
          text-decoration: line-through
          font-size:10px
          color:rgb(147,153,159)
      .cartControl-wrapper
        position: absolute
        right:12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding:0 12px
        box-sizing:border-box
        border-radius: 12px
        font-size: 10px
        color:#fff
        background: rgb(0,160,220)
        &.buy-enter-active, &.buy-leave-active
          transition: all 0.2s
          opacity: 1
        &.buy-enter,&.buy-leave-active{
          opacity:0
        }
    .info
      padding:18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color:rgb(7,17,27)
      .text
        margin: 6px 8px 0 8px
        font-size: 12px
        font-weight: 200
        color: rgb(77,85,93)
        line-height: 24px
</style>
