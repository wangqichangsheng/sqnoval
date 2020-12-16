<template>
  <div class="booksDetail">
    <van-nav-bar left-arrow @click-left="back"> </van-nav-bar>

    <div class="booksDetail-box">
      <div
        class="box-item"
        v-for="(item, index) in ranking"
        :key="index"
        @click="go_books_detail(item._id)"
      >
        <div class="box-book">
          <div class="box-img fl"><img :src="item.cover" /></div>
          <div class="box-word fr">
            <div class="box-title">{{ item.title }}</div>
            <!-- <div class="box-shortIntro">{{ item.shortIntro }}</div> -->
            <div class="box-down">
              <div class="box-author">{{ item.author }}</div>
              <div class="box-type">{{ item.type }}</div>
            </div>
          </div>
        </div>

        <div class="box-introduce">
          <h3>内容简介</h3>
          <div class="box-shortIntro">{{ item.shortIntro }}</div>
          <div class="box-new">
            <div class="new">最新</div>
            <div class="chapter">{{ item.author }}</div>
          </div>
          <div class="box-catalog">
            <div class="catalog">目录</div>
            <div class="chapter">{{ item.author }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="comment"><h3>评论</h3></div>
    <div class="booksDetail-button">
      <button class="add">加书架</button>
      <button class="start" @click="goState('Content')">开始阅读</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urls: "http://statics.zhuishushenqi.com/",
      ranking: [],
    };
  },

  created() {
    let id = this.$route.params._id;
    
    this.getBooksDetail(id);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    goState(name) {
      this.$router.push({ name });
    },

    getBooksDetail(id) {
      this.axios({
        method: "GET",
        url: "/rank/" + id,
      })
        .then((result) => {
          
          if (result.status == 200) {
            
            this.ranking = result.data.ranking.books.slice(0,1);
          }
        })
        .catch((err) => {
          
        });
    },
  },
};
</script>

<style lang="less" scoped>
.booksDetail {
  // padding: 0 20px;
  /deep/ .van-icon-arrow-left::before {
    color: #23b383;
    font-size: 23px;
  }

  .booksDetail-box {
    padding: 0 20px;
    overflow: hidden;
    .box-item {
      width: 100%;
      margin-bottom: 10px;
      .box-book {
        overflow: hidden;
      }
      .box-img {
        width: 32%;
        img {
          width: 100%;
          border-radius: 3px;
        }
      }
      .box-word {
        width: 65%;
        padding-left: 10px;
      }
      .box-title {
        font-size: 18px;
        font-weight: 700;
        color: #000000;
        margin-top: 10px;
      }
      .box-type {
        font-size: 12px;
        color: #000000;
        float: right;
        width: 36px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background-color: #f5f5f5;
        border-radius: 3px;
      }
      .box-down {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
      .box-author {
        width: 100px;
        font-size: 12px;
        color: #999999;
        float: left;
      }
      .box-shortIntro {
        font-size: 14px;
        color: #999999;
        margin-top: 15px;
        margin-bottom: 35px;
        // 多行文本溢出隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        text-indent: 28px;
      }

      .box-new,
      .box-catalog {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
        border-bottom: 1px solid #f9f9f9;
      }

      .new,
      .catalog {
        font-weight: 700;
        color: black;
        float: left;
      }
      .chapter {
        float: right;
        color: #999999;
        font-size: 14px;
      }
    }
  }
  //   .box-introduce {
  //     overflow: hidden;
  //     height: 100%;
  //   }
  .booksDetail-button {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #f9f9f9;
    button {
      width: calc(~"50% - 15px");
      height: 35px;
      line-height: 35px;
      border: none;
      border-radius: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .add {
      color: #23b383;
      background-color: #f9f9f9;
      margin-left: 10px;
      float: left;
    }
    .start {
      float: right;
      color: white;
      background-color: #23b383;
      margin-right: 10px;
    }
  }
}
</style>