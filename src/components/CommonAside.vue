<template>
    <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isFold"
        background-color="#3D3ABC"
        text-color="#C8C0E2"
        active-text-color="#FEF5EE"
        style="min-height: 100vh; z-index: 1;"
    >
        <el-menu-item v-for="n in noChildren" :index="n.id.toString()" :key="n.id" @click="clickMenu(n)" class="item">
            <i :class="`el-icon-${n.icon}`"></i>
            <span slot="title">{{n.lable}}</span>
        </el-menu-item>   

        <el-submenu v-for="h in hasChildren" :index="h.id.toString()" :key="h.path">
            <template slot="title">
                <i :class="`el-icon-${h.icon}`"></i>
                <span slot="title">{{h.lable}}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item v-for="i in h.children" :index="i.id.toString()" :key="i.id">
                    <i :class="`el-icon-${i.icon}`"></i>
                    <span slot="title">{{i.lable}}</span>
                </el-menu-item>

            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
import {nanoid} from 'nanoid'
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        menu: [
            {
                path: '/',
                name: 'home',
                lable: '首页',
                icon: 's-home',
                url: 'Home/home',
                id: nanoid()
            },
            {
                path: '/mall',
                name: 'mall',
                lable: '商品管理',
                icon: 'video-play',
                url: 'MallManage/MallManage',
                id: nanoid()
            },
            {
                path: '/user',
                name: 'user',
                lable: '用户管理',
                icon: 'user',
                url: 'UserManage/UserManage',
                id: nanoid()
            },
            {
                lable: '其他',
                icon: 'location',
                id: nanoid(),
                children: [
                    {
                        path: '/page1',
                        name: 'page1',
                        lable: '页面1',
                        icon: 'setting',
                        url: 'Other/PageOne',
                        id: nanoid()
                    },
                    {
                        path: '/page2',
                        name: 'page2',
                        lable: '页面2',
                        icon: 'setting',
                        url: 'Other/PageTwo',
                        id: nanoid()
                    },
                ]
            }
        ]
      };
    },
    computed: {
        hasChildren(){
            return this.menu.filter( m => m.children )
        },
        noChildren(){
            return this.menu.filter( m => !m.children )
        },
        ...mapState(['isFold'])
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        this.$router.push(
          {
            name: item.name
          }
        );
        this.$store.commit('pushTag', item.name)
      }
    },
    mounted(){
      this.$router.replace({
        name: 'main'
      })
    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    border: 0px;
  }
  #nav-title{
    padding-top: 10px;
    color: #CAD0DC;
    text-align: center;
    font-size: 15px;
  }
  li:hover{
    background-color: #16AB97 !important;
  }
  li.is-active{
    background-color: #16AB97 !important;
  }
  .item{
    margin: 10px;
    border-radius: 20px;
    // box-shadow: 2px 2px 2px #ccc;
  }
</style>