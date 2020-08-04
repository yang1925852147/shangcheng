<template>
  <!-- 底部标签 -->
  <div>
    <div>
      <router-view></router-view>
    </div>
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" @click="box">商城</van-tabbar-item>
        <van-tabbar-item icon="notes-o" @click="box1">分类</van-tabbar-item>
        <van-tabbar-item icon="cart-o" @click="box2" :badge="this.num3.length">购物车</van-tabbar-item>
        <van-tabbar-item icon="manager-o" @click="box3">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "Public",
  props: {
    //接收父组件传值
  },
  components: {
    //注册组件
  },
  data() {
    return {
      //数据
      active: 0,
      num3: []
    };
  },
  methods: {
    //存放事件函数
    //.catch(error => error)解决冗余导航的方法
    box() {
      this.$router.push("/").catch(error => error);
    },
    box1() {
      this.$router.push("/Classification").catch(error => error);
    },
    box2() {
      this.$router.push("/Shopping").catch(error => error);
    },
    box3() {
      this.$router.push("/My").catch(error => error);
    }
  },
  mounted() {
    //挂载
    //购物车数据
    if (JSON.parse(localStorage.getItem("用户名"))) {
      this.$api
        .query()
        .then(res => {
          this.num3 = res.shopList;
          console.log(this.num);
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
</style>