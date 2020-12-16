<template>
  <div class="shudou">
    <div class="shudou-box">
      <div class="shudou-box-up">
        <van-cell-group>
          <van-cell title="请选择金额" value="1元=10书豆" />
        </van-cell-group>
      </div>

      <div class="shudou-box-down">
        <van-cell-group>
          <van-cell
            :title="item.title"
            v-for="(item, index) in shudouData"
            :key="index"
            :value="item.value"
          >
            <template #right-icon>
              <button>充值</button>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="shudou-box-end">
        <van-cell-group>
          <van-cell
            :title="item.title"
            v-for="(item, index) in shudouDatas"
            :key="index"
            :value="item.value"
          >
            <template #title>
              <span class="custom-title">{{ item.title }}</span>
              <van-tag type="danger" class="tag"
                ><div class="vip">送</div>
                <span>{{ item.vip }}</span></van-tag
              >
            </template>
            <template #right-icon>
              <button>充值</button>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <div class="tips">
      <h3>温馨提示</h3>
      <p>
        1.充值过程中可能会有延迟到账的情况，如果长时间未到账，请从 “我的”
        “意见反馈” 里进行反馈，客服人员会进行处理。
      </p>

      <p>
        2.点击充值，代表您已阅读过 <a href="#">《用户协议》</a>和
        <a href="#">《隐私协议》</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shudou",
  data() {
    return {
      shudouData: [
        {
          title: "10书豆",
          value: "￥1",
        },
        {
          title: "60书豆",
          value: "￥6",
        },
        {
          title: "100书豆",
          value: "￥10",
        },
        {
          title: "10书豆",
          value: "￥1",
        },
        {
          title: "120书豆",
          value: "￥12",
        },
        {
          title: "300书豆",
          value: "￥30",
        },
        {
          title: "2000书豆",
          value: "￥200",
        },
      ],
      shudouDatas: [
        {
          title: "500书豆",
          value: "￥50",
          vip: "2%",
        },
        {
          title: "1000书豆",
          value: "￥100",
          vip: "5%",
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.shudou {
  /deep/.van-cell {
    color: black;
    font-size: 17px;
  }
  /deep/.van-cell__value {
    color: black;
  }
  /deep/.shudou-box-up .van-cell {
    font-size: 18px;
  }
  /deep/.shudou-box-up .van-cell {
    padding-top: 20px;
  }
  /deep/.shudou-box-up .van-cell__value span {
    color: #999;
    font-size: 16px;
  }
  button {
    background-color: #cca985;
    border: none;
    border-radius: 5px;
    width: 50px;
    height: 27px;
    font-size: 13px;
    color: white;
    margin-left: 8px;
  }
  .shudou-box-end .vip {
    width: 20px;
    height: 20px;
    background-color: #cca985;
    color: white;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    border-radius: 2px;
    margin: 0 5px 0 10px;
  }
  /deep/.shudou-box-end .tag span {
    font-size: 15px;
    color: #cca985;
  }
  /deep/ .van-tag--danger {
    background-color: #fff;
  }
  h3 {
    margin-left: 15px;
    font-weight: 400;
    color: #000000;
  }
  p {
    margin-left: 15px;
    font-size: 13px;
    color: #999999;
  }
  a {
    color: #cca985;
  }
}
</style>