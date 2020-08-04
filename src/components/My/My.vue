<template>
  <div>
    <div class="txt-c">会员中心</div>
    <div class="box flex j-center a-center p-r padding">
      <div v-if="yes===0">
        <div>
          <div>
            <div class="box1 b" style="margin-left:10px">
              <img src="../../assets/timg.jpg" alt />
            </div>
            <div class="txt-c">
              <div style="color:white; margin-top:10px" @click="lend">登陆/注册</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          <div class="box1 b" style="margin-left:10px">
            <img :src="this.num.avatar" alt />
          </div>
          <div class="txt-c" style="font-size:30px;margin-top:10px">欢迎你：{{this.num.nickname}}</div>
          <div class="txt-c">
            <div style="color:white; margin-top:10px" @click="out">退出登陆</div>
          </div>
        </div>
      </div>
      <!-- 设置 -->
      <div class="box2 p-a" @click="set">
        <van-icon name="setting-o" />
      </div>
    </div>
    <!-- 查看栏 -->
    <div>
      <van-grid column-num="5">
        <van-grid-item icon="pending-payment" text="待付款" @click="complete4" />
        <van-grid-item icon="idcard" text="待发货" @click="complete3" />
        <van-grid-item icon="logistics" text="待收货" @click="complete2" />
        <van-grid-item icon="orders-o" text="评价" @click="evaluate" :badge="this.length" />
        <van-grid-item icon="points" text="已完成" :badge="this.wancheng.length" @click="complete" />
      </van-grid>
    </div>
    <!-- 下拉拦 -->
    <div>
      <van-cell-group>
        <van-cell title="全部订单" icon="records" @click="order" />
        <van-cell title="收藏商品" icon="points" @click="collection" />
        <van-cell title="地址管理" icon="cash-on-deliver" @click="address" />
        <van-cell title="最近浏览" icon="paid" @click="browse" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
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
      num: "",
      // activeNames: ["0"],
      yes: 1,
      length: "", //未评价的数量
      wancheng: "" //已完成的订单长度
    };
  },
  methods: {
    //存放事件函数
    //已完成
    complete() {
      this.$router.push({
        path: "/Order",
        query: {
          index: 4
        }
      });
    },
    //待收货
    complete2() {
      this.$router.push({
        path: "/Order",
        query: {
          index: 3
        }
      });
    },
    //待发货
    complete3() {
      this.$router.push({
        path: "/Order",
        query: {
          index: 2
        }
      });
    },
    //待支付
    complete4() {
      this.$router.push({
        path: "/Order",
        query: {
          index: 1
        }
      });
    },
    //评价
    evaluate() {
      this.$router.push("/Evaluate");
    },
    //订单
    order() {
      this.$router.push("/Order");
    },
    //地址管理
    address() {
      this.$router.push("/Add");
    },
    //收藏页面
    collection() {
      this.$router.push("/Collection");
    },
    //登陆页面
    lend() {
      this.$router.push("/lend");
    },
    //退出登陆
    out() {
      this.yes = 0;
      localStorage.removeItem("用户名");
      this.$api
        .out()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //设置页面
    set() {
      this.$router.push("/Personal");
    },
    //历史浏览
    browse() {
      this.$router.push("/Browse");
    }
  },
  mounted() {
    //挂载或者调用
    if (JSON.parse(localStorage.getItem("用户名"))) {
      this.yes = 1;
    } else {
      this.yes = 0;
    }

    //用户信息
    this.$api
      .obtain()
      .then(res => {
        this.num = res.userInfo;
        console.log(res.userInfo);
      })
      .catch(err => {
        console.log(err);
      });
    //未评价的数据
    this.$api
      .Not()
      .then(res => {
        this.length = res.data.count;
        console.log(res);
      })
      .catch(err => {});
    //已评价的数据
    if (JSON.parse(localStorage.getItem("用户名"))) {
      this.$api
        .queryss()
        .then(res => {
          this.wancheng = res.list;

          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
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
.box {
  height: 70vw;
  background: #e30c7b;
  .box1 {
    width: 30vw;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .box2 {
    right: 10px;
    top: 10px;
    font-size: 30px;
    color: white;
  }
}
.asd {
  img {
    width: 100%;
  }
}
</style>