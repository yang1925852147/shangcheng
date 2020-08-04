<template>
  <div>
    <div class="flex">
      <!-- 侧边 -->
      <div>
        <van-sidebar v-model="activeKey">
          <div v-for="(item,index1) in num" :key="index1">
            <van-sidebar-item :title="item.mallCategoryName" @click="onChange" />
          </div>
        </van-sidebar>
      </div>
      <!-- 标签 -->
      <div>
        <van-tabs v-model="active" style="width:70vw" @click="onClick">
          <div v-for="(item,index) in num1" :key="index">
            <van-tab :title="item.mallSubName">
              <div v-for="(item,index) in lj" :key="index">
                <div class="flex" @click="go(index)">
                  <div class="box">
                    <img :src="item.image" alt />
                  </div>
                  <div>
                    <div class="box1">{{item.name}}</div>
                    <div class="flex" style="margin-top:20px">
                      <div class="room">￥{{item.orl_price}}</div>
                      <div class="room1 tejia">￥{{item.present_price}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
          </div>
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
      num: "",
      //侧边的默认值
      activeKey: 0,
      //标签的默认值
      active: 0,
      num1: "",
      id: "", //获取ID
      lj: ""
    };
  },
  methods: {
    //存放事件函数
    //详情页跳转以及传参
    go(index) {
      this.$router.push({
        path: "/Details",
        query: {
          id: this.lj[index].id
        }
      });
    },
    //侧边点击事件
    onChange(index1) {
      this.num1 = this.num[index1].bxMallSubDto;
      this.active = 0;
      this.id = this.num1[this.active].mallSubId;
      this.getData(this.id);
    },
    //标签点击事件
    onClick(name, title) {
      this.id = this.num1[name].mallSubId;
      this.getData(this.id);
    }, //分类数据
    getData(id) {
      this.$api
        .Classified(id)
        .then(res => {
          this.lj = res.dataList;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分类数据请求
    getDatas() {
      this.$api
        .getHomeDate()
        .then(res => {
          this.num = res.data.category; //侧边栏文字数据
          this.num1 = this.num[this.activeKey].bxMallSubDto; //标签栏文字数据
          this.id = this.num1[this.active].mallSubId; //获取ID
          this.getData(this.id);
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    //挂载
    //就接受平滑的下标数据
    if (this.$route.query.indexs) {
      this.activeKey = this.$route.query.indexs;
    }
    //首页数据
    this.getDatas();
    1;
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
img {
  width: 100%;
  border: 1px solid #999;
}
.box {
  width: 20vw;
  margin-right: 10px;
}
.box1 {
  color: red;
  font-size: 14px;
}
.room {
  color: red;
  margin: 0 15px;
}
</style>
