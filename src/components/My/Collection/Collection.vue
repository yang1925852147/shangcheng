<template>
  <div>
    <div class="p-r">
      <div class="p-a box" @click="returns">
        <van-icon name="arrow-left" />
      </div>
      <div class="txt-c padding">我的收藏</div>
    </div>
    <div v-for="(item,index) in num" :key="index">
      <div>
        <van-card :price="item.present_price" :title="item.name" :thumb="item.image_path">
          <template #footer>
            <van-button size="mini" @click="out(item)">
              <van-icon name="cross" />
            </van-button>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collection",
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
    //返回上一层
    returns() {
      this.$router.go(-1);
    },
    out(item) {
      this.$api
        .cancel(item.cid)
        .then(res => {
          this.getData();
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData() {
      this.$api
        .Collections()
        .then(res => {
          this.num = res.data.list;
          console.log(this.num);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    //挂载或者调用
    this.getData();
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