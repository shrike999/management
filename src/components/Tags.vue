<template>
<div id="line">
    <el-tag
        v-for="(tag, index) in tagList" 
        :key="index"  
        size="mini"
        :closable="tag != 'home'"
        :effect="tag == $route.name? 'dark':'plain'"
        @click="changeRoute(tag)"
        @close="closeTag(tag)"
    >
    {{tag}}
    </el-tag>
</div>
</template>

<script>
    export default {
        data(){
            return {
                tagList: this.$store.state.tagList
            }
        },
        methods: {
            changeRoute(tag){
                this.$router.push({
                    name: tag
                })
            },
            closeTag(tag){
                let i;
                for(i = 0; i < this.tagList.length; i++){
                    if(this.tagList[i] == tag){
                        break
                    }
                }
                if(tag == this.$route.name){
                    this.$router.push({
                        name: this.tagList[i - 1]
                    })
                }
                this.tagList.splice(i, 1)
            }
        },
        mounted(){
            if(this.$route == null){
                this.$router.push({
                    name: 'home'
                })
            }
        }
    }
</script>

<style scoped>
    #line{
        margin: 10px;
        display: flex;
        gap: 10px
    }
    .el-tag:hover{
        cursor: pointer;
    }
</style>