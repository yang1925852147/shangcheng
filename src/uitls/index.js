import { Dialog } from "vant";

export default {
  checkLogin(next) {
    if (localStorage.getItem("用户名")) {
      next();
    } else {
      Dialog.confirm({
        title: "你没有登陆",
        message: "需要去登陆吗",
      })
        .then(() => {
          next();
        })
        .catch(() => {});
    }
  },
};
