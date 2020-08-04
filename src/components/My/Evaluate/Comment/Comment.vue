<template>
  <div>
    <!-- 顶部 -->
    <div class="p-r">
      <div class="p-a box" @click="returns">
        <van-icon name="arrow-left" />
      </div>
      <div class="txt-c padding">评论中心</div>
    </div>
    <!-- 评分 -->
    <div class="flex">
      <div style="width:140px">
        <img :src="this.num.image_path" alt />
      </div>
      <div style="margin-left:50px">
        <div>商品评分</div>
        <div style="margin-top:70px">
          <van-rate v-model="value" icon="like" void-icon="like-o" />
        </div>
      </div>
    </div>
    <!-- 留言 -->
    <div>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="说说你愉悦的心情吧"
        show-word-limit
        style="background:#F7F7F7;height:130px"
      />
    </div>
    <!-- 匿名评价 -->
    <div>
      <van-checkbox v-model="checked">匿名评价</van-checkbox>
    </div>
    <!-- 提交 -->
    <div>
      <van-button type="primary" @click="submit" style="width:100vw">提交</van-button>
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
      num: "", //商品的资料
      value: 0, //评价星级
      message: "", //评价的内容
      checked: false //是否匿名
    };
  },
  methods: {
    //存放事件函数
    //点击提交按钮提交评论
    submit() {
      this.$api
        .comment({
          id: this.num.cid, //商品cid
          rate: this.value, //分数
          content: this.message, //内容
          anonymous: this.checked, // 是否匿名
          _id: this.num._id, //商品的_id
          order_id: this.num.order_id, //商品的order_id
          image: []
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      Toast("评价成功");
      this.$router.go(-1);
    },
    //返回上一层
    returns() {
      this.$router.go(-1);
    }
  },
  mounted() {
    //挂载或者调用
    this.num = this.$route.query.add;
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
img {
  width: 100%;
}
</style>