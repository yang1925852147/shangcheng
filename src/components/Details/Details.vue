<template>
  <!-- 详情页 -->
  <div>
    <div v-if="this.num.length===0">商品下架</div>
    <div v-else>
      <!-- 点击返回 -->
      <div @click="dog">
        <van-button icon="star-o" type="primary">返回</van-button>
      </div>
      <!-- 轮播图 -->
      <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#39a9ed">
          <van-swipe-item>
            <img :src="this.num.image" alt @click="preview" />
          </van-swipe-item>
          <van-swipe-item>
            <img :src="this.num.image_path" alt @click="preview" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 文字以及价格 -->
      <div class="box">
        <div>{{this.num.name}}</div>
        <div style="color:red;margin-top:5px">￥{{this.num.orl_price}}</div>
      </div>
      <!-- 运费栏 -->
      <div class="box1">
        <van-row gutter="20">
          <van-col span="8">运费：{{this.num.__v}}</van-col>
          <van-col span="8">剩余：{{this.num.amount}}</van-col>
          <div v-if="this.yes===false">
            <van-col span="8" @click="Collection(id)">
              取消收藏：
              <van-icon name="like" />
            </van-col>
          </div>
          <div v-if="this.yes===true">
            <van-col span="8" @click="Collection(id)">
              收藏：
              <van-icon name="like-o" />
            </van-col>
          </div>
        </van-row>
      </div>
      <!-- 有赞的店 -->
      <div class="flex j-between box1">
        <div class="flex">
          <div>
            <van-icon name="shop-o" />有赞的店
          </div>
          <div class="room">官方</div>
        </div>
        <div>进入店铺</div>
      </div>
      <!-- 商品详情 -->
      <div>
        <van-tabs v-model="active">
          <van-tab title="商品详情">
            <div v-html="this.num.detail" style="font-size:0"></div>
          </van-tab>
          <van-tab title="商品评价">
            <div v-if="this.num1.count===0" class="boos">没有数据</div>
            <div v-else>
              <div v-for="(item,index) in num1.comment" :key="index">
                <div style="height:150px">
                  <div class="flex j-between">
                    <div v-for="(item1,index1) in item.user" :key="index1">
                      <div>用户名：{{item1.nickname}}</div>
                    </div>
                    <div>{{item.comment_time}}</div>
                  </div>
                  <div>
                    <van-rate v-model="item.rate" />
                  </div>
                  <div>
                    评论内容：
                    <br />
                    {{item.content}}
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <!-- 加入购物车和立即购买 -->
      <div>
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" dot />
          <van-goods-action-icon icon="cart-o" text="购物车" :badge="this.num3.length" />
          <van-goods-action-button type="warning" text="加入购物车" @click="join" />
          <van-goods-action-button type="danger" text="立即购买" @click="eject" />
        </van-goods-action>
      </div>
      <!-- 弹出层 -->
      <van-action-sheet v-model="show" title>
        <div class="content">
          <div class="lk flex">
            <div class="lk1">
              <img :src="this.num.image_path" alt />
            </div>
            <div class="lk2">
              <div>{{this.num.name}}</div>
              <div style="color:red">￥{{this.num.orl_price}}</div>
            </div>
          </div>
          <div class="flex j-around lj">
            <div>
              <div>购买数量:</div>
              <span style="font-size:14px;color:#999">剩余 {{this.num.amount}} 件</span>
              <span style="margin-left:10px; color:red; font-size:12px">每人限购5件</span>
            </div>
            <div>
              <van-stepper v-model="vaule" />
            </div>
          </div>
          <div style="margin-top:40px">
            <van-goods-action-button type="danger" text="立即购买" @click="Settlement" />
          </div>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { ImagePreview } from "vant";
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
      id: "", //商品id
      num: [], //商品数据
      num1: {}, //单个商品的所有数据
      num3: [], //购物车数据
      vaule: 1,
      active: 0,
      show: false, //弹窗的默认值
      yes: true //收藏的默认值
    };
  },
  methods: {
    //存放事件函数
    //点击立即购买
    Settlement() {
      if (localStorage.getItem("用户名")) {
        this.$set(this.num1.goodsOne, "count", this.vaule);
        this.$set(this.num1.goodsOne, "idDirect", true);
        localStorage.setItem("bapo", JSON.stringify(this.num1.goodsOne));
        this.$router.push("/Settlement");
      } else {
        Toast.fail("请先登陆账号");
      }
    },
    //封装请求
    Collection() {
      this.$uitls.checkLogin(this.Collections);
    },
    //收藏的点击事件
    Collections(id) {
      if (localStorage.getItem("用户名")) {
        if (this.yes === true) {
          this.yes = false;
          Toast.success("成功收藏");
          this.$api
            .Collection(this.num1.goodsOne)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.yes = true;
          Toast.fail("取消收藏");
          this.$api
            .cancel(id)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      } else {
        this.$router.push("/lend");
      }
    },
    //加入购物车
    join() {
      if (JSON.parse(localStorage.getItem("用户名"))) {
        this.$api
          .join(this.num1.goodsOne.id)
          .then(res => {
            this.$api
              .query()
              .then(res => {
                this.num3 = res.shopList;
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
      } else {
        Toast("请先登陆");
      }
    },
    //图片预览
    preview() {
      ImagePreview({
        images: [this.num.image, this.num.image_path]
      });
    },
    //点击购买出现弹窗
    eject() {
      this.show = true;
    },
    //点击返回跳转到首页
    dog() {
      this.$router.go(-1);
    },
    //单个商品请求
    getData(id) {
      this.$api
        .single(id)
        .then(res => {
          this.num1 = res.goods;
          if (res.goods.goodsOne) {
            this.num = res.goods.goodsOne;
          }
          if (localStorage.getItem("商品")) {
            let a = [];
            console.log(typeof a);
            // a = a.filters(item => {
            //   return this.num1 != item;
            // });
            a = JSON.parse(localStorage.getItem("商品"));
            a.unshift(this.num1.goodsOne);
            a.splice(5);
            localStorage.setItem("商品", JSON.stringify(a));
          } else {
            let b = [];
            b.unshift(this.num1.goodsOne);
            localStorage.setItem("商品", JSON.stringify(b));
          }
          console.log(this.num1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    //挂载
    this.id = this.$route.query.id; //接受的id
    this.getData(this.id); //单个商品调用
    //查看是否收藏
    this.$api
      .querys(this.id)
      .then(res => {
        if (res.isCollection === 0) {
          this.yes = true;
        } else if (res.isCollection === 1) {
          this.yes = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
    //购物车数据
    if (JSON.parse(localStorage.getItem("用户名"))) {
      this.$api
        .query()
        .then(res => {
          this.num3 = res.shopList;
        })
        .catch(err => {
          console.log(err);
        });
    }
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
.content {
  padding: 16px 16px 160px;
}
img {
  width: 100%;
}
.box {
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  padding: 5px;
}
.box1 {
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  padding: 5px;
  margin-top: 10px;
}
.room {
  background: red;
  color: white;
  border-radius: 5px;
  padding: 5px;
  font-size: 12px;
  margin-left: 5px;
}
.boos {
  height: 100px;
  text-align: center;
}
.lk {
  .lk1 {
    width: 100px;
    height: 100px;
    border: 1px solid #999;
    img {
      width: 100%;
    }
  }
}
.lj {
  margin-top: 15px;
  padding: 5px;
  border-top: #f5f5f5 1px solid;
  border-bottom: #f5f5f5 1px solid;
}
</style>