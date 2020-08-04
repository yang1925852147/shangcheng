<template>
  <!-- 3个F的食品 -->
  <div v-if="num.length">
    <div class="flex j-center">
      <div class="yuan">
        <slot name="a"></slot>
      </div>
      <div class="yuan1">
        <slot name="b"></slot>
      </div>
    </div>
    <!-- 图片 -->
    <div class="box">
      <div v-for="(item,index) in num" :key="index" class="box_liter">
        <div>
          <img :src="item.image" alt @click="go(index)" />
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
    num: {
      type: Array
    }
  },
  components: {
    //注册组件
  },
  data() {
    return {
      //数据
      id: ""
    };
  },
  methods: {
    //存放事件函数
    //详情页跳转以及传参
    go(index) {
      this.id = this.num[index].goodsId;
      this.$router.push({
        path: "/Details",
        query: {
          id: this.id
        }
      });
    }
  },
  mounted() {
    //挂载
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
.yuan {
  background: #e0322b;
  color: white;
  border-radius: 50%;
  text-align: center;
}
img {
  width: 98%;
}
.box {
  display: grid; //设置网格布局
  grid-template-rows: 1fr 1fr 1fr; //设置行数
  grid-template-columns: 1fr 1fr; //设置列数
  grid-auto-flow: row dense; //行填充
}
.box_liter:first-child {
  grid-row-start: 1; //第1个从第一行开始
  grid-row-end: 3; //第三行高度结束
}
</style>