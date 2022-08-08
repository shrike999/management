<template>
    <div class="box">
        <div class="loginPic">
            <h1 style="color:#fff; font-size: 40px;">WELCOME!</h1>
        </div>
        <div class="loginBox">
            <div class="login">
                <label for="username">用户名</label>
                <input id="name" autofocus type="text" @blur="checkName" v-model="nameCopy"><span v-show="duplicated === false">名字可用</span><span style="color:#f00" v-show="duplicated">名字不可用</span>
                <label for="pwd">密码</label>
                <input type="password" v-model="pwdCopy">
                <label for="pwd">权限</label>
                <el-select v-model="classCopy" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <button @click="register" style="display:block">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data(){
            return {
                form: '',
                formLabelWidth: '120px',
                nameCopy: '',
                pwdCopy: '',
                classCopy: '',
                duplicated: null,
                options: [
                    {
                        value: 'admin',
                        label: '管理员'
                    },
                    {
                        value: 'super_admin',
                        label: '超级管理员'
                    }
                ],
            }
        },
        computed: {

        },
        methods: {
            register(){
                this.$axios({
                    url: 'http://localhost:3000/register',
                    method: 'post',
                    data: {
                        username: this.nameCopy,
                        password: this.pwdCopy,
                        userclass: this.classCopy
                    },
                }).then( res => {
                    // this.$axios({
                    //     url: 'http://localhost:3000/login',
                    //     method: 'post',
                    //     data: {
                    //         username: this.nameCopy,
                    //         password: this.pwdCopy,
                    //     },
                    // }).then( res => {
                    //     this.$store.state.accessToken = res.data.accessToken
                    //     this.$router.push({ name: 'main' })
                    // }).catch( err => {
                    //     console.log(err);
                    // } )
                    this.$router.push({ name: 'login' })
                }).catch( err => {
                    if(err.response.status === 409){
                        alert('用户名已存在')
                    }
                    console.log(err);
                })
            },
            checkName(){
                this.$axios({
                    method: 'post',
                    url: 'http://localhost:3000/namecheck',
                    data: {
                        'name': this.nameCopy
                    }
                }).then(res => {
                    this.duplicated = false
                }).catch(err => {
                    this.duplicated = true
                })
            }
        }
    }
</script>

<style scoped>
.box{
    margin: 140px auto;
    display: flex;
    width: 800px;
    height: 400px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: 0 0 5px #ccc;
}
.loginPic{
    width: 300px;
    height: 400px;
    background-color: #3D2FC9;
    border-radius: 5px 0 0 5px;
}
.login{
    width: 500px;
    height: 400px;
}
.loginBox{
    width: 400px;
    margin: 50px auto;
}
label{
    display: block;
}
input{
    margin-bottom: 20px;
    border: 1px solid #bbb;
    height: 15px;
    width: 120px;
    border-radius: 5px;
}
#login{
    display: block;
}
span{
    color: #20B27D;
}
button{
    display: block;
    border: 0px;
    margin: 20px;
    width: 90px;
    height: 40px;
    border-radius: 20px;
}
button:hover{
    cursor: pointer;
}
</style>