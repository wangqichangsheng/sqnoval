<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-box">
      <van-nav-bar left-text="返回" left-arrow fixed @click-left="goBookshelf">
        <template #right>
          <div class="home-search">
            <van-search
              v-model="value"
              ref="search"
              show-action
              @search="input"
              @clear="del"
              placeholder="请输入书名"
            >
              <template #action>
                <div @click="search">搜索</div>
              </template>
            </van-search>
          </div>
        </template>
      </van-nav-bar>
    </div>

    <!-- 搜索热词 -->
    <van-row v-if="searchList.length == 0" class="search-hot">
      <van-col span="22" offset="1">
        <h5>搜索热词</h5>
        <span @click="goHot(index)" v-for="(item, index) in hot" :key="index">{{
          item
        }}</span>
      </van-col>
    </van-row>

    <!-- 搜索记录 -->
    <van-row v-if="searchList.length == 0" class="search-history">
      <van-col class="top" span="22" offset="1">
        <h5 class="fl">搜索记录</h5>
        <span
          @click="delHistory"
          v-show="$store.state.historyList.length != 0"
          class="iconfont icon-shanchu1 fr"
          >&nbsp;清空记录</span
        >
      </van-col>
      <van-col
        class="center"
        v-show="$store.state.historyList.length != 0"
        span="22"
        offset="1"
      >
        <span
          @click="his(index)"
          v-for="(item, index) in $store.state.historyList"
          :key="index"
          >{{ item }}</span
        >
      </van-col>
      <van-col
        class="bottom"
        v-show="$store.state.historyList.length == 0"
        span="22"
        offset="1"
      >
        <span class="none">还没有任何搜索记录</span>
      </van-col>
    </van-row>

    <!-- 搜索列表 -->
    <van-row v-if="searchList.length != 0" class="search-list">
      <van-col span="22" offset="1">
        <p class="word">
          搜索:
          <i>{{ value }}</i>
        </p>
        <ul>
          <li
            @click="goListDetail(index)"
            v-for="(item, index) in searchList[0]"
            :key="index"
          >
            {{ item.title }}
          </li>
          <p>没有更多了~</p>
        </ul>
      </van-col>
    </van-row>
  </div>
</template>


<script>
import"../assets/less/search.less"
export default {
  name: "Search",
  data() {
    return {
      searchList: [],
      delShow: false,
      value: "",
      foo: true,
      hot: [
        "超级女婿",
        "大主宰",
        "不灭武神",
        "万古神帝",
        "穿越之细水长流",
        "掌中之物",
        "神医弃女",
        "第一狂妃",
      ],
      addClass: false,
    };
  },

  created() {
    if (this.$store.state.foo) {
      var len = this.$store.state.historyList.length - 1;
      var key = this.$store.state.historyList[len];
      this.getSearchList(key);
      this.value = key;
      if (key) {
        this.delShow = true;
      } else {
        this.delShow = false;
      }
      this.searchList = this.$store.state.list;
    }
    this.$store.state.titleShow = false;
  },

  methods: {
    //跳转书架
    goBookshelf() {
      this.$router.push({
        name: "Bookshelf",
      });
      this.$store.state.titleShow = true;
      this.$store.state.foo = false;
    },

    //获取搜索内容
    getSearchList(word) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        methods: "GET",
        url:
          "http://novel.kele8.cn/search?keyword=" +
          word +
          "",
      })
        .then((result) => {
          this.$toast.clear();
          
          if (this.searchList.length == 0) {
            this.searchList.push(result.data.books.slice(0, 20));
            this.$store.state.list.push(result.data.books.slice(0, 20));
          } else {
            this.searchList.splice(0, this.searchList.length);
            this.searchList.push(result.data.books.slice(0, 20));
            this.$store.state.list.splice(0, this.$store.state.list.length);
            this.$store.state.list.push(result.data.books.slice(0, 20));
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //获取输入框的值
    input() {
      if (this.value != "") {
        this.delShow = true;
        if (!this.foo) {
          return;
        }
        this.getSearchList(this.value);
        setTimeout(() => {
          this.foo = true;
        }, 100);
      } else {
        this.delShow = false;
        this.searchList.splice(0, this.searchList.length);
      }
    },

    //删除输入框的值
    del() {
      this.value = "";
      this.delShow = false;
      this.searchList.splice(0, this.searchList.length);
    },

    //数组去重
    goArr(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] == arr[j]) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },

    //点击搜索
    search() {
      if (this.value != "") {
        this.$store.state.historyList.push(this.value);
        this.goArr(this.$store.state.historyList);
      } else {
        this.searchList.splice(0, this.searchList.length);
      }
    },

    //点击搜索列表跳转详情页
    goListDetail(index) {
      this.$router.push({
        name: "ListDetail",
        query: {
          id: this.searchList[0][index]._id,
          router: "Search",
        },
      });
      this.$store.state.historyList.push(this.searchList[0][index].title);
      this.goArr(this.$store.state.historyList);
    },

    //点击Hot跳转
    goHot(index) {
      this.value = this.hot[index];
      this.delShow = true;
      this.getSearchList(this.value);
      this.$store.state.historyList.push(this.value);
      this.goArr(this.$store.state.historyList);
    },

    //点击搜索历史
    his(index) {
      this.delShow = true;
      this.value = this.$store.state.historyList[index];
      this.getSearchList(this.value);
    },

    //清空搜索记录
    delHistory() {
      // this.addClass = true;
      this.$dialog
        .confirm({
          title: "清空记录",
          message: "是否确定清空记录！",
          confirmButtonColor: "#23b383",
        })
        .then(() => {
          //清除记录
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 0,
          });

          setTimeout(() => {
            this.$toast.clear();
            this.$store.state.historyList.splice(
              0,
              this.$store.state.historyList.length
            );
          }, 800);
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