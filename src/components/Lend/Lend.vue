<template>
  <div class="box flex j-center a-center">
    <div class="room">
      <van-form @submit="onSubmit">
        <h3>登陆&nbsp;/&nbsp;注册</h3>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field label="手机号" placeholder="手机号" />
        <div class="flex">
          <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
            <template #button>
              <van-button size="small" type="primary" @click="tion" ref="alone">发送验证码</van-button>
            </template>
          </van-field>
        </div>
        <div class="flex">
          <van-field
            v-model="phonen"
            name="验证码"
            label="验证码"
            placeholder="验证码"
            :rules="[{ required: true, message: '请输入验证码' }]"
          />
          <div v-html="this.num" @click="clik"></div>
        </div>
        <div style="margin: 16px;">
          <van-button type="primary" @click="lend">登陆</van-button>
          <van-button type="danger" style="margin:0 10px" @click="register">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Form } from "vant";
export default {
  name: "Lend",
  props: {
    //接收父组件传值
  },
  components: {
    //注册组件
  },
  data() {
    return {
      //数据
      username: "", //用户名
      password: "", //密码
      phonen: "",
      phone: "",
      num: "",
      a: 30,
      sms: ""
    };
  },
  methods: {
    //存放事件函数
    onSubmit(values) {},
    //刷新验证码
    clik() {
      this.$api
        .verification()
        .then(res => {
          this.num = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //发送短信验证码
    tion() {
      let ti = setInterval(() => {
        this.a--;
        this.$refs.alone.disabled = true;
        this.$refs.alone.innerText = `${this.a}s秒后重新发送`;
        if (this.a === 0) {
          clearInterval(ti);
          this.$refs.alone.disabled = false;
          this.$refs.alone.innerText = `重新发送`;
        }
      }, 1000);
    },
    //注册
    register() {
      this.$api
        .register({
          nickname: this.username,
          password: this.password,
          verify: this.phonen
        })
        .then(res => {
          if (res.code === 200) {
            localStorage.setItem("用户名", JSON.stringify(this.username));
            this.$router.push("/");
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //登陆
    lend() {
      this.$api
        .land({
          nickname: this.username,
          password: this.password,
          verify: this.phonen
        })
        .then(res => {
          if (res.code === 200) {
            localStorage.setItem("用户名", JSON.stringify(this.username));
            this.$router.push("/");
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    //挂载
    this.$api
      .verification()
      .then(res => {
        this.num = res;
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
  background-image: url("../../assets/login.jpg");
  width: 100vw;
  height: 100vh;
  .room {
    background: white;
    padding: 10px;
  }
}
</style>