<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: #646566;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.auto-img{
    width: 100%;
    display: block;
  }
 
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
