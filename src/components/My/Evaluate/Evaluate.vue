<template>
  <div>
    <div class="p-r">
      <div class="p-a box" @click="returns">
        <van-icon name="arrow-left" />
      </div>
      <div class="txt-c padding">评论中心</div>
    </div>
    <div>
      <div>
        <img src="../../../assets/evaluate.jpg" alt />
      </div>
      <div>
        <van-tabs v-model="active">
          <van-tab title="待评价">
            <div v-for="(item,index) in num" :key="index">
              <div class="flex p-r" style="margin-top:10px">
                <div style="width:130px;">
                  <img :src="item.image_path" alt />
                </div>
                <div>{{item.name}}</div>
                <div class="flex room p-a j-center a-center">
                  <div class="room1" style="margin-right:10px">
                    <van-icon name="chat-o" size="20" />
                  </div>
                  <div class="room2" style="height:100%" @click="comment(item)">评价晒单</div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="已评价">
            <div v-for="(item,index) in no" :key="index">
              <div v-for="(item1,index1) in item.goods" :key="index1">
                <div class="flex">
                  <div style="width:130px">
                    <img :src="item1.image" alt />
                  </div>
                  <div>{{item1.name}}</div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
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
      active: 0,
      num: "",
      no: ""
    };
  },
  methods: {
    //存放事件函数
    //前往评论
    comment(item) {
      this.$router.push({
        path: "/Comment",
        query: {
          add: item
        }
      });
    },
    //返回上一层
    returns() {
      this.$router.go(-1);
    }
  },
  mounted() {
    //挂载或者调用
    //未评价数据
    this.$api
      .Not()
      .then(res => {
        this.num = res.data.list;
      })
      .catch(err => {
        console.log(err);
      });
    //已评价数据
    this.$api
      .evaluate()
      .then(res => {
        this.no = res.data.list;
        console.log(this.no);
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
.box {
  top: 20px;
  left: 20px;
  font-size: 20px;
}
img {
  width: 100%;
}
.room {
  border: 1px solid red;
  font-size: 14px;
  border-radius: 50px;
  padding: 5px;
  bottom: 0;
  right: 0;
  .room1 {
    color: red;
  }
  .room2 {
    color: red;
  }
}
</style>