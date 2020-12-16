<template>
  <div class="rinkingList">
    <van-nav-bar left-arrow fixed @click-left="back" />

    <!-- 内容 -->
    <van-row class="rinkingList-books">
      <van-col span="22" offset="1">
        <div class="rinkingList-books-list">
          <ul>
            <li
              @click="goListDetail(item._id)"
              v-for="(item, index) in bookList"
              :key="index"
            >
              <div class="image">
                <img :src="imgKey(item.cover)" alt />
              </div>
              <div class="right">
                <h5>{{ item.title }}</h5>
                <p>{{ item.shortIntro }}</p>
                <div class="bottom clear">
                  <span class="iconfont icon-zuozhe fl"
                    >&nbsp;&nbsp;{{ item.author }}</span
                  >
                  <span class="fr">{{ item.retentionRatio }}万人气</span>
                </div>
              </div>
            </li>
            <div
              class="more"
              v-show="this.bookList.length != 0"
              @click="checkMore"
            >
              {{ moreBooks }}
              <span v-show="moreShow" class="iconfont icon-shangla1"></span>
            </div>
          </ul>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import "../assets/less/rinkingList.less";
export default {
  name: "RinkingList",
  data() {
    return {
      index: this.$route.query.index,
      book: [],
      imgShow: false,
      bookList: [],
      moreBooks: "查看更多",
      i: 10,
      count: 10,
      moreShow: true,
    };
  },

  created() {
    let id = this.$route.params._id;
    this.getRinkingList(id);
    this.$store.state.titleShow = false;
  },

  methods: {
    //返回Rinking
    back() {
      this.$router.go(-1);
      this.$store.state.titleShow = true;
    },

    //跳转书籍详情页
    goListDetail(id) {
      this.$router.push({
        name: "ListDetail",
        query: {
          id,
          name: this.major,
          keyword: this.keyword,
          router: "RinkingList",
        },
      });
    },
    //获取书籍
    getRinkingList(id) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        methods: "GET",
        url: "/rank/" + id,
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.status == 200) {
            this.book.push(result.data.ranking.books);
            this.bookList = result.data.ranking.books.slice(
              this.index,
              this.count
            );
          }
        })
        .catch((err) => {
          
          this.$toast.clear();
        });
    },

    //查看更多
    checkMore() {
      this.moreShow = true;
      this.moreBooks = "查看更多";
      this.count += 10;
      this.i = this.count - 10;
      let arr = this.book[0].slice(this.i, this.count);
      this.bookList = this.bookList.concat(arr);

      if (this.count >= this.book[0].length) {
        this.moreBooks = "没有更多了~";
        this.moreShow = false;
        return;
      }
    },

    //解密图片
    imgKey(value) {
      return unescape(value).slice(7);
    },

    //解决图片加载缓慢
    imgLoad() {
      if (this.$refs.img.src !== "") {
        this.imgShow = true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>
