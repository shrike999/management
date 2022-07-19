<template>
    <div style="position:relative">
        <div class="leftItems">
            <el-button plain :icon="`el-icon-s-${fold}`" size="mini" @click="changeFold"></el-button>
            <h2 style="color:#4A45D3; line-height: 60px; margin: 0px;">Document</h2>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in breadItems" :key="item.path">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="rightItems"> 
            <el-dropdown trigger="click" szie="mini">
                <span>
                    <img src="../assets/user.png" alt="头像" width="30px">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
    export default {
        data(){
            return {
                
            }
        },
        methods: {
            ...mapMutations(['changeFold'])
        },
        computed: {
            fold(){
                if(this.$store.state.isFold)
                    return 'unfold'
                else
                    return 'fold'
            },
            breadItems(){
                return this.$route.matched
            }
        }
    }
</script>

<style>
    .leftItems{
        display: flex;
        align-items: center;
        gap: 15px;
    }
    .rightItems{
        position: absolute;
        left: 1225px;
        top: 15px;
    }
</style>