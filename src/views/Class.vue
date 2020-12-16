<template>
  <div class="class">
    <div class="class-option">
      <div
        class="class-item"
        v-for="(item, index) in classList"
        :key="index"
        @click="toggleClass(index)"
      >
        <div class="item" :class="{ active: addClass == index }">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="class-box clearfix">
      <!-- 循环嵌套 -->
      <div
        class="class-books"
        :class="{ shows: addClass == index }"
        v-for="(item, index) in classData"
        :key="index"
      >
        <div
          class="class-books-item"
          v-for="(count, num) in item.data"
          :key="num"
          @click="goClassList(count.name, item.major, addClass)"
        >
          <div class="class-books-l fl">
            <div class="class-books-name">{{ count.name }}</div>
            <div class="class-books-bookCount">{{ count.monthlyCount }}本</div>
          </div>
          <div class="class-img fr">
            <img :src="imgKey(count.bookCover[0])" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/class.less";

export default {
  name: "Class",
  data() {
    return {
      classList: ["男生", "女生", "出版", "其他"],
      classData: [],
      addClass: 0,
    };
  },

  created() {
    this.getClass();
  },

  mounted() {
    if (this.$route.query.index) {
      this.addClass = this.$route.query.index;
    }
  },

  methods: {
    // 跳转分类详情
    goClassList(value, name, index) {
      this.$router.push({
        name: "ClassList",
        query: {
          keyword: value,
          name,
          index,
        },
      });
      this.$store.state.titleShow = false;
    },

    // 解密图片
    imgKey(value) {
      return unescape(value).slice(7);
    },

    getClass() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: "http://novel.kele8.cn/categories",
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.status == 200) {
            this.classData.push({
              name: "男生",
              major: "male",
              data: result.data.male,
            });
            this.classData.push({
              name: "女生",
              major: "female",
              data: result.data.female,
            });
            this.classData.push({
              name: "出版",
              major: "picture",
              data: result.data.picture,
            });
            this.classData.push({
              name: "其他",
              major: "press",
              data: result.data.press,
            });
          }
        })
        .catch((err) => {
          
          this.$toast.clear();
        });
    },

    // 切换分类
    toggleClass(index) {
      this.addClass = index;
      
    },
  },
};
</script>
<style lang="less" scoped>
</style>