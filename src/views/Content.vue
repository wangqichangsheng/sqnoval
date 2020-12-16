<template>
  <div class="content">
    <div class="content-title" @click="toggle">gbgbddgdbg</div>

    <van-popup
      class="content-set"
      v-model="isShow"
      position="bottom"
      :style="{ height: '20%' }"
    >
      <div class="content-slider">
        <span class="bofores">上一章</span>
        <div class="slider">
          <van-slider v-model="value" active-color="#23b383" />
        </div>
        <span class="afters">下一章</span>
      </div>
      <div class="content-set-item">
        <div
          class="content-item"
          @click="toggleList"
          get-container=".content-item"
        ></div>
        <div class="set-item">Aa</div>
      </div>
      <van-popup class="novel-item" v-model="isHide" position="top"></van-popup>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {
      isShow: false,
      isHide: false,
      overlay: false,
      value: 2,
    };
  },
  methods: {
    toggle() {
      this.isShow = true;
    },
    toggleList() {
      this.isHide = true;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  .content-title {
    height: 300px;
    width: 100%;
    text-align: center;
    background-color: #faf9f7;
  }
  .content-set {
    .content-slider {
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      margin-bottom: 20px;
      margin-top: 10px;
      .slider {
        width: 58%;
        float: left;
        height: 0px;
        line-height: 50px;
        padding: 25px 0;
        margin-left: 20px;
      }
      /deep/ .van-slider {
        width: 100%;
      }
      span {
        float: left;
      }
      .befores {
      }
      .afters {
        float: right;
        margin-left: 20px;
      }
    }
  }

  .content-set-item {
    padding: 0 20px;
    .content-item {
      width: 30px;
      height: 30px;
      float: left;
      background: url(../assets/images/content.png) no-repeat center center;
    }
    .set-item {
      font-size: 21px;
      color: #4c4c4c;
      float: right;
    }
  }
}
</style>