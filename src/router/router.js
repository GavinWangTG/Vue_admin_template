import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout/Layout.vue'

Vue.use(Router)

export const constRouterMap = [
    {
        path: '/401',
        name: '401',
        component: () => import('@/views/errorPage/401.vue'),
        meta: {
            title: '401'
        },
        hidden: true
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/errorPage/404.vue'),
        meta: {
            title: '404'
        },
        hidden: true
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: {
            title: '登录'
        },
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/Home.vue'),
            meta: {
                title: '首页',
                icon: 'icon-iconhome'
            }
        }]
    },
    {
        path: '/testManage',
        component: Layout,
        redirect: '/testManage/test',
        meta: {
            title: '测试',
            icon: 'icon-iconhome'
        },
        children: [{
            path: 'test',
            name: 'test',
            component: () => import('@/views/test/test.vue'),
            meta: {
                title: '测试列表',
                icon: 'icon-yewubaobiao'
            },
            children: [{
                path: 'edit/:id?',
                name: 'edit',
                component: () => import('@/views/test/Children/Edit.vue'),
                meta: {
                    title: '编辑',
                    icon: 'icon-icon-test6'
                },
            }]
        },{
            path: 'none',
            hidden: true,
        }]
    }
]

export default new Router({
    routes: constRouterMap
})
