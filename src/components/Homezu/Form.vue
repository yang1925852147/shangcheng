<template>
  <!-- 平面滑动 -->
  <div>
    <div class="room">商品列表</div>
    <div class="flex box" ref="asd">
      <div class="flex">
        <div v-for="(item,index) in this.num" :key="index">
          <div style="font-size:8px;  background: white; " class="boos">
            <div @click="go(index)">
              <img :src="item.image" alt />
            </div>
            <div class="a">{{item.goodsName}}</div>
            <div class="flex j-center a-center">
              <div>￥{{item.mallPrice}}</div>
              <div class="llj">￥{{item.price}}</div>
            </div>
            <div class="flex en">
              <div class="en1" @click="gotu(item.goodsId)">
                <van-icon name="shopping-cart-o" />
              </div>
              <div class="en2" @click="go(index)">查看详情</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import BScroll from "better-scroll";
export default {
  name: "",
  props: {
    //接收父组件传值
  },
  components: {
    //注册组件
  },
  data() {
    return {
      //数据
      num: ""
    };
  },
  methods: {
    //存放事件函数
    //加入购物车
    gotu(item) {
      if (JSON.parse(localStorage.getItem("用户名"))) {
        this.$api
          .join(item)
          .then(res => {
            Toast.success("加入成功");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Toast("请先登陆");
      }
    },
    //详情页跳转以及传参
    go(index) {
      this.$router.push({
        path: "/Details",
        query: {
          id: this.num[index].goodsId
        }
      });
    }
  },
  mounted() {
    //挂载
    //平滑数据
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.asd, {
        startX: 0,
        click: true,
        scrollX: true
      });
    });
    //首页数据
    this.$api
      .getHomeDate()
      .then(res => {
        this.num = res.data.recommend;
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    //监听
  },
  computed: {
    //计算属性
  },
  filters: {
    //过滤器
  }
};
</script>

<style scoped lang='scss'>
img {
  width: 100%;
}
.box {
  overflow: hidden;
}
.room {
  background: white;
  padding: 5px;
  font-size: 12px;
}
.boos {
  width: 32vw;
  border-bottom: 1px solid #999;
  border-top: 1px solid #999;
  border-right: 1px solid #999;
}
.llj {
  color: #999;
  text-decoration: line-through;
  margin-left: 10px;
  font-size: 4px;
}
.en {
  height: 30px;
  margin-top: 10px;
  .en1 {
    background: #feca3a;
    flex: 1;
    border-radius: 15px 0 0 15px;
    line-height: 35px;
    color: white;
    text-align: center;
    font-size: 22px;
  }
  .en2 {
    background: #ff4c38;
    flex: 2;
    border-radius: 0 15px 15px 0;
    text-align: center;
    line-height: 30px;
    color: white;
  }
}
.a {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>