<template>
    <div :class="isDark ? 'dark' : 'light'" class="layout">
        <aside :class="isCollapse ? 'is-collapse' : 'not-collapse'" class="menu">
            <el-menu
                :mode="isMobile ? 'horizontal' : 'vertical'"
                :collapse="isCollapse"
                :collapse-transition="true"
                :default-active="defaultActive"
                :router="true"
                :unique-opened="true"
            >
                <template v-for="router in routerMap">
                    <template v-if="!router.meta.hidden">
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

<script>
    import { constantMenuRouterMap } from '../../router/index';
    import moment from 'moment';

    export default {
        name: 'Layout',
        data() {
            return {
                screenWidth: document.body.clientWidth,
                isCollapse: localStorage.getItem('menuIsCollapse') === '1' || false,
                routerMap: constantMenuRouterMap,
                defaultActive: '/',
                isDark: localStorage.getItem('themeIsDark') === '1' || false,
                time: ''
            };
        },
        computed: {
            isMobile() {
                return this.screenWidth < 1024;
            }
        },
        watch: {
            isDark(newVal) {
                console.log(newVal);
                console.log(document);
                document.documentElement.className = newVal ? 'dark' : '';
            }
        },
        mounted() {
            let indexPath = '/index/home';
            console.log(this.$router.currentRoute.value.fullPath);
            if (this.$router.currentRoute.value.fullPath !== indexPath) {
                this.defaultActive = this.$router.currentRoute.value.fullPath;
            }
            this.$router.beforeEach((to, from, next) => {
                this.defaultActive = to.path;
                if (to.path === indexPath) {
                    this.defaultActive = '/';
                }
                next();
            });
            setInterval(() => {
                this.time = moment().format('YYYY-MM-DD HH:mm:ss');
            }, 500);
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth;
                    _this.screenWidth = window.screenWidth;
                    console.log(_this.screenWidth);
                })();
            };
            this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
                this.isDark = event.matches;
            });
        },
        methods: {
            menuCollapseChange() {
                this.isCollapse = !this.isCollapse;
                localStorage.setItem('menuIsCollapse', this.isCollapse ? '1' : '0');
            },
            handleThemeChange() {
                this.isDark = !this.isDark;
                localStorage.setItem('themeIsDark', this.isDark ? '1' : '0');
            },
            async copy() {
                let blob = new Blob([this.time], { type: 'text/plain' });
                let item = new ClipboardItem({ 'text/plain': blob });
                navigator.clipboard.write([item]);
            }
        }
    };
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
    .layout {
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
            border-right: 0.01rem solid var(--el-border-color);
            @media screen and (min-width: 1024px) {
                $menuCollapseWidth: 65px;
                flex-direction: column;
                justify-content: space-between;
                .el-menu {
                    border: none;
                }
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
                $menuHeight: 2.5rem;
                .el-menu {
                    width: 100vh;
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
            section {
                flex: 1;
                display: flex;
                flex-direction: column;
                padding: 1rem;
                @media screen and (max-width: 1024px) {
                    padding: 0.5rem;
                }
            }
            @media screen and (min-width: 1024px) {
                header {
                    $headerHeight: 2.4rem;
                    height: $headerHeight;
                    line-height: $headerHeight;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding: 0 0.5rem;
                    .time {
                        margin: 0;
                    }
                }
            }
        }
    }
</style>
