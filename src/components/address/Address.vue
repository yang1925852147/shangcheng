<template>
  <!-- 地址页面 -->
  <div>
    <div class="p-r">
      <div class="p-a box" @click="returns">
        <van-icon name="arrow-left" />
      </div>
      <div class="txt-c padding">编辑地址</div>
    </div>
    <div>
      <van-address-edit
        :area-list="area"
        :address-info="AddressInfo"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import area from "../../../style/area.js";
import { Toast } from "vant";
export default {
  name: "Address",
  props: {
    //接收父组件传值
  },
  components: {
    //注册组件
  },
  data() {
    return {
      //数据
      area,
      searchResult: [],
      AddressInfo: {}
    };
  },
  methods: {
    //存放事件函数
    //返回一层
    returns() {
      this.$router.go(-1);
    },
    //添加和修改地址
    onSave(content) {
      Toast("添加成功");
      console.log(content);
      this.$api
        .increase({
          name: content.name, //用户名
          tel: content.tel, //电话
          address: content.province + content.city + content.county, //地址
          isDefault: content.isDefault, //是否默认
          province: content.province, //省
          city: content.city, //市
          county: content.county, //区
          addressDetail: content.addressDetail, //详情区域
          areaCode: content.country, //邮编
          id: this.AddressInfo._id
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.$router.go(-1);
    },
    //删除地址
    onDelete() {
      Toast("删除成功");
      this.$api
        .deletes(this.AddressInfo._id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.$router.go(-1);
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  },
  mounted() {
    //挂载或者调用
    //接受id
    if (this.$route.query.ll) {
      this.AddressInfo = this.$route.query.ll;
    } else {
      this.AddressInfo._id = "";
    }
    console.log(this.AddressInfo);
    //查询用户地址
    this.$api
      .Receiving()
      .then(res => {
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
</style>