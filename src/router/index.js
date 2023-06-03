// 引入需要的模块
import { createRouter,  createWebHistory } from 'vue-router'

// 下面使用了es6的对象增强写法，命名必须是routes
const routes = [
    {
        path: '/',
        redirect: '/home'
    }, 
    {
        path: '/home',
        name: 'home',
        meta: {
            title: '网易云音乐'
        },
        component: () => import("../views/home")
    },
    {
        path: '/musicItem',
        name: 'musicItem',
        meta: {
            title: '歌单详情'
        },
        component: () => import('../views/musicitem') 
    },
    // {
    //     path: '/home',
    //     component: () => import('views/home/home')
    // }
]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

// 导出路由
export default router
