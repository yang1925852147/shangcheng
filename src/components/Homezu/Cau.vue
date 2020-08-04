<template>
  <!-- 热销商品 -->
  <div>
    <div class="box">热销商品</div>
    <div class="flex f-wrap">
      <div v-for="(item,index) in caua" :key="index" class="box1">
        <div @click="go(index)">
          <div>
            <img :src="item.image" alt />
          </div>
          <div
            style="white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;"
          >{{item.name}}</div>
          <div class="flex j-center a-center">
            <div style="font-size:16px">￥{{item.mallPrice}}</div>
            <div
              style="  color:red;
                       font-size: 12px;
                       text-decoration: line-through;
                       margin-left:10px"
            >￥{{item.price}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    //接收父组件传值
    caua: {
      type: Array
    }
  },
  components: {
    //注册组件
  },
  data() {
    return {
      //数据
    };
  },
  methods: {
    //存放事件函数
    //详情页跳转以及传参
    go(index) {
      this.$router.push({
        path: "/Details",
        query: {
          id: this.caua[index].goodsId
        }
      });
    }
  },
  mounted() {
    //挂载
    console.log(this.caua);
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
  color: red;
  text-align: center;
}
.box1 {
  width: 46vw;
  background: white;
  border-top: 1px solid #999;
  border-right: 1px solid #999;
  border-bottom: 1px solid #999;
}
img {
  width: 100%;
}
</style>