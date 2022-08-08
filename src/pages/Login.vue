<template>
    <body>
        <div class="box">
            <div class="loginPic">
                <div class="blured">
                    <h1 style="color:#fff; font-size: 40px;">WELCOME!</h1>
                </div>
            </div>
            <div class="loginBox">
                <div class="login">
                    <label for="username">用户名</label>
                    <input type="text" v-model="nameCopy">
                    <label for="pwd">密码</label>
                    <input type="password" v-model="pwdCopy">
                    <button @click="login" id="login">登录</button>
                    <p id="regtext">还没有账号？<span @click="register">注册</span></p>
                </div>
            </div>
        </div>
    </body>
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
            }
        },
        computed: {
        },
        methods: {
            login(){
                this.$axios({
                    url: 'http://localhost:3000/login',
                    withCredentials: true,
                    method: 'post',
                    data: {
                        username: this.nameCopy,
                        password: this.pwdCopy,
                    },
                }).then( res => {
                    this.$store.state.accessToken = res.data.accessToken
                    this.$store.state.currentUser = { username: this.nameCopy,  }
                    this.$router.push('main')
                })
            },
            register(){
                this.$router.push({
                    name: 'register'
                })
            },
        }
    }
</script>

<style scoped>
body{
    height: 100vh;
    background-image: url('../assets/bgp.jpg');
    background-size:cover;
}
.blured{
    margin: 30px;
}
#regtext{
    margin: 20px;
    text-align: center;
}
.box{
    flex-wrap: wrap;
    display: inline-flex;
    align-items: center;
    gap: 0;
    justify-content: left;
    margin: 140px 358.6px;
    width: 800px;
    height: 400px;
    border-radius: 20px;
    /* border: 1px solid #ddd; */
    box-shadow: 0 0 20px #ccc;
}
.box > div{
    margin: 0;
}
.loginPic{
    width: 300px;
    height: 400px;
    border-radius: 20px 0 0 20px;
    background-size: cover;
}
.login{
    border-radius: 10px;
    padding: 10px;
    margin: 50px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}
.loginBox{
    color: #fff;
    width: 500px;
    height: 400px;
}
label{
    margin: 10px 50px;
    display: block;
}
input{
    color: #F4ECF4;
    padding: 5px;
    border: 0px !important; 
    backdrop-filter: blur(10px);
    background-color: rgba(255, 199, 199, 0.1);
    display: block;
    margin: 0 auto;
    /* margin-bottom: 20px; */
    border: 1px solid #bbb;
    height: 30px;
    width: 300px;
    border-radius: 10px;
}
input:focus{
    border: 0px !important;
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
    margin: 20px auto;
    width: 90px;
    height: 40px;
    border-radius: 20px;
}
button:hover{
    cursor: pointer;
}
p span{
    color: #FB0691;
    
}
span:hover{
    cursor: pointer;
}
</style>