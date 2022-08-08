import VueRouter from "vue-router";
import Main from "../components/Main"
import Home from "../pages/Home"
import Users from "../pages/Users"
import Mall from "../pages/Mall"
import Login from '../pages/Login'
import Register from '../pages/Register'
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'main',
            path: '/main',
            component: Main,
            redirect: '/home',
            children: [
                {
                    name: 'home',
                    path: '/home',
                    component: Home,
                },
                {
                    name: 'user',
                    path: '/user',
                    component: Users,
                },
                {
                    name: 'mall',
                    path: '/mall',
                    component: Mall,
                },
            ]
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
        },
        {
            name: 'register',
            path: '/register',
            component: Register,
        },
    ]
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export default router;