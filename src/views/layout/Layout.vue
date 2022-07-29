<template>
    <div :class="isDark ? 'dark' : 'light'" class="root-layout">
        <aside :class="isCollapse ? 'is-collapse' : 'not-collapse'" class="menu">
            <el-menu
                :mode="isMobile ? 'horizontal' : 'vertical'"
                :collapse="isCollapse"
                :collapse-transition="true"
                :default-active="defaultActive"
                :router="true"
                :unique-opened="true"
            >
                <template v-for="router in routerMap" :key="router.path">
                    <el-sub-menu v-if="router.children" :index="router.path">
                        <template #title>
                            <template v-if="router.meta.icon">
                                <i v-if="router.meta.icon.type === 'material-icons'" class="material-icons outlined">
                                    {{ router.meta.icon.name }}
                                </i>
                                <el-icon v-if="router.meta.icon.type === 'element-ui'">
                                    <component :is="router.meta.icon.name"></component>
                                </el-icon>
                            </template>
                            <span>{{ router.meta.name }}</span>
                        </template>
                        <el-menu-item v-for="subRouter in router.children" :key="subRouter.path" :index="router.path + '/' + subRouter.path">
                            <template v-if="!subRouter.meta.hidden">
                                <template v-if="subRouter.meta.icon">
                                    <i v-if="subRouter.meta.icon.type === 'material-icons'" class="material-icons outlined">
                                        {{ subRouter.meta.icon.name }}
                                    </i>
                                    <el-icon v-if="subRouter.meta.icon.type === 'element-ui'">
                                        <component :is="subRouter.meta.icon.name"></component>
                                    </el-icon>
                                </template>
                                <span> {{ subRouter.meta.name }}</span>
                            </template>
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item v-else :index="router.path">
                        <template v-if="router.meta.icon">
                            <i v-if="router.meta.icon.type === 'material-icons'" class="material-icons outlined">{{ router.meta.icon.name }}</i>
                            <i v-if="router.meta.icon.type === 'element-ui'" :class="router.meta.icon.name"></i>
                            <component :is="router.meta.icon.name" v-if="router.meta.icon.type === 'element-plus'" />
                        </template>
                        <span>{{ router.meta.name }}</span>
                    </el-menu-item>
                </template>
            </el-menu>
            <div v-if="!isMobile" class="operations">
                <i class="material-icons outlined" @click="menuCollapseChange">{{ isCollapse ? 'last_page' : 'first_page' }}</i>
                <i v-show="!isCollapse" class="material-icons outlined" @click="handleThemeChange">{{ isDark ? 'brightness_4' : 'brightness_7' }}</i>
            </div>
        </aside>
        <div class="main">
            <header v-if="!isMobile">
                <span>OnySakura.fun</span>
                <pre class="time" @click="copy">{{ time }}</pre>
            </header>
            <section>
                <router-view></router-view>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { constantMenuRouterMap } from '../../router/index';
    import moment from 'moment';
    import { ref, onMounted, watch, computed } from 'vue';
    import { useRouter } from 'vue-router';

    const $router = useRouter();
    const screenWidth = ref(document.body.clientWidth);
    const isCollapse = ref(localStorage.getItem('menuIsCollapse') === '1' || false);
    const routerMap = ref(constantMenuRouterMap);
    const defaultActive = ref('/');
    const isDark = ref(localStorage.getItem('themeIsDark') === '1' || false);
    const time = ref('');

    onMounted(() => {
        let indexPath = '/index/home';
        console.log($router.currentRoute.value.fullPath);
        if ($router.currentRoute.value.fullPath !== indexPath) {
            defaultActive.value = $router.currentRoute.value.fullPath;
        }
        $router.beforeEach((to, from, next) => {
            defaultActive.value = to.path;
            if (to.path === indexPath) {
                defaultActive.value = '/';
            }
            next();
        });
        setInterval(() => {
            time.value = moment().format('YYYY-MM-DD HH:mm:ss');
        }, 500);
        window.onresize = () => {
            return (() => {
                screenWidth.value = document.body.clientWidth;
            })();
        };
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
            isDark.value = event.matches;
        });
    });

    const isMobile = computed(() => screenWidth.value < 1024);

    watch(isDark, (value) => {
        document.documentElement.className = value ? 'dark' : '';
    });

    function menuCollapseChange() {
        isCollapse.value = !isCollapse.value;
        localStorage.setItem('menuIsCollapse', isCollapse.value ? '1' : '0');
    }

    function handleThemeChange() {
        isDark.value = !isDark.value;
        localStorage.setItem('themeIsDark', isDark.value ? '1' : '0');
    }

    async function copy() {
        let blob = new Blob([time.value], { type: 'text/plain' });
        let item = new ClipboardItem({ 'text/plain': blob });
        await navigator.clipboard.write([item]);
    }
</script>

<style lang="scss" scoped>
    .el-menu {
        .el-menu-item,
        .el-sub-menu,
        .el-menu--popup {
            i {
                vertical-align: middle;
                width: 1.2rem;
                font-size: 1.2rem;
                text-align: center;
                margin-right: 5px;
            }
        }
    }
    .root-layout {
        height: 100vh;
        display: flex;
        overflow: hidden;
        @media screen and (min-width: 1024px) {
            flex-direction: row;
        }
        @media screen and (max-width: 1024px) {
            flex-direction: column;
        }
        .menu {
            display: flex;
            .el-menu {
                border: none;
            }
            @media screen and (min-width: 1024px) {
                border-right: 0.01rem solid var(--el-border-color);
                $menuCollapseWidth: 65px;
                flex-direction: column;
                justify-content: space-between;
                &.is-collapse {
                    width: $menuCollapseWidth;
                    transition-duration: 300ms;
                }
                &.not-collapse {
                    width: 300px;
                    transition-duration: 300ms;
                }
                .operations {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    $height: 50px;
                    height: $height;
                    line-height: $height;
                    i {
                        height: $height;
                        line-height: $height;
                        vertical-align: middle;
                        text-align: center;
                        width: $menuCollapseWidth - 1px;
                    }
                }
            }
            @media screen and (max-width: 1024px) {
                border-bottom: 0.01rem solid var(--el-border-color);
                $menuHeight: 2.5rem;
                .el-menu {
                    max-width: 100vw;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    height: $menuHeight;
                }
                :deep(.el-menu) {
                    &.el-menu--horizontal > .el-menu-item,
                    &.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
                        height: $menuHeight;
                        line-height: $menuHeight;
                    }
                }
            }
        }
        .main {
            flex: 1;
            display: flex;
            flex-direction: column;
            height: 100vh;
            header {
                $headerHeight: 2.4rem;
                height: $headerHeight;
                line-height: $headerHeight;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 0 0.5rem;
                border-bottom: 0.01rem solid var(--el-border-color);
                .time {
                    margin: 0;
                }
            }
            section {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: 1rem;
                @media screen and (max-width: 1024px) {
                    padding: 0.5rem;
                }
                overflow-y: auto;
            }
        }
    }
</style>
