<template>
    <el-container style="height: 100%">
        <CommonAside/>
        <el-container>
            <el-header>
                <CommonHeader/>
            </el-header>
            <Tags/>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import CommonAside from './CommonAside.vue'
import CommonHeader from './CommonHeader.vue'
import Tags from './Tags.vue'
export default {
  name: 'Main',
  components: {CommonAside, CommonHeader, Tags},

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .el-header{
        background-color: #fff;
    }
    .el-main{
        padding-top: 0px;
    }
    .el-header{
        box-shadow: 0px 1px 5px #ddd;
    }
</style>
