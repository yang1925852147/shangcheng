<template>
  <!-- 设置 -->
  <div>
    <div class="p-r padding">
      <div class="txt-c">个人资料</div>
      <div class="p-a box" @click="fanhui">
        <van-icon name="arrow-left" />
      </div>
    </div>
    <div>
      <div class="flex j-between a-center">
        <div>头像</div>
        <div class="flex a-center">
          <div style="width:50px" class="b-radius o-v">
            <img :src="this.num.avatar" alt style="width:100%" />
          </div>
          <div>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div>
        <div>
          <van-field v-model="value" label="用户名：" :placeholder="this.num.username" />
        </div>
        <div>
          <van-field v-model="nickname" label="昵称：" :placeholder="this.num.nickname" />
        </div>
        <div>
          <van-field v-model="gender" label="性别：" :placeholder="this.num.gender" />
        </div>
        <!-- 年月日 -->
        <div>
          <van-field v-model="this.data" label="出生年月:" @click="showPopup" />
          <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              title="选择年月日"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="confirm"
              @change="asd"
            />
          </van-popup>
        </div>
      </div>
      <div class="flex f-wrap j-center">
        <div @click="determine">
          <van-button type="primary" style="width:80vw;margin-top:10px">确定</van-button>
        </div>
        <div>
          <van-button type="danger" style="width:80vw;margin-top:10px" @click="returns">取消</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import dayjs from "dayjs";
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
      data: "", //出生年月
      year: "", //年
      month: "", //月
      day: "", //日
      num: "",
      value: "", //用户名
      gender: "", //性别
      nickname: "", //昵称
      show: false, //弹出层的默认值
      minDate: new Date(1997, 0, 1), //时间选择器
      maxDate: new Date(2025, 10, 1), //时间选择器
      currentDate: new Date()
    };
  },
  methods: {
    //存放事件函数
    fanhui() {
      this.$router.go(-1);
    },
    //出生年月
    asd(val) {
      this.yuar = val.getValues()[0];
      this.month = val.getValues()[1];
      this.day = val.getValues()[2];
      this.data = `${this.yuar}年${this.month}月${this.day}日`;
      console.log(val.getValues());
    },
    //出生年月的时间选择器里的确定
    confirm(value) {
      this.show = false;
    },
    //点击出生年月
    showPopup() {
      this.show = true;
    },
    //点击返回
    returns() {
      this.$router.push("/My");
    },
    //确认保存
    determine() {
      //判定是不是修改的条件
      if (
        this.nickname === "" ||
        this.gender === "" ||
        (this.gender !== "男" && this.gender !== "女")
      ) {
        Toast.fail("修改错误");
      } else {
        //修改后赋值
        this.$api
          .modify(
            (this.num.gender = this.gender), //性别
            (this.num.year = this.yuar), //年
            (this.num.month = this.month), //月
            (this.num.day = this.day), //日
            (this.num._id = this.num._id), //id
            (this.num.nickname = this.nickname) //昵称
          )
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    //挂载或者调用
    //用户数据
    this.$api
      .obtain()
      .then(res => {
        this.num = res.userInfo;
        this.data = `${this.num.year}年${this.num.month}月${this.num.day}日`;
        console.log(res.userInfo);
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
  top: 22px;
  left: 20px;
  font-size: 22px;
}
</style>