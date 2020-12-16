<template>
  <div class="rinking">
    <h3>男生</h3>
    <div class="rinking-box">
      <div
        class="rinking-item"
        v-for="(item, index) in male"
        :key="index"
        @click="goRinkingList(item._id)"
      >
        <div class="item-img fl">
          <img :src="url + item.cover" />
        </div>
        <div class="item-title fl">{{ item.title }}</div>
      </div>
    </div>
    <h3>女生</h3>
    <div class="rinking-box">
      <div
        class="rinking-item"
        v-for="(item, index) in female"
        :key="index"
        @click="goRinkingList(item._id)"
      >
        <div class="item-img fl">
          <img :src="url + item.cover" />
        </div>
        <div class="item-title fl">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rinking",
  data() {
    return {
      url: "http://statics.zhuishushenqi.com/",
      male: [],
      female: [],
      picture: [],
      press: [],
      _id: "",
      title:'',
    };
  },
  created() {
    this.getRinking();
  },

  methods: {
    goRinkingList(_id) {
      this.$router.push({ name: "RinkingList", params: { _id } });
    },
    
    getRinking() {
       this.$toast.loading({
        message:'加载中...',
        forbidClick:true,
        duration:0,
      });

      this.axios({
        method: "GET",
        url: "/rank-category",
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.status == 200) {
            this.male = result.data.male.slice(0, 6);
            this.female = result.data.female.slice(0, 6);
            this.picture = result.data.picture;
            this.press = result.data.press;
          }
        })
        .catch((err) => {
          
          this.$toast.clear();
        });
    },
  },
};
</script>

<style lang="less" scoped>
.rinking {
  padding: 0 20px 50px 20px;
  .rinking-box {
    .rinking-item {
      margin-bottom: 10px;
      overflow: hidden;
      height: 40px;
      line-height: 40px;
      .item-img {
        width: 40px;
        height: 40px;
        margin-right: 15px;
        text-align: center;
        img{
          width: 100%;
        }
      }
    }
  }
}
</style>