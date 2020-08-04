<template>
  <div>
    <div class="p-r">
      <div class="p-a box" @click="returns">
        <van-icon name="arrow-left" />
      </div>
      <div class="txt-c padding">选择地址</div>
    </div>
    <div>
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
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
      chosenAddressId: 1, //默认值
      list: []
    };
  },
  methods: {
    //存放事件函数
    //返回一层
    returns() {
      this.$router.go(-1);
    },
    //新增地址跳转
    onAdd() {
      Toast("新增地址");
      this.$router.push("/Address");
    },
    //修改地址跳转
    onEdit(item, index) {
      Toast("开始编辑");
      this.$router.push({
        path: "/Address",
        query: {
          ll: item
        }
      });
    },
    //保存的地址的数据
    getData() {
      this.$api
        .Receiving()
        .then(res => {
          this.list = res.address;
          this.list.map((item, index) => {
            this.$set(item, "id", index * 1 + 1);
          });
          console.log(res.address);
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