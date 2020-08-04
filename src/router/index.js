// import Vue from 'vue';
// import VueRouter from 'vue-router';
import Layout from '../views/layout/Layout.vue';
import Test from '../views/test/Test.vue';

Vue.use(VueRouter);

export const constantMenuRouterMap = [
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
        path: '/test',
        component: Layout,
        meta: {
            name: 'Test',
            icon: {
                type: 'material-icons',
                name: 'help_outline'
            }
        },
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
        ]
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
            },
            {
                path: 'xml',
                component: () => import('../views/tools/Xml.vue'),
                meta: {
                    name: 'Xml',
                    icon: {
                        type: 'font-awesome-icons',
                        name: 'fa-code'
                    }
                }
            },
            {
                path: 'QrCode',
                component: () => import('../views/tools/QrCode.vue'),
                meta: {
                    name: 'QrCode',
                    icon: {
                        type: 'font-awesome-icons',
                        name: 'fa-qrcode'
                    }
                }
            },
            {
                path: 'pcr',
                component: () => import('../views/tools/Pcr.vue'),
                meta: {
                    name: 'PCR',
                    icon: {
                        type: 'font-awesome-icons',
                        name: 'fa-qrcode'
                    }
                }
            }
        ]
    }
];

export const constantRouterMap = [
    ...constantMenuRouterMap,
    {
        path: '/index',
        component: Layout,
        children: [
            {
                path: 'home',
                component: () => import('../views/Home.vue')
            }
        ]
    },
    {
        path: '/404',
        component: () => import('../views/404.vue')
    },
    {
        path: '/*',
        redirect: '/404'
    }
];

export default new VueRouter({
    // mode: 'history', //后端支持可开
    // scrollBehavior: () => ({
    //     y: 0
    // }),
    routes: constantRouterMap
});
