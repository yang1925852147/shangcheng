<template>
  <div class="box">
    <!-- 头部导航 -->
    <div>
      <div>
        <div class="flex j-around">
          <div class="box2" @click="position">
            <van-icon name="location-o" />
            {{city}}
          </div>
          <div class="flex">
            <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              class="box1"
              @focus="focus"
              @blur="blur"
            />
            <div class="box2" @click="click">搜索</div>
          </div>
        </div>
      </div>
      <!-- 关键字的相关内容 -->
      <div v-if="yes===0">
        <div v-for="(item,index) in ll" :key="index">
          <div
            v-html="item.name"
            style="border-bottom:1px solid red;padding:5px;margin-top:5px"
            @click="go(item.id)"
          ></div>
        </div>
      </div>
      <!-- 首页内容 -->
      <div v-if="yes===1">
        <!-- 轮播图 -->
        <div>
          <Chart></Chart>
        </div>
        <!-- 平面滑动 -->
        <div>
          <Form></Form>
        </div>
        <!-- 3个F的食品 -->
        <div>
          <Content :num="num" v-if="num.length">
            <template #a>1F</template>
            <template #b>{{num3.floor1}}</template>
          </Content>
          <Content :num="num1" v-if="num1.length">
            <template #a>2F</template>
            <template #b>{{num3.floor2}}</template>
          </Content>
          <Content :num="num2" v-if="num2.length">
            <template #a>3F</template>
            <template #b>{{num3.floor3}}</template>
          </Content>
        </div>
        <!-- 热销商品 -->
        <div>
          <Cau :caua="caua" v-if="caua.length"></Cau>
        </div>
      </div>
      <!--历史记录 -->
      <div v-else>
        <div v-for="(item,index) in room" :key="index">
          <div class="qwe">
            <div>{{item}}</div>
          </div>
        </div>
        <div style="background: white;">
          <van-button round type="info" @click="fan">返回首页</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import Form from "../components/Homezu/Form";
import Chart from "../components/Homezu/Chart";
import Content from "../components/Homezu/Content";
import Cau from "../components/Homezu/Cau";
export default {
  name: "",
  props: {
    //接收父组件传值
  },
  components: {
    //注册组件
    // Navigations,
    Chart,
    Form,
    Content,
    Cau
  },
  data() {
    return {
      //数据
      num: [], //3F食品传参
      num1: [], //3F食品传参
      num2: [], //3F食品传参
      num3: {}, //首页参数
      caua: [], //热销传参
      value: "", //输入框输入的值
      ll: [],
      yes: 1,
      room: [], //搜索历史
      city: "" //定位
    };
  },
  methods: {
    //存放事件函数
    //选择位置
    position() {
      this.$router.push({
        path: "/Position",
        query: {
          dizhi: this.city
        }
      });
    },
    //失去焦点
    blur() {
      this.yes = 1;
    },
    //获取焦点
    focus() {
      if (JSON.parse(localStorage.getItem("name"))) {
        this.room = JSON.parse(localStorage.getItem("name"));
      }
      this.yes = 2;
    },
    //点击搜索储存输入框内容
    click() {
      if (JSON.parse(localStorage.getItem("name"))) {
        this.room = this.room.filter(item => {
          return this.value !== item;
        });
        this.room.unshift(this.value);
        this.room.splice(5);
        localStorage.setItem("name", JSON.stringify(this.room));
      } else {
        this.room.unshift(this.value);
        localStorage.setItem("name", JSON.stringify(this.room));
      }
    },
    //返回
    fan() {
      this.yes = 1;
    },
    //跳转详情页以及传id过去
    go(item) {
      this.$router.push({
        path: "/Details",
        query: {
          id: item
        }
      });
    }
    //存入本地的输入框内容
  },
  mounted() {
    //挂载
    let _this = this;
    // 定位数据;
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB"
      });
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        // data是具体的定位信息
        _this.city = data.addressComponent.city;
      }

      function onError(data) {
        // 定位出错
      }
    });
    //首页数据
    this.$api
      .getHomeDate()
      .then(res => {
        this.num = res.data.floor1;
        this.num1 = res.data.floor2;
        this.num2 = res.data.floor3;
        this.num3 = res.data.floorName;
        this.caua = res.data.hotGoods;
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    //监听
    value(val) {
      if (this.value != "") {
        this.$api
          .search(val)
          .then(res => {
            this.ll = res.data.list;
            // this.room.unshift(this.value);
            this.ll.map(item => {
              item.name = item.name.replace(
                this.value,
                `<span style="color:red">${this.value}</span>`
              );
            });
            this.yes = 0;
            console.log(res.data.list);
          })
          .catch(err => {
            console.log(err);
          });
      }
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
.box {
  background-color: #c8c8c8;
}
.box1 {
  background: #c8c8c8 !important;
}
.box2 {
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.qwe {
  background: white;
}
</style>