<template>
  <div class="my">
    <div class="my-bg">
      <van-uploader class="upload-box" :after-read="uploadBg" />
    </div>

    <div class="my-info">
      <div class="clearfix">
        <div class="fl my-img">
          <img class="auto-img" :src="userInfo.userImg" alt="" />
        </div>
        <div class="fl my-info-box">
          <div class="user-name">{{ userInfo.nickName }}</div>
          <div class="user-desc">
            {{
              userInfo.desc == ""
                ? "这家伙很懒，什么也没有留下！"
                : userInfo.desc
            }}
          </div>
        </div>
      </div>

      <div class="list-box">
        <van-cell
          :title="item.title"
          v-for="(item, index) in listData"
          :key="index"
          :value="item.value"
          is-link
          @click="goPage(item.name)"
        />
      </div>
    </div>
  </div>
</template>



<script>
import "../assets/less/my.less";
export default {
  name: "My",
  data() {
    return {
      listData: [
        {
          title: "我的会员",
          name: "Myvip",
          value: "开通会员",
        },
        {
          title: "我的书豆",
          name: "Shudou",
          value: "充值",
        },
        {
          title: "个人资料",
          name: "Account",
          value: "",
        },
        {
          title: "阅读历史",
          name: "Bookshelf",
          value: "",
        },
        {
          title: "安全中心",
          name: "Secure",
          value: "账号管理",
        },
      ],

      userInfo: {},
    };
  },

  created() {
    //获取用户信息
    this.getUserInfo();
  },

  methods: {
    goPage(name) {
      this.$router.push({ name });
    },
    getUserInfo() {
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "http://www.kangliuyong.com:10002/findMy",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == "A001") {
            this.userInfo = result.data.result[0];
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //上传背景
    uploadBg(file) {
      //
      //允许文件类型
      let type = ["gif", "png", "jpg", "jpeg"];

      //允许最大文件大小 1MB
      let size = 1;

      //判断文件类型
      let fileType = file.file.type.split("/")[1];
      if (type.indexOf(fileType) === -1) {
        this.$toast(`文件类型只支持${type.join(",")}`);
        return;
      }

      //判断文件大小 B, 1024B = 1KB, 1024KB = 1MB
      let fileSize = file.file.size / 1024 / 1024;

      if (fileSize > size) {
        this.$toast(`文件允许最大不能超过${size}MB`);
        return;
      }

      //处理base64的标记data:image/jpeg;base64,
      let base64 = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, "");
      //

      //发起请求
      let tokenString = localStorage.getItem("__tk");

      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "POST",
        url: "http://www.kangliuyong.com:10002/updateUserBg",
        data: {
          appkey: this.appkey,
          tokenString,
          imgType: fileType,
          serverBase64Img: base64,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 700) {
            //token检验无效,则跳到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == "I001") {
            this.userInfo.userBg = result.data.userBg;
          }

          this.$toast(result.data.msg);
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
  },
};
</script>
<style lang="less" scoped>
</style>