<template>
<div class="ratings" ref="myRating">
  <div>
    <div class="ratingtitle">
      <div class="titleleft">
        <h1 class="left1">{{seller.score}}</h1>
        <div class="left2">综合评分</div>
        <div class="left3">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="titleright">
        <div class="score-wrapper">
          <span class="title">服务态度</span>
          <star :size="36" :score="seller.serviceScore"></star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">商品评分</span>
          <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="delivery-wrapper">
          <span class="title">送达时间</span>
          <span class="delivery">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect :select-type="selectType" :only-content="onlycontent" :ratings="ratings" @ratingtype="ratingtypeTotal" @onlycontent="swichtotal">
    </ratingselect>
    <div class="rating-wrapper border-1px">
      <ul>
        <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" :key="rating.num" class="rating-item">
          <div class="avatar">
            <img class="avatar" width="28" height="28" :src="rating.avatar">
          </div>
          <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">
                  {{rating.deliveryTime}}
                </span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
                <i class="icon-thumb_up"></i>
                <span class="item" v-for="item in rating.recommend" :key="item.num">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
        </li>
      </ul>
      <div class="notrating" v-show="ratings.length == 0 || !ratings.length">暂无评价
      </div>
    </div>
  </div>
</div>
</template>

<script>
import star from 'components/star/star';
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';
import {formatDate} from '../../common/js/date';
import BScroll from 'better-scroll';

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlycontent: true
    };
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.myRating, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
    },
    needShow (type, text) {
      if (this.onlycontent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    ratingtypeTotal (type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    swichtotal (str) {
      this.onlycontent = str;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  watch: {
    'seller' () {
      this._initScroll();
    }
  },
  created () {
    this.$http.get('/api/ratings').then(response => {
      // get body data
      const res = response.body;
      if (res.errno === 0) {
        this.ratings = res.data;
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    }, response => {
      // error callback
    });
  },
  ready () {
    console.log(this.seller);
  },
  filters: {
    formatDate (time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    star,
    split,
    ratingselect
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .ratings
    position:absolute
    top:174px
    bottom:0
    left:0
    width:100%
    overflow:hidden
    .ratingtitle
      display:flex
      padding: 18px 0
      .titleleft
        flex:0 0 137px
        width:137px
        padding:6px 0
        text-align:center
        border-right:1px solid rgba(7,17,27,0.1)
        @media only screen and (max-width: 320px)
          flex:0 0 120px
          width:120px
        .left1
          display:inline-block
          font-size:24px
          color:rgb(255,153,0)
          line-height:28px
          margin-bottom: 12px
        .left2
          font-size:12px
          color:rgb(7,17,27)
          line-height:12px
          margin-bottom:8px
        .left3
          font-size:10px
          color:rgb(147,153,159)
          line-height:10px
          margin-bottom: 6px
      .titleright
        flex:1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding: 6px 0 6px 6px
        .score-wrapper
          line-height:18px
          margin-top:8px
          font-size:0
          .title
            display:inline-block
            vertical-align:top
            line-height:18px
            font-size:12px
            color:rgb(7,17,27)
          .star
            display:inline-block
            margin: 0 12px
            vertical-align:top
          .score
            display: inline-block
            vertical-align: top
            line-height:18px
            font-size:12px
            color:rgb(266,153,0)
        .delivery-wrapper
          font-size:0
          .title
            display: inline-block
            vertical-align:top
            line-height:18px
            font-size:12px
            color:rgb(7,17,27)
          .delivery
            display:inline-block
            margin-left:12px
            vertical-align:top
            line-height:18px
            font-size:12px
            color:rgb(147,153,159)
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(1, 17, 27, 0.1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            line-height 12px
            font-weight 700
            font-size 10px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              margin-right 16px
              vertical-align top
            .delivery
              display inline-block
              vertical-align top
              font-size 10px
              line-height 12px
              color rgb(147, 153, 159)
          .text
            line-height 18px
            color rgb(7, 17, 27)
            font-size 12px
            margin-bottom 8px
          .recommend
            line-height 16px
            font-size 0
            .iconfont, .item
              display inline-block
              margin 0 8px 4px 0
              font-size 9px
            .iconfont
              color rgb(0, 160, 220)
            .item
              padding 0 6px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 1px
              color rgb(147, 153, 159)
              background #fffff
          .time
            position absolute
            top 0
            right 0
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
</style>
