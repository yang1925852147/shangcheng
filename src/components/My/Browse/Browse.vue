<template>
  <div>
    <div class="p-r">
      <div class="p-a box" @click="returns">
        <van-icon name="arrow-left" />
      </div>
      <div class="txt-c padding">历史浏览</div>
    </div>
    <div v-for="(item,index) in num" :key="index">
      <div>
        <van-card :price="item.present_price" :title="item.name" :thumb="item.image">
          <template #footer>
            <van-button size="mini" @click="click">按钮</van-button>
          </template>
        </van-card>
      </div>
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
      num: ""
    };
  },
  methods: {
    //存放事件函数
    //删除一个历史浏览
    click() {
      localStorage.removeItem("商品");
    },
    //返回上一层
    returns() {
      this.$router.go(-1);
    }
  },
  mounted() {
    //挂载或者调用
    this.num = JSON.parse(localStorage.getItem("商品"));
    console.log(this.num);
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
  top: 20px;
  left: 20px;
  font-size: 20px;
}
</style>