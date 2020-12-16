<template>
  <div class="listDetail">
    <Popbox v-if="popShow" :content="content">
      <slot></slot>
    </Popbox>
    <!-- 头部 -->
    <van-nav-bar
      left-arrow
      fixed
      @click-left="back"
      right-text="书架"
      @click-right="goState('Bookshelf')"
    />

    <!-- 详情头部 -->
    <van-row v-if="bookDetails.length != 0" class="listDetail-book">
      <van-col span="22" offset="1">
        <div class="top clear">
          <div class="left fl">
            <img :src="imgKey(bookDetails.cover)" alt />
          </div>
          <div class="right fl">
            <h5>{{ bookDetails.title }}</h5>
            <span>
              {{ bookDetails.author }} |
              <i>{{ bookDetails.copyright }}</i>
            </span>
            <span>
              5书币/千字 |
              <i>{{ bookDetails.chaptersCount }}万字</i>
            </span>
            <span>
              <i v-for="(item, index) in bookDetails.tags" :key="index">{{
                item
              }}</i>
            </span>
          </div>
        </div>
      </van-col>
    </van-row>

    <!-- 简介 -->
    <van-row v-if="bookDetails.length != 0" class="present">
      <van-col span="22" offset="1">
        <h3>简介</h3>
        <div class="content" :class="{ show: addClass }">
          {{ bookDetails.longIntro }}
        </div>
        <span
          v-if="addClass"
          @click="iconDown"
          class="iconfont icon-Down fr"
        ></span>
        <span
          v-if="!addClass"
          @click="iconUp"
          class="iconfont icon-shangla1 fr"
        ></span>
      </van-col>
    </van-row>

    <!-- 相关推荐 -->
    <h3 class="about">相关推荐</h3>
    <div v-if="bookDetails.length != 0" class="recommend clearfix">
      <div
        class="recommend-item"
        v-for="(item, index) in recommendation"
        :key="index"
        @click="navRecommendation(index)"
      >
        <div class="recommend-img">
          <img :src="imgKey(item.cover)" alt />
        </div>
        <p>{{ item.title }}</p>
      </div>
    </div>

    <!-- 热门短评 -->
    <van-row v-if="bookComment.length != 0" class="comment">
      <van-col span="22" offset="1">
        <h3>热门短评</h3>
        <div class="box">
          <ul>
            <li v-for="(item, index) in bookComment" :key="index">
              <div class="top">
                <img class="fl" :src="imgKey(bookDetails.cover)" alt />
                <span>{{ item.author.nickname }}</span>
              </div>
              <div class="content">
                {{ item.content ? item.content : item.title }}
              </div>
            </li>
          </ul>
        </div>
      </van-col>
    </van-row>

    <!-- 底部按钮 -->
    <div v-if="bookDetails.length != 0" class="btn">
      <button :class="{ success: addFoo }" @click="add(bookDetails)">
        {{ addText }}
      </button>
      <button @click="goRead">开始阅读</button>
    </div>
  </div>
</template>

<script>
//引入弹出框组件
import Popbox from "../components/Popbox.vue";

import "../assets/less/listDetail.less";

export default {
  name: "ListDetail",
  data() {
    return {
      bookId: "",
      bookDetails: [],
      addClass: true,
      bookComment: [],
      loadingShow: true,
      popShow: false,
      content: "",
      keyWord: this.$route.query.title,
      recommendation: [],
      keyword: this.$route.query.keyword,
      name: this.$route.query.name,
      router: this.$route.query.router,
      addFoo: false,
      addText: "+ 书架",
    };
  },

  created() {
    
    this.bookId = this.$route.query.id;
    this.$store.state.titleShow = false;
    this.getBookDetails();
    this.getRecommendation();
    if (this.$store.state.myList.length !== 0) {
      
      var el = this.$store.state.myList;
      for (let i = 0; i < el.length; i++) {
        if (el[i]._id === this.$route.query.id) {
          this.addFoo = true;
          this.addText = "已添加";
        }
      }
    }
  },

  components: {
    Popbox,
  },

  methods: {
    // 跳转页面
    goState(name) {
      this.$router.push({ name });
    },

    //返回上一个路由
    back() {
      this.$router.go(-1);
    },

    //获取数据
    getBookDetails() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        methods: "GET",
        url: "http://novel.kele8.cn/book-info/" + this.bookId,
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.status == 200) {
            this.bookDetails = result.data;
            this.getTake();
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //获取评论
    getTake() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        methods: "GET",
        url: "http://novel.kele8.cn/book/discussions?book=" + this.bookId,
      })
        .then((result) => {
          this.$toast.clear();
          
          this.bookComment = result.data.posts.slice(0, 7);
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },
    //获取相关推荐
    getRecommendation() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        methods: "GET",
        url: "http://novel.kele8.cn/recommend/" + this.bookId,
      })
        .then((result) => {
          if (result.status == 200) {
            this.$toast.clear();
            
            this.recommendation = result.data.books.slice(0, 3);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //点击相关推荐
    navRecommendation(index) {
      window.scroll(0, 0);
      this.bookId = this.recommendation[index]._id;
      this.getBookDetails();

      if (this.$store.state.myList.length !== 0) {
        var el = this.$store.state.myList;
        for (let i = 0; i < el.length; i++) {
          if (el[i]._id === this.recommendation[index]._id) {
            this.addFoo = true;
            this.addText = "已添加";
          } else {
            this.addFoo = false;
            this.addText = "+ 书架";
          }
        }
      }
    },

    //解密图片
    imgKey(value) {
      return unescape(value).slice(7);
    },
    //上拉
    iconUp() {
      this.addClass = true;
    },

    //下拉
    iconDown() {
      this.addClass = false;
    },

    //跳转阅读页
    goRead() {
      this.$router.push({
        name: "Read",
        query: {
          id: this.bookId,
          keyword: this.keyword,
          name: this.name,
          router: this.router,
        },
      });
    },
    //弹出框
    pop() {
      this.popShow = true;
      setTimeout(() => {
        this.popShow = false;
      }, 500);
    },

    // 加入书架
    add() {
      this.addFoo = true;
      this.addText = "已添加";
      if (this.$store.state.myList.length == 0) {
        this.$store.state.myList.push(this.bookDetails);
        this.content = "添加成功!";
        this.pop();
      } else {
        let list = this.$store.state.myList;
        let i = this.$store.state.myList.length - 1;
        if (list[i]._id == this.bookDetails._id) {
          this.content = "已经添加过了!";
          this.pop();
          return;
        } else {
          let tokenString = localStorage.getItem("__tk");
          this.$store.state.myList.push(this.bookDetails);
          this.content = "添加成功!";
          this.pop();
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>