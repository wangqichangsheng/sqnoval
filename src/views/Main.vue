<template>
  <div class="main">
    <div>
      <router-view></router-view>
    </div>
    <van-tabbar
      v-model="activeName"
      inactive-color="#333333"
      active-color="#23b383"
      route
    >
      <van-tabbar-item
        :name="item.name"
        :icon="item.icon"
        v-for="(item,index) in tabbarData"
        :key="index"
        replace
        :to="item.path"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      activeName: "Home",
      tabbarData: [
        {
          name: "Bookshelf",
          title: "书架",
          path: "/main/bookshelf",
          icon: "home-o",
          active: require("../assets/images/bookshelf-active.png"),
          inactive: require("../assets/images/bookshelf.png"),
        },
        {
          name: "Rinking",
          title: "排行榜",
          path: "/main/rinking",
          icon: "search",
          active: require("../assets/images/rinking-active.png"),
          inactive: require("../assets/images/rinking.png"),
        },
        {
          name: "Class",
          title: "分类",
          path: "/main/class",
          icon: "friends-o",
          active: require("../assets/images/class-active.png"),
          inactive: require("../assets/images/class.png"),
        },
        {
          name: "My",
          title: "我的",
          path: "/main/my",
          icon: "setting-o",
          active: require("../assets/images/my-active.png"),
          inactive: require("../assets/images/my.png"),
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
</style>