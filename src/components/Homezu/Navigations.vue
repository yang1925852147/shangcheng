<template>
  <!-- 导航搜索 -->
  <div>
    <div class="flex j-around">
      <div class="box">
        <van-icon name="location-o" />成都
      </div>
      <div class="flex">
        <van-search v-model="value" placeholder="请输入搜索关键词" class="box1" />
        <div class="box" @click="click">搜索</div>
      </div>
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
      value: ""
    };
  },
  methods: {
    //存放事件函数
    //点击搜素存入本地
    click() {
      localStorage.setItem("name", this.value);
    }
  },
  mounted() {
    //挂载
  },
  watch: {
    //监听
    //搜索内容
    value(val) {
      this.$api
        .search(val)
        .then(res => {
          this.num = res.data;
          this.num.map(item => {
            item.name = item.name.replace(
              this.value,
              `<span style="color:red">${this.value}</span>`
            );
          });
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
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
.box1 {
  background: #c8c8c8 !important;
}
.box {
  height: 50px;
  text-align: center;
  line-height: 50px;
}
</style>