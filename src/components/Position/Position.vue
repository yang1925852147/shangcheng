<template>
  <div>
    <div class="p-r">
      <div class="p-a box" @click="returns">
        <van-icon name="arrow-left" />
      </div>
      <div class="txt-c padding">城市列表</div>
    </div>
    <div>
      <van-cell-group>
        <van-field v-model="value" label="城市" placeholder="请输入城市地名" @input="input" />
      </van-cell-group>
      <div>
        <div>当前城市：</div>
        <div style="margin:10px;width:26vw" class="b txt-c">{{this.dizhi}}</div>
      </div>
      <div>
        <div>热门城市：</div>
        <div class="flex f-wrap j-around">
          <div v-for="(item,index) in city.data.hotCities" :key="index">
            <div style="width:26vw;margin:10px" class="txt-c b">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-index-bar :index-list="indexList">
        <div v-for="(item,index) in indexList" :key="index">
          <van-index-anchor :index="item">{{item}}</van-index-anchor>
          <div v-for="(ite,inde) in cities[index]" :key="inde">
            <van-cell :title="ite.name" />
          </div>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import city from "../../../style/city";
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
      indexList: [], //A-Z索引
      cities: [], //A-Z的值
      city, //引入
      value: "", //搜索框
      dizhi: ""
    };
  },
  methods: {
    //存放事件函数
    input() {
      //   this.value = this.cities.filters(item => {
      //     return item.includes(this.value);
      //   });
    },
    //返回
    returns() {
      this.$router.go(-1);
    }
  },
  mounted() {
    //挂载或者调用
    this.dizhi = this.$route.query.dizhi;
    for (let i in this.city.data.cities) {
      this.indexList.push(i);
      this.cities.push(this.city.data.cities[i]);
    }
    // console.log(this.indexList, 11),
    console.log(this.cities, 22);
    console.log(city);
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