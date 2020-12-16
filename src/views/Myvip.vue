<template>
  <div class="myvip">
    <div class="myvip-info">
      <div class="myvip-img fl">
        <img src="../assets/images/header.png" alt="" />
      </div>
      <div class="myvip-info-box fl">
        <h3>西伯利亚狼</h3>
        <p>♔开通会员，海量小说免费读</p>
      </div>
    </div>
    <div class="myvip-open-bg">
      <div class="myvip-open">
        <h2>尚未开通会员</h2>
        <span>立即开通＞</span>
      </div>
    </div>

    <div class="myvip-privilege">
      <div class="myvip-box">
        <h3>会员权益</h3>
        <span>全部特权</span>
      </div>
      <div class="myvip-img-box">
        <div class="myvip-img" v-for="(item, index) in myvipData" :key="index">
          <img :src="item.imgs" alt="" />
        </div>
      </div>
    </div>

    <div class="myvip-title">
      <h3 class="fl">为你推荐</h3>
      <span class="fr">换一换</span>
    </div>
    <div class="myvip-recommend">
      <div
        class="recommend-item"
        v-for="(item, index) in myvipBookData"
        :key="index"
      >
        <div class="recommend-img fl"><img :src="item.imgs" /></div>
        <div class="recommend-word fr">
          <div class="recommend-name">{{ item.name }}</div>
          <div class="recommend-title">{{ item.title }}</div>
          <div class="recommend-author">{{ item.author }}</div>
          <div class="recommend-type">{{ item.type }}</div>
        </div>
      </div>
    </div>

    <van-divider
      :style="{ color: '#cccccc', borderColor: '#cccccc', padding: '0 60px' }"
    >
      阿里文学出品
    </van-divider>
  </div>
</template>

<script>
import "../assets/less/myvip.less";

export default {
  name: "Myvip",
  data() {
    return {
      myvipData: [
        {
          imgs: require("../assets/images/myvip-icon1.png"),
        },
        {
          imgs: require("../assets/images/myvip-icon2.png"),
        },
        {
          imgs: require("../assets/images/myvip-icon3.png"),
        },
        {
          imgs: require("../assets/images/myvip-icon4.png"),
        },
      ],
      myvipBookData: [
        {
          name: "悍妻当道，皇帝跪下",
          author: "王瑾妍",
          imgs: require("../assets/images/myvipbooks1.jpg"),
          type: "幻想言情",
          title:
            "生死一线，再临战场，平复天下，笑看苍生，愿携你之手踏遍三界之...",
        },
        {
          name: "女总裁的近身高手",
          author: "不吃老鼠的猫",
          imgs: require("../assets/images/myvipbooks2.jpg"),
          type: "都市生活",
          title:
            "部队超级王牌“暴龙”雷厉背负着秘密任务回到了摩登都市，偶然间稀里糊...",
        },
        {
          name: "火影之次元系统",
          author: "御坂哥哥",
          imgs: require("../assets/images/myvipbooks3.jpg"),
          type: "动漫同人",
          title:
            "你拥有世上最强的剑，举世无双的力量也能唾手可得！试问，这天地间除了...",
        },
        {
          name: "玄道至尊",
          author: "凌乱的夏",
          imgs: require("../assets/images/myvipbooks4.jpg"),
          type: "东方玄幻",
          title:
            "林天本是一代天才，但是因为意外失去修为并遭人羞辱，辛运的是遇到高人...",
        },
        {
          name: "弟妹金安",
          author: "似雾非烟",
          imgs: require("../assets/images/myvipbooks5.jpg"),
          type: "古典架空",
          title:
            "上辈子，凝秦生不出儿子被国公府休了，羞愤中重生。上辈子嫁给了弟弟...",
        },
        {
          name: "豪宠第一夫人",
          author: "翎神",
          imgs: require("../assets/images/myvipbooks6.jpg"),
          type: "现代言情",
          title:
            "她是被人追杀的孤女，得亏伊洛国军神救她一命。本以为抱完大腿找到仇人...",
        },
        {
          name: "猫奴修炼手册",
          author: "猫公子",
          imgs: require("../assets/images/myvipbooks7.jpg"),
          type: "现代纯恋",
          title:
            "如何成为一个合格的猫奴？陶俞恒：耐心凭借这份耐心，陶俞恒追到怯弱的...",
        },
        {
          name: "田园酒香：一品世子妃",
          author: "上官熙儿",
          imgs: require("../assets/images/myvipbooks8.jpg"),
          type: "穿越时空",
          title:
            "穿越成农家肥妞儿，又黑又臭又木讷，人见人嫌，狗见狗憎，屠飞鸢也是醉...",
        },
        {
          name: "兽血江山",
          author: "虹血",
          imgs: require("../assets/images/myvipbooks9.jpg"),
          type: "西方玄幻",
          title:
            "艾拉泽大陆上生活着人类、兽人、矮人和精灵四个种族。大陆更早之前叫寒...",
        },
        {
          name: "坏爹地别吃妈咪",
          author: "暧昧因子",
          imgs: require("../assets/images/myvipbooks10.jpg"),
          type: "豪门世家",
          title:
            "他对她警告道：“未来五年的婚姻，将是你坟墓的开始。除了黑家大少...",
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
</style>