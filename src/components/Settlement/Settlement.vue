<template>
  <div>
    <!-- 头部订单加返回 -->
    <div class="p-r" style="  border-bottom: 1px solid #999;">
      <div class="p-a box" @click="returns">
        <van-icon name="arrow-left" />
      </div>
      <div class="txt-c padding">订单消息</div>
    </div>
    <!--默认收货地址  -->
    <div v-if="this.length!=0">
      <div style="padding:5px">
        <div class="flex a-center">
          <div style="font-size:40px;margin-right:10px">
            <van-icon name="location-o" />
          </div>
          <div class="flex">
            <div>
              <div>收货人：{{this.num1.name}}</div>
              <div style="font-size:12px;margin:10px 0px">收货地址：{{this.num1.address}}</div>
              <div style="color:red;font-size:10px">(收货不便时，可选择免费收货服务)</div>
            </div>
            <div>{{this.num1.tel}}</div>
          </div>
          <div style="font-size:40px;margin-left:10px" @click="add">
            <van-icon name="arrow" />
          </div>
        </div>
        <div>
          <img src="../../assets/caitiao.jpg" alt />
        </div>
      </div>
    </div>
    <!--  -->
    <div v-else>
      <div class="slide txt-c" @click="add">添加地址：</div>
    </div>
    <!--商品信息  -->
    <div v-for="(item,index) in num" :key="index">
      <div class="flex j-around a-center" style="margin-top:10px">
        <div class="tu">
          <img :src="item.image_path" alt />
        </div>
        <div>
          <div style="font-size:12px;color:red">{{item.name}}</div>
          <div style="color:red;margin-top:15px">￥{{item.present_price*item.count}}</div>
        </div>
        <div>x{{item.count}}</div>
      </div>
    </div>
    <!-- 提交 -->
    <div>
      <van-submit-bar :price="zong*100" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
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
      num: [], //存储的数据
      num1: "", //地址
      idDirect: "", //直接购买为true,购物车结算为false
      ids: [], //所有商品的id
      address: "",
      yes: 0, //展示默认地址的值
      length: "" //判断是否有值
    };
  },
  methods: {
    //存放事件函数
    //结算
    onSubmit() {
      window.console.log(this.num.count);
      this.$api
        .payment({
          address: this.num1.address,
          tel: this.num1.tel,
          orderId: this.ids, //所有商品的id(数组)
          totalPrice: this.zong, //总价格
          idDirect: this.idDirect, //用来判断是购物车结算还是直接购买(直接购买为true,购物车结算为false)
          count: this.num[0].count //商品数量
        })
        .then(res => {
          window.console.log(res);
          Toast(res.msg);
          this.$router.go(-1);
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //去添加地址页面
    add() {
      this.$router.push("/Add");
    },
    //返回上一层
    returns() {
      this.$router.go(-1);
    }
  },
  mounted() {
    //挂载或者调用
    //取出里面的值
    if (JSON.parse(localStorage.getItem("bapo")).length > 0) {
      this.num = Array.from(JSON.parse(localStorage.getItem("bapo")));
      this.idDirect = this.num[0].idDirect;
      this.num.map(item => {
        this.ids.push(item.cid);
      });
    } else {
      this.num.push(JSON.parse(localStorage.getItem("bapo")));
      this.idDirect = this.num[0].idDirect;
      this.ids.push(this.num[0].id);
    }
    console.log(this.num);
    //默认地址请求
    this.$api
      .default()
      .then(res => {
        this.num1 = res.defaultAdd;
      })
      .catch(err => {
        console.log(err);
      });
    //查询用户地址
    this.$api
      .Receiving()
      .then(res => {
        this.length = res.address.length;
        console.log(this.length);
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
    //总价
    zong() {
      let a = 0;
      if (this.num.length > 0) {
        this.num.map(item => {
          a += item.present_price * item.count;
        });
      }
      return a;
    }
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
.tu {
  width: 100px;
}
.box {
  top: 20px;
  left: 20px;
  font-size: 20px;
}
.slide {
  text-decoration: underline;
  width: 100vw;
  height: 15vh;
  line-height: 15vh;
  color: #22a7f2;
}
</style>