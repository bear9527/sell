<template>
<div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li v-for="(item,index) in goods" :key="item.num" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)">
        <span class="text border-1px">
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodsWrapper">
    <ul>
      <li v-for="item in goods" :key="item.num" class="food-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li @click="selectFood(food, $event)" v-for='food in item.foods' :key="food.num" class="food-item">
            <div class="icon"><img width="57" height="57" :src="food.icon"></div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span>月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}份</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="cartcontrolWrapper">
                <cartcontrol :food="food" @increment="incrementTotal"></cartcontrol>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <shopcart ref="shopcart" :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-Price="seller.minPrice"></shopcart>
  <food :food="selectedFood" ref="food"></food>
</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shopcart from 'components/shopcart/shopcart';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import food from 'components/foods/foods';

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  name: 'goods',
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    this.$http.get('/api/goods').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      });
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu (index, event) {
      // debugger;
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 300);
    },
    _drop (target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    incrementTotal (target) {
      this.$refs.shopcart.drop(target);
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i];
        let height2 = this.listHeight[ i + 1 ];
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods () {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';
  .goods
    display: flex
    position: absolute
    top:174px
    bottom: 46px
    width:100%
    overflow:hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
    .menu-item
      display:table
      height: 54px
      width:56px
      line-height:14px
      padding:0 12px
      .icon
        display:inline-block
        vertical-align:top
        width:12px
        height:12px
        background-size:12px 12px
        background-repeat:no-repeat
        margin-right:4px
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display:table-cell
        width:56px
        vertical-align:middle
        line-height:12px
        font-size:12px
        border-1px(rgba(7, 17, 27, 0.1));
    .current
      position:relative
      z-index:10
      margin-top:-1px
      background:#fff
      font-weight:700
      .text
        border-none()

    .foods-wrapper
      flex:1
      .title
        padding-left:14px
        height:26px
        line-height:26px
        border-left:2px solid #d9dde1
        font-size:12px
        color: rgb(147,153,159)
        background:#f3f5f7
      .food-item
        display:flex
        margin:18px
        padding-bottom:18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom:0
          // padding-bottom:0
        .icon
          flex: 0 0 57px
          margin-right:10px
        .content
          flex:1
          .name
            margin:2px 0 8px 0
            height:14px
            line-height:14px
            font-size:14px
            color:rgb(7,17,27)
          .desc,.extra
            line-height:10px
            font-size:10px
            color:rgb(147,153,159)
          .desc
            margin-bottom: 8px
            line-height:12px
          .extra
            .count
              margin-right: 12px
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
          .cartcontrolWrapper
            position:absolute
            right:0
            bottom:12px
</style>
