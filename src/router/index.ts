import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '../views/layout/Layout.vue';

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
                component: () => import('../views/test/Test.vue'),
                meta: {
                    name: 'TestPage',
                    icon: {
                        type: 'material-icons',
                        name: 'check_circle_outline'
                    }
                }
            },
            {
                path: 'test2',
                component: () => import('../views/test/Test2.vue'),
                meta: {
                    name: 'TestPage2',
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
                        type: 'material-icons',
                        name: 'code'
                    }
                }
            },
            {
                path: 'json',
                component: () => import('../views/tools/Json.vue'),
                meta: {
                    name: 'Json',
                    icon: {
                        type: 'material-icons',
                        name: 'code'
                    }
                }
            },
            {
                path: 'pasteBin',
                component: () => import('../views/tools/PasteBin.vue'),
                meta: {
                    name: 'PasteBin',
                    icon: {
                        type: 'element-ui',
                        name: 'el-icon-document-copy'
                    }
                }
            },
            {
                path: 'QrCode',
                component: () => import('../views/tools/QrCode.vue'),
                meta: {
                    name: 'QrCode',
                    icon: {
                        type: 'element-ui',
                        name: 'el-icon-camera-solid'
                    }
                }
            },
            {
                path: 'ECharts',
                component: () => import('../views/tools/ECharts.vue'),
                meta: {
                    name: 'ECharts',
                    icon: {
                        type: 'element-ui',
                        name: 'el-icon-pie-chart'
                    }
                }
            }
        ]
    }
];

const routes: Array<RouteRecordRaw> = [
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
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
