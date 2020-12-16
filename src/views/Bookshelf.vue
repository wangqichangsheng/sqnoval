<template>
  <div class="bookshelf">
    <!-- 空书架，去添加 -->
    <div class="bookshelf-add" v-show="$store.state.myList.length == 0">
      <div class="bookshelf-search">
        <van-search placeholder="请输入书名" @focus="searchFocus" />
      </div>

      <div class="bookshelf-img">
        <img src="../assets/images/bookshelf-big.png" alt="" />
      </div>
      <div class="bookshelf-word"><p>把生命浪费在美好的事物上</p></div>
      <center>
        <button @click="goBooks">去书城</button>
      </center>
    </div>

    <!-- 书架有书 -->
    <div class="bookshelf-box" v-if="$store.state.myList.length != 0">
      <div class="bookshelf-search">
        <van-search placeholder="请输入书名或作者名" @focus="searchFocus" />
      </div>

      <div class="bookshelf-book clearfix">
        <div
          class="bookshelf-item"
          v-for="(item, index) in $store.state.myList"
          :key="index"
        >
          <div class="bookshelf-img" @click="goRead(index)">
            <img :src="imgKey(item.cover)" alt />
          </div>
          <p>{{ item.title }}</p>
          <div @click="del(index)" class="delete">
            <van-icon name="delete" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/bookshelf.less";
export default {
  name: "Bookshelf",
  data() {
    return {
      addClass: false,
      index: null,
    };
  },

  created() {
    this.$store.state.titleShow = true;
    // this.getBooks();
  },

  methods: {
    // getBooks() {
    //   let tokenString = localStorage.getItem("__tk");
    // },

    goBooks() {
      this.$router.push({ name: "Books" });
    },
    searchFocus() {
      this.$router.push({ name: "Search" });
    },

    //解密图片
    imgKey(value) {
      return unescape(value).slice(7);
    },
    //删除数据
    del(index) {
      this.$dialog
        .confirm({
          title: "删除",
          message: "是否确定删除！",
          confirmButtonColor: "#23b383",
        })
        .then(() => {
          //删除数据
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 0,
          });

          setTimeout(() => {
            this.$toast.clear();
            this.index = index;
            this.addClass = true;
            this.$store.state.myList.splice(this.index, 1);
          }, 800);
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },
    //取消
    no() {
      this.addClass = false;
    },
    //确定
    yes() {
      this.addClass = false;
      setTimeout(() => this.$store.state.myList.splice(this.index, 1), 300);
    },
    //跳转页面
    nav() {
      this.$router.push({
        name: "Class",
      });
    },
    //跳转阅读页
    goRead(index) {
      this.$router.push({
        name: "Read",
        query: {
          id: this.$store.state.myList[index]._id,
          router: "Bookshelf",
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
</style>