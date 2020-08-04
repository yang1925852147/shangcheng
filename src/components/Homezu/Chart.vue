<template>
  <!-- 轮播图以及分类展示 -->
  <div>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in num" :key="index">
        <div style="width:100vw;height:170px" @click="go(index)">
          <img v-lazy="image.image" />
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 分类展示 -->
    <div class="flex j-center a" style="background: white; padding:10px;margin-top:10px  ">
      <div v-for="(item,index) in num1" :key="index">
        <div class="room" @click="click(index)">
          <img :src="item.image" alt class="box" />
          <br />
          {{item.mallCategoryName}}
        </div>
      </div>
    </div>
    <div style="margin-top:10px">
      <img :src="this.num2" alt />
    </div>
  </div>
</template>

<script>
import { Lazyload } from "vant";
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
      num1: "",
      num2: ""
    };
  },
  methods: {
    //存放事件函数
    //详情页跳转以及传参
    go(index) {
      this.$router.push({
        path: "/Details",
        query: {
          id: this.num[index].goodsId
        }
      });
    },
    //分类页跳转以及传参
    click(index) {
      this.$router.push({
        path: "/Classification",
        query: {
          indexs: index
        }
      });
    }
  },
  mounted() {
    //挂载
    //首页数据
    this.$api
      .getHomeDate()
      .then(res => {
        this.num = res.data.slides;
        this.num1 = res.data.category;
        this.num2 = res.data.advertesPicture.PICTURE_ADDRESS;
        console.log(this.num);
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
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
img {
  width: 100%;
}
.box {
  width: 50px;
}
.room {
  margin: 0 10px;
  font-size: 12px;
}
.a {
  border-radius: 30px;
}
</style>