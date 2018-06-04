<template>
  <div class="cartcontrol">
    <transition name="fade">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
      <transition name="inner">
        <span class="inner icon-remove_circle_outline"></span>
      </transition>
    </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0 ">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
        food: {
          type: Object
        }
      },
      methods: {
        addCart (event) {
          if (!event._constructed) {
            // 去掉自带click事件的点击
            return;
          }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count++;
          }
          this.$emit('increment', event.target);
        },
        decreaseCart (event) {
          if (!event._constructed) {
            // 去掉自带click事件的点击
            return;
          }
          this.food.count--;
        }
      }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding:6px
      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.4s linear
      }
      &.fade-enter, &.fade-leave-active {
        opacity: 0
        transform translate3d(24px, 0, 0)
      }
      .inner
        display inline-block
        line-height 24px
        font-size 24px
        vertical-align top
        color rgb(0, 160, 220, 0.2)
        &.inner-enter-active, &.inner-leave-active {
          transition: all 0.4s linear
          transform: rotate(0)
        }
        &.inner-enter, &.inner-leave-active {
          opacity: 0
          transform  rotate(180deg)
        }
    .cart-count
      display:inline-block
      vertical-align: top
      width: 12px
      padding-top:6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147,153,159)
    .cart-add
      display: inline-block
      vertical-align: top
      color: rgb(0,160,220)
      padding: 6px
      line-height: 24px
      font-size: 24px
</style>
