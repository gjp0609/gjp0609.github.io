import Vue from 'vue';
import Router from 'vue-router';
import Layout from '../views/layout/Layout.vue';
import Test from '../views/test/Test.vue';

Vue.use(Router);

export const constantRouterMap = [
    {
        path: '/',
        component: Layout,
        redirect: '/index/home',
        meta: {
            name: 'Index',
            icon: {
                type: 'material-icons',
                name: 'home'
            }
        }
    },
    {
        path: '/index',
        component: Layout,
        // redirect: '/index',
        meta: {
            name: 'Index',
            hidden: true,
            icon: {
                type: 'material-icons',
                name: 'home'
            }
        },
        children: [
            {
                path: 'home',
                component: () => import('../views/Home.vue'),
                meta: {
                    name: 'Home',
                    icon: {
                        type: 'material-icons',
                        name: 'home_work'
                    }
                }
            }
        ]
    },
    {
        path: '/index',
        component: Layout,
        children: [
            {
                path: 'test',
                component: Test,
                meta: {
                    name: 'TestPage',
                    icon: {
                        type: 'material-icons',
                        name: 'check_circle_outline'
                    }
                }
            }
        ],
        meta: {
            name: 'Test',
            icon: {
                type: 'material-icons',
                name: 'help_outline'
            }
        }
    },
    {
        path: '/tools',
        component: Layout,
        meta: {
            name: 'Tools',
            icon: {
                type: 'element-ui',
                name: 'el-icon-s-cooperation'
            }
        },
        children: [
            {
                path: 'encode',
                component: () => import('../views/tools/Encode.vue'),
                meta: {
                    name: 'Encode',
                    icon: {
                        type: 'material-icons',
                        name: 'font_download'
                    }
                }
            }
        ]
    }
];

export default new Router({
    // mode: 'history', //后端支持可开
    // scrollBehavior: () => ({
    //     y: 0
    // }),
    routes: constantRouterMap
});
