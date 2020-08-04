//封装所有的请求
import service from "./index";

export default {
  //1.获取首页的数据
  getHomeDate() {
    return service.get("/recommend");
  },
  //2.搜索数据
  search(value) {
    return service.post("/search", { value });
  },
  //3.分类查询
  Classified(id) {
    return service.get(`/classification?mallSubId=${id}`);
  },
  //4.查询获取购物车数据
  query() {
    return service.post("/getCard", {});
  },
  //5.购物车加减商品
  commodity({ count, id, mallPrice }) {
    return service.post("/editCart", { count, id, mallPrice });
  },
  //6.购物车商品删除
  delete(id) {
    return service.post("/deleteShop", id);
  },
  //7.购物车支付页面
  payment({ address, tel, orderId, totalPrice, idDirect, count }) {
    return service.post("/order", {
      address,
      tel,
      orderId,
      totalPrice,
      idDirect,
      count,
    });
  },
  //8.单个商品详情
  single(id) {
    return service.get(`/goods/one?id=${id}`);
  },
  //9.收藏单个商品
  Collection(obj) {
    return service.post("/collection", obj);
  },
  //10. 取消收藏
  cancel(id) {
    return service.post("/cancelCollection", { id });
  },
  //11.查询商品是否已收藏
  querys(id) {
    return service.post("/isCollection", { id });
  },
  //12. 加入购物车
  join(id) {
    return service.post("/addShop", { id });
  },
  //13. 退出登录
  out() {
    return service.post("/loginOut", {});
  },
  //14. 获取用户信息
  obtain() {
    return service.post("/queryUser", {});
  },
  //15. 修改保存用户信息
  modify(
    gender, //性别
    year, //年
    month, //月
    day, //日
    id, //用户id
    nickname //昵称
  ) {
    return service.post("/saveUser", {
      gender, //性别
      year, //年
      month, //月
      day, //日
      id, //用户id
      nickname, //昵称
    });
  },
  //16. 查询用户订单数量
  order() {
    return service.get("/myOrder/orderNum");
  },
  //17. 商品评论
  comment({ id, rate, content, anonymous, _id, order_id, image }) {
    return service.post("/goodsOne/comment", {
      id,
      rate,
      content,
      anonymous,
      _id,
      order_id,
      image,
    });
  },
  //18. 获取登录注册默认验证码
  verification() {
    return service.get("/verify");
  },
  //19. 查询用户收货地址
  Receiving() {
    return service.get("/getAddress");
  },
  //20. 查询默认收货地址
  default() {
    return service.get("/getDefaultAddress");
  },
  //21. 设置默认收货地址
  set() {
    return service.post("/setDefaultAddress", { id });
  },
  //22. 增加收货地址
  increase({
    name, //:用户名
    tel, //:电话
    address, //:(省+市+区+详情地址)
    isDefault, //:是否默认
    province, //:省
    city, //:,市
    county, //:区
    addressDetail,
    areaCode,
    id,
  }) {
    return service.post("/address", {
      name, //:用户名
      tel, //:电话
      address, //:(省+市+区+详情地址)
      isDefault, //:是否默认
      province, //:省
      city, //:,市
      county, //:区
      addressDetail, //:详情地址，
      areaCode, //:地区代码
      id, //:修改地址时候要传id
    });
  },
  //23. 删除地址
  deletes(id) {
    return service.post("/deleteAddress", { id });
  },
  //24. 查询我的收藏
  Collections() {
    return service.get("/collection/list");
  },
  //25. 注册
  register({ nickname, password, verify }) {
    return service.post("/register", { nickname, password, verify });
  },
  //26. 登录(post)
  land({ nickname, password, verify }) {
    return service.post("/login", { nickname, password, verify });
  },
  //27. 订单查询
  queryss() {
    return service.get("/myOrder");
  },
  //28. 查询已评价
  evaluate() {
    return service.get("/alreadyEvaluated");
  },
  //29. 查询未评价
  Not() {
    return service.get("/tobeEvaluated");
  },
  //30. 查询单条评论
  singles() {
    return service.post("/evaluateOne", { id, _id });
  },
};
