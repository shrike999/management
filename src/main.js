import Vue from 'vue'
import App from './App.vue'
import {
  Container, Aside, Header, Main, Menu, Submenu,
  MenuItemGroup, MenuItem, Button, Dropdown, DropdownMenu,
  DropdownItem, Row, Col, Card, Table, TableColumn,
  Dialog, Form, FormItem, Select, Option, Input, Breadcrumb, BreadcrumbItem, Tag
} from 'element-ui'
import router from './router'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
Vue.use(Vuex)
Vue.use(VueRouter)

Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(Input)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)

router.beforeEach(async (to, from, next) => {
  if (to.name === 'login' || to.name === 'register') {
    next()
  } else {
    axios({
      url: 'http://localhost:3000/menu',
      method: 'get',
      withCredentials: true,
    })
      .then(res => {
        next()
      })
      .catch(err => {
        axios({
          url: 'http://localhost:3000/refresh',
          method: 'get',
          withCredentials: true,
        })
          .then(res => {
            next()
          })
          .catch(err => {
            next({ name: 'login' })
          })
      })
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$axios = axios;
  }
}).$mount('#app')

function debounce(func, delay) {
  let timer;
  let that = this;
  let args = arguments;
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(that, args)
    }, delay)
  }
}

function throttle(func, delay) {
  let that = this
  let args = arguments
  let pre = 0
  return function () {
    let now = new Date()
    if ((now - pre) > delay) {
      func.apply(that, args)
      pre = now
    }
  }
}
