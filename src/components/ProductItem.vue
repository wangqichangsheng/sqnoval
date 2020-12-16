<template>
  <div class="product-item">
    

    <div class="booksid-box ab">
      <div
        class="box-item ab"
      >
        <div class="box-img fl"><img :src="item.cover" /></div>
        <div class="box-word fr">
          <div class="box-name">{{ item.title }}</div>
          <div class="box-title">{{ item.shortIntro }}</div>
          <div class="box-down">
            <div class="box-author">{{ item.author }}</div>
            <div class="box-type">{{ item.type }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: {
    //商品信息
    item: {
      type: Object,
      default() {
        return {};
      },
    },

    //是否显示删除
    isRemove: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    //移除
    remove() {
      this.$emit("remove");
    },
  },
};
</script>

<style lang="less" scoped>
.product-item {

  .booksid-title {
    overflow: hidden;
    height: 65px;
    line-height: 65px;
    h3 {
      padding: 0;
      margin: 0;
    }
    span {
      color: #23b383;
    }
  }

  .booksid-box {
    overflow: hidden;
    .box-item {
      width: 100%;
      overflow: hidden;
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
      .box-name {
        font-size: 16px;
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
      .box-title {
        font-size: 13px;
        color: #999999;
        margin-top: 15px;
        margin-bottom: 35px;
        // 多行文本溢出隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>