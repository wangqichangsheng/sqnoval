import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'

import axios from 'axios'
import VueAxios from 'vue-axios'
import {
  Tabbar,
  TabbarItem,
  Icon,
  Cell,
  CellGroup,
  Button,
  Search,
  Tab,
  Tabs,
  Empty,
  NavBar,
  Form,
  Field,
  Checkbox,
  Divider,
  Toast,
  Popup,
  Uploader,
  Slider,
  Dialog,
  Tag,
  Row,
  Col,
  Sticky,

} from 'vant';

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Button)
Vue.use(Search)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Empty)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Checkbox)
Vue.use(Divider)
Vue.use(Toast)
Vue.use(Popup)
Vue.use(Uploader)
Vue.use(Slider)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Row)
Vue.use(Col)
Vue.use(Sticky)

Vue.use(VueAxios, axios)

//引入图标
import "./assets/icon/iconfont.css";

//引入Swiper插件
// import VueAwesomeSwiper from 'vue-awesome-swiper';
// import 'swiper/css/swiper.css';
// Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false

Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

//axios拦截器，在发起请求之前执行
axios.interceptors.request.use((config) => {
  //处理post请求参数, 进行参数序列化
  if (config.method == "post") {
    //序列化post请求参数
    let paramsString = "";
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }
    //重新赋值config.data
    config.data = paramsString.slice(0, -1);
  }
  //必须返回config
  return config;
});
// 配置请求基础路径
axios.defaults.baseURL = 'http://novel.kele8.cn'

// 跨域解决
// "https://api.kele8.cn/agent/"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
