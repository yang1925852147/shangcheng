<template>
  <div>
    <!--用户登陆时 -->
    <div v-if="this.code===200">
      <div v-if="yes===1">
        <!-- 全选框 -->
        <div class="flex j-between" style="  padding:10px;">
          <div>
            <van-checkbox v-model="checked" name="a" @click="box" v-if="this.checked===false">全选</van-checkbox>
            <van-checkbox v-model="checked" name="a" @click="box" v-if="this.checked===true">取消全选</van-checkbox>
          </div>
          <div>
            合计：{{zong}}
            <br />请确认订单
          </div>
        </div>
        <!-- 删除结算 -->
        <div class="flex j-right" style="  padding:10px;">
          <van-button type="warning" @click="deletes">删除</van-button>
          <van-button type="warning" style="margin-left:10px ;" @click="settlement">去结算</van-button>
        </div>
        <!-- 加入购物车的数据 -->
        <div>
          <div v-for="(item,index) in num" :key="index">
            <div class="flex">
              <div class="flex a-center">
                <van-checkbox v-model="item.check" @click="lj"></van-checkbox>
              </div>
              <div style="width:150px">
                <img :src="item.image_path" alt />
              </div>
              <div>
                <div>{{item.name}}</div>
                <div class="flex j-around">
                  <div>￥{{item.mallPrice}}</div>
                  <div>
                    <van-stepper v-model="item.count" @plus="plus(item)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          <div>
            <van-empty description="描述文字" />
          </div>
          <div class="flex j-center" @click="gohome">
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">去购物吧</van-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 未登录时 -->
    <div v-else>
      <div>
        <img src="../../assets/order.gif" alt />
      </div>
      <div class="flex j-center" @click="go">
        <van-button plain type="info">前往登陆</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shopping",
  props: {
    //接收父组件传值
  },
  components: {
    //注册组件
  },
  data() {
    return {
      //数据
      num: [], //购物车数据
      checked: false, //复选框的默认值
      asd: 0,
      code: "", //用户登陆或者没有登陆
      yes: []
    };
  },
  methods: {
    //存放事件函数或者调用
    gohome() {
      this.$router.push("/");
    },
    //前往登陆
    go() {
      this.$router.push("/lend");
    },
    //数量加
    plus(item) {
      this.asd = ++item.count;
      console.log(this.asd);
      this.$api
        .commodity({
          count: this.asd, //商品数量
          id: item.cid, //商品id
          mallPrice: item.present_price * this.asd //价格
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除商品
    deletes() {
      let b = this.num.filter(item => {
        return item.check === true;
      });
      let a = [];
      b.map(item => {
        a.push(item.cid);
      });
      this.$api
        .delete(a)
        .then(err => {
          this.$api
            .query()
            .then(res => {
              this.num = res.shopList;
              console.log(this.num);
            })
            .catch(err => {
              console.log(err);
            });
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //全选
    box() {
      if (this.checked === true) {
      } else {
      }
      this.num.map(item => {
        item.check = this.checked;
      });
    },
    //不是所有都是选中时checked就不是true
    lj() {
      let a = this.num.every(item => {
        return item.check === true;
      });
      this.checked = a;
    },
    //去结算
    settlement() {
      let c = this.num.filter(item => {
        return item.check === true;
      });
      if (c.length > 0) {
        c.map(item => {
          this.$set(item, "idDirect", false);
        });
        this.$router.push("/Settlement");
        localStorage.setItem("bapo", JSON.stringify(c));
      }
    }
  },
  mounted() {
    //挂载
    //购物车数据
    this.$api
      .query()
      .then(res => {
        this.num = res.shopList;
        if (this.num.length > 0) {
          this.yes = 1;
        }
        console.log(this.num);
      })
      .catch(err => {
        console.log(err);
      });
    //用户数据
    this.$api
      .obtain()
      .then(res => {
        this.code = res.code;
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
    zong() {
      let a = 0;
      this.num.map(item => {
        if (item.check === true) {
          a += item.count * item.present_price;
        }
      });
      return a;
    }
  },
  filters: {
    //过滤器
  }
};
</script>

<style scoped lang='scss'>
img {
  width: 100%;
}
</style>