import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '../views/layout/Layout.vue';

export const constantMenuRouterMap = [
    {
        path: '/',
        realPath: '/',
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
        path: '/tools',
        realPath: '/tools',
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
                realPath: 'encode/',
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
                realPath: 'xml/',
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
                realPath: 'json/',
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
                realPath: 'pasteBin/',
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
                realPath: 'QrCode/',
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
                realPath: 'ECharts/',
                component: () => import('../views/tools/ECharts.vue'),
                meta: {
                    name: 'ECharts',
                    icon: {
                        type: 'element-ui',
                        name: 'el-icon-pie-chart'
                    }
                }
            },
            {
                path: 'notes/:pathMatch(.*)*',
                realPath: 'notes/',
                component: () => import('../views/tools/Notes.vue'),
                meta: {
                    name: 'Notes',
                    icon: {
                        type: 'element-plus',
                        name: 'Notebook'
                    }
                }
            }
        ]
    },
    {
        path: '/single',
        realPath: '/single',
        component: Layout,
        meta: {
            name: 'Single',
            icon: {
                type: 'material-icons',
                name: 'help_outline'
            }
        },
        children: [
            {
                path: 'bookmarks',
                realPath: 'bookmarks/',
                component: () => import('../views/single/Wrapper.vue'),
                meta: {
                    name: 'Bookmarks',
                    params: { a: 1 },
                    icon: {
                        type: 'material-icons',
                        name: 'bookmarks'
                    }
                }
            },
            {
                path: 'fps',
                realPath: 'fps/',
                component: () => import('../views/single/Wrapper.vue'),
                meta: {
                    name: 'fps',
                    icon: {
                        type: 'material-icons',
                        name: 'videogame_asset'
                    }
                }
            },
            {
                path: 'highlight.js',
                realPath: 'highlight.js/',
                component: () => import('../views/single/Wrapper.vue'),
                meta: {
                    name: 'highlight.js',
                    icon: {
                        type: 'material-icons',
                        name: 'format_align_center'
                    }
                }
            },
            {
                path: 'keywords',
                realPath: 'keywords/',
                component: () => import('../views/single/Wrapper.vue'),
                meta: {
                    name: 'keywords',
                    icon: {
                        type: 'material-icons',
                        name: 'line_weight'
                    }
                }
            },
            {
                path: 'materialDesignIcons',
                realPath: 'materialDesignIcons/',
                component: () => import('../views/single/Wrapper.vue'),
                meta: {
                    name: 'Material Design Icons',
                    icon: {
                        type: 'material-icons',
                        name: 'palette'
                    }
                }
            },
            {
                path: 'network/rtt.html',
                realPath: 'network/rtt.html',
                component: () => import('../views/single/Wrapper.vue'),
                meta: {
                    name: 'Network RTT',
                    icon: {
                        type: 'material-icons',
                        name: 'signal_cellular_alt'
                    }
                }
            },
            {
                path: 'read',
                realPath: 'read/',
                component: () => import('../views/single/Wrapper.vue'),
                meta: {
                    name: 'Read',
                    icon: {
                        type: 'material-icons',
                        name: 'menu_book'
                    }
                }
            },
            {
                path: 'solarSystem',
                realPath: 'solarSystem/',
                component: () => import('../views/single/Wrapper.vue'),
                meta: {
                    name: 'Solar System',
                    icon: {
                        type: 'material-icons',
                        name: 'wb_sunny'
                    }
                }
            },
            {
                path: 'videos',
                realPath: 'videos/',
                component: () => import('../views/single/Wrapper.vue'),
                meta: {
                    name: 'Videos',
                    icon: {
                        type: 'material-icons',
                        name: 'live_tv'
                    }
                }
            }
        ]
    },
    {
        path: '/test',
        realPath: '/test',
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
                realPath: 'test/',
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
                realPath: 'test2/',
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
