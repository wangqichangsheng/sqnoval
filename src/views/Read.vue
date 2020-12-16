<template>
  <div class="read">
    <!-- 头部 -->
    <van-nav-bar left-arrow fixed @click-left="back" />

    <van-row class="con">
      <van-col span="24">
        <h3>{{ content.chapter.title }}</h3>
        <p v-show="!content.chapter.isVip">{{ content.chapter.cpContent }}</p>
        <p v-show="content.chapter.isVip">很抱歉，你还不是会员！</p>
      </van-col>
    </van-row>

    <!-- 遮罩 -->
    <div
      v-show="content.chapter.title != ''"
      ref="mask"
      class="mask"
      :class="{ bto: foo }"
    >
      <div class="btn">
        <span @click="down" v-if="foo" class="iconfont icon-Down fr"></span>
        <span @click="up" v-if="!foo" class="iconfont icon-shangla1 fr"></span>
        <button @click="prev">上一章</button>
        <button @click="show" class="mu">目录</button>
        <button @click="next">下一章</button>
      </div>
    </div>
    <div ref="box" class="box" :class="{ active: addClass }">
      <span @click="s" class="iconfont icon-fenye-shangyiye1 left"></span>
      <span @click="x" class="iconfont icon-fenye-shangyiye right"></span>
      <span ref="move" v-show="maskShow" class="move"
        >已为你跳转第{{ pages }}页</span
      >
      <ul>
        <li
          @click="getCon(index)"
          class="item"
          v-for="(item, index) in bookList"
          :key="index"
        >
          {{ item.title }}
        </li>
      </ul>
      <div class="nav">
        共{{ page }}页
        <input ref="inp" maxlength="5" v-model="inp" type="text" />
        <button @click="toPage">go</button>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/read.less";
export default {
  name: "Read",
  data() {
    return {
      bookId: this.$route.query.id,
      content: {
        chapter: {
          title: "",
          cpContent: "",
        },
      },
      list: [],
      index: 0,
      foo: true,
      count: 0,
      c: 12,
      bookList: [],
      addClass: false,
      loadingShow: false,
      page: 0,
      inp: "",
      pages: 0,
      maskShow: false,
      keyword: this.$route.query.keyword,
      name: this.$route.query.name,
      router: this.$route.query.router,
    };
  },
  created() {
    this.$store.state.titleShow = false;
    
    this.loadingShow = true;
    this.getBookRoot();
  },

  methods: {
    //返回详情页
    back() {
      this.$router.go(-1);
    },
    // goClassItemDetail() {
    //   this.$router.push({
    //     name: "ClassItemDetail",
    //     query: {
    //       id: this.bookId,
    //       keyword: this.keyword,
    //       name: this.name,
    //       router: this.router,
    //     },
    //   });
    // },

    //获取书源
    getBookRoot() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        methods: "GET",
        url:
          "http://novel.kele8.cn/book-sources?view=summary&book=" + this.bookId,
      })
        .then((result) => {
          this.$toast.clear();
          this.getBookList(result.data[0]._id);
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //获取章节
    getBookList(id) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        methods: "GET",
        url: "http://novel.kele8.cn/book-chapters/" + id,
      })
        .then((result) => {
          this.$toast.clear();
          this.list = result.data.chapters;
          if (this.list.length != 0) {
            this.aa(this.count);
            this.getBookContent(this.list[this.index].link);
            this.page = Math.floor(this.list.length / this.c) + 1;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //获取章节内容
    getBookContent(link) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        methods: "GET",
        url: "http://novel.kele8.cn/chapters/" + encodeURIComponent(link),
      })
        .then((result) => {
          
          
          this.$toast.clear();
          
          this.content = result.data;
          this.loadingShow = false;
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //上一章
    prev() {
      this.index -= 1;
      if (this.index <= 0) {
        this.index = 0;
      }
      this.getBookContent(this.list[this.index].link);
      window.scroll(0, 0);
    },

    //下一章
    next() {
      this.index += 1;
      if (this.index >= this.list.length - 1) {
        this.index = this.list.length - 1;
      }
      this.getBookContent(this.list[this.index].link);

      window.scroll(0, 0);
    },

    //上拉
    up() {
      this.$refs.mask.style.bottom = "-46px";
      this.foo = true;
      if (this.addClass) {
        this.addClass = false;
      }
    },

    //下拉
    down() {
      this.$refs.mask.style.bottom = "-1px";
      this.foo = false;
    },

    //截取
    aa(count) {
      var a = this.list.slice(count, this.c + this.count);
      this.bookList = a;
    },

    //改变章节数
    s() {
      this.count -= 12;
      if (this.count <= 0) {
        this.count = 0;
      }
      this.aa(this.count);
    },
    x() {
      this.count += 12;
      if (this.count >= this.list.length - 1) {
        this.count = this.list.length - 1;
      }
      this.aa(this.count);
    },

    //获取相对应章节内容
    getCon(num) {
      this.index = this.count + num;
      this.getBookContent(this.bookList[num].link);
    },

    //控制章节列表的显隐
    show() {
      if (this.addClass) {
        this.addClass = false;
      } else {
        this.addClass = true;
      }
    },

    //跳转页数
    toPage() {
      let reg = /^\d*[0-9]/;
      this.inp = this.$refs.inp.value;
      this.pages = this.inp;
      if (this.inp != "" && reg.test(this.inp)) {
        this.count = (this.inp - 1) * this.c;
        this.maskShow = true;
        setTimeout(() => {
          this.maskShow = false;
        }, 1000);
        if (this.count > this.list.length - 1) {
          this.$refs.move.innerText = "已经超出页数!";
          this.inp = "";
          return;
        } else if (this.count < 0) {
          this.$refs.move.innerText = "页数不存在!";
          this.inp = "";
        } else {
          this.aa(this.count);
          this.$refs.move.innerText = "已为你跳转第" + this.pages + "页!";
          this.inp = "";
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>