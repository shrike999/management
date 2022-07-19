import VueRouter from "vue-router";
import Home from "../pages/Home"
import Users from "../pages/Users"
import Mall from "../pages/Mall"
const router = new VueRouter({
    mode: 'history',
    routes: [
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
        }
    ]
})

export default router;