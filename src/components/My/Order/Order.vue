<template>
  <div>
    <div class="p-r">
      <div class="p-a box" @click="returns">
        <van-icon name="arrow-left" />
      </div>
      <div class="txt-c padding">我的订单</div>
    </div>
    <div>
      <van-tabs v-model="active" swipe-threshold="5">
        <van-tab title="全部">
          <div v-for="(item,index) in num" :key="index">
            <div class="room">
              <div class="flex j-between" style="border-bottom:1px solid #999">
                <div>订单编号：{{item.order_id}}</div>
                <div style="color:red;font-size:12px;">交易已完成</div>
              </div>
              <div v-for="(item1,index1) in item.order_list" :key="index1">
                <div style="border-bottom:1px solid #999">
                  <van-card
                    :num="item1.count"
                    :price="item1.mallPrice"
                    desc="描述信息"
                    :title="item1.name"
                    :thumb="item1.image_path"
                  />
                </div>
              </div>
              <div class="padding">
                <div class="txt" style="margin-bottom:10px">创建时间：{{item.add_time}}</div>
                <div class="txt" style="margin-bottom:10px">收货地址：{{item.address}}</div>
                <div class="txt">共{{item.order_list.length}}件商品 合计：{{item.mallPrice}}</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="待支付">没有数据</van-tab>
        <van-tab title="待发货">没有数据</van-tab>
        <van-tab title="待收货">没有数据</van-tab>
        <van-tab title="已完成">
          <div v-for="(item,index) in num" :key="index">
            <div class="room">
              <div class="flex j-between" style="border-bottom:1px solid #999">
                <div>订单编号：{{item.order_id}}</div>
                <div style="color:red;font-size:12px;">交易已完成</div>
              </div>
              <div v-for="(item1,index1) in item.order_list" :key="index1">
                <div style="border-bottom:1px solid #999">
                  <van-card
                    :num="item1.count"
                    :price="item1.mallPrice"
                    desc="描述信息"
                    :title="item1.name"
                    :thumb="item1.image_path"
                  />
                </div>
              </div>
              <div class="padding">
                <div class="txt" style="margin-bottom:10px">创建时间：{{item.add_time}}</div>
                <div class="txt" style="margin-bottom:10px">收货地址：{{item.address}}</div>
                <div class="txt">共{{item.order_list.length}}件商品 合计：{{item.mallPrice}}</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
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
      num: ""
    };
  },
  methods: {
    //存放事件函数
    //返回上一层
    returns() {
      this.$router.go(-1);
    }
  },
  mounted() {
    //挂载或者调用
    this.active = this.$route.query.index;
    //订单查询
    this.$api
      .queryss()
      .then(res => {
        this.num = res.list;
        this.num1 = res.list.order_list;
        console.log(res);
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
.room {
  background: #fafafa;
  border-radius: 30px;
  margin: 10px;
}
.txt {
  text-align: right;
}
</style>