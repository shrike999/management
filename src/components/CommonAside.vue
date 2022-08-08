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
        style="min-height: 100vh; z-index: 1; flex-shrink: 0;"
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
import { mapState } from 'vuex';
  export default {
    data() {
      return {
        menu: []
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
      this.$axios({
        url: 'http://localhost:3000/menu',
        method: 'get',
        withCredentials: true,
      })
        .then( res => this.menu = res.data )
        .catch( err => console.log(err) )
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